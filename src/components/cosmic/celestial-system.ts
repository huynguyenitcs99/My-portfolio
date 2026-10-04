import * as THREE from "three";
import { directionCPose } from "./celestial-orbits";
import {
  celestialVertex,
  coronaMaterial,
  solarMaterial,
} from "./solar-material";

export type CelestialMaps = Record<
  | "earth"
  | "normal"
  | "specular"
  | "night"
  | "moon"
  | "lunarHeight"
  | "clouds"
  | "sun",
  THREE.Texture
>;

export async function loadCelestialMaps(
  url: (path: string) => string,
): Promise<CelestialMaps> {
  const loader = new THREE.TextureLoader();
  const names = {
    earth: "earth-day.jpg",
    normal: "earth-normal.jpg",
    specular: "earth-specular.jpg",
    night:
      typeof window !== "undefined" && window.innerWidth > 800
        ? "earth-night-nasa.jpg"
        : "earth-night.png",
    moon: "moon-albedo-nasa.jpg",
    lunarHeight: "moon-height-nasa.jpg",
    clouds: "earth-clouds.png",
    sun: "sun-plasma-c.webp",
  };
  const entries = Object.entries(names);
  const results = await Promise.allSettled(
    entries.map(([, name]) => loader.loadAsync(url(`assets/planets/${name}`))),
  );
  if (results.some((r) => r.status === "rejected")) {
    results.forEach((r) => {
      if (r.status === "fulfilled") r.value.dispose();
    });
    throw new Error("Celestial texture load failed");
  }
  const maps = Object.fromEntries(
    results.map((r, i) => [
      entries[i][0],
      (r as PromiseFulfilledResult<THREE.Texture>).value,
    ]),
  ) as CelestialMaps;
  for (const key of ["earth", "night", "moon", "clouds", "sun"] as const)
    maps[key].colorSpace = THREE.SRGBColorSpace;
  // The generated solar panorama is color artwork, not an HMI measurement.
  maps.sun.wrapS = THREE.RepeatWrapping;
  // Terrain, normal and specular remain linear data textures.
  for (const texture of Object.values(maps)) texture.anisotropy = 4;
  return maps;
}

export function disposeMaps(maps: CelestialMaps) {
  Object.values(maps).forEach((texture) => texture.dispose());
}

// The visible Sun is left of the camera-facing hemisphere. A front-left key
// gives photographed terrain a lit face instead of compensating a backlight
// with painted blue ground or a self-illuminating Moon.
const keyDirection = new THREE.Vector3(-0.88, 0.2, 0.42).normalize();

function earthMaterial(maps: CelestialMaps) {
  return new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: maps.earth },
      normalMap: { value: maps.normal },
      waterMap: { value: maps.specular },
      nightMap: { value: maps.night },
      keyDirection: { value: keyDirection },
    },
    vertexShader: celestialVertex,
    fragmentShader: `
uniform sampler2D dayMap,normalMap,waterMap,nightMap; uniform vec3 keyDirection;
varying vec2 vUv; varying vec3 vWorld,vWorldNormal,vNormal,vView;
void main(){
 vec3 N=normalize(vWorldNormal), V=normalize(cameraPosition-vWorld), L=normalize(keyDirection);
 vec3 q1=dFdx(vWorld),q2=dFdy(vWorld); vec2 st1=dFdx(vUv),st2=dFdy(vUv);
 vec3 T=normalize(q1*st2.y-q2*st1.y),B=normalize(-q1*st2.x+q2*st1.x);
 vec3 detail=texture2D(normalMap,vUv).xyz*2.-1.;
 N=normalize(mat3(T,B,N)*vec3(detail.xy*.12,1.));
 float incidence=dot(N,L); float day=smoothstep(-.045,.085,incidence);
 vec3 albedo=texture2D(dayMap,vUv).rgb;
 float water=texture2D(waterMap,vUv).r;
 // Keep the actual land/ocean albedo. Geographic color is lit, not replaced
 // with a palette: neutral-blue fill only lifts the otherwise black night.
 vec3 lit=albedo*(vec3(.007,.009,.013)+max(0.,incidence)*.60);
 vec3 halfway=normalize(L+V);
 float specular=pow(max(0.,dot(N,halfway)),95.)*water*day*.065;
 vec3 nightTexture=texture2D(nightMap,vUv).rgb;
 // Reject the NASA composite's blue reflected ground before night emission;
 // lights stay discrete, modest, and entirely on the shadowed hemisphere.
 float warmSignal=max(0.,min(nightTexture.r,nightTexture.g*1.35)-nightTexture.b*.75);
 float citySignal=warmSignal*smoothstep(.004,.045,warmSignal);
 vec3 cities=vec3(1.0,.69,.36)*citySignal*(1.-smoothstep(-.15,.015,incidence))*.48;
 float edge=pow(1.-max(0.,dot(N,V)),8.)*smoothstep(-.10,.60,incidence);
 vec3 color=lit+vec3(.72,.82,1.)*specular+cities+vec3(.055,.20,.44)*edge*.32;
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`,
  });
}

function atmosphereMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { keyDirection: { value: keyDirection } },
    vertexShader: celestialVertex,
    fragmentShader: `
uniform vec3 keyDirection; varying vec3 vNormal,vView,vWorldNormal;
void main(){
 float rim=pow(1.-abs(dot(normalize(vNormal),normalize(vView))),3.4);
 float day=smoothstep(-.12,.65,dot(normalize(vWorldNormal),keyDirection));
 vec3 scattering=mix(vec3(.04,.15,.43),vec3(.30,.62,1.0),day);
 gl_FragColor=vec4(scattering,rim*(.035+.55*day));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
}

// Continuous indexed ribbons avoid round-cap overlaps and MSAA stippling.
// A shader extrudes the centreline by a constant CSS-pixel width and feathers
// its side edges analytically; there are no dots, segment caps or dash textures.
const cPathPoints = {
  silver: [
    [-30, 550],
    [540, 560],
    [725, 540],
    [850, 445],
    [1120, 190],
    [1570, 170],
  ],
  cobalt: [
    [-30, 635],
    [520, 590],
    [735, 565],
    [930, 460],
    [1240, 300],
    [1570, 275],
  ],
};
const compactPathPoints = {
  silver: [
    [-0.12, 0.42],
    [0.12, 0.42],
    [0.4, 0.4],
    [0.68, 0.345],
    [1.12, 0.31],
  ],
  cobalt: [
    [-0.12, 0.52],
    [0.13, 0.49],
    [0.4, 0.455],
    [0.72, 0.405],
    [1.12, 0.375],
  ],
};
function spatialPath(kind: "silver" | "cobalt", halo = false) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(1536, 1024) },
      width: { value: halo ? (kind === "silver" ? 6 : 9) : kind === "silver" ? 2.2 : 2 },
      tint: {
        value: new THREE.Color(kind === "silver" ? "#e7edf8" : "#318cff"),
      },
      opacity: { value: halo ? (kind === "silver" ? 0.13 : 0.18) : 1 },
      halo: { value: halo ? 1 : 0 },
      blue: { value: kind === "cobalt" ? 1 : 0 },
    },
    vertexShader: `
attribute vec2 pathNormal; attribute float pathSide,pathTravel;
uniform vec2 resolution; uniform float width; varying float vSide,vTravel;
void main(){
  vec4 clip=projectionMatrix*modelViewMatrix*vec4(position,1.);
  clip.xy+=pathNormal*pathSide*width/resolution*clip.w;
  vSide=pathSide; vTravel=pathTravel; gl_Position=clip;
}`,
    fragmentShader: `
uniform vec3 tint; uniform float opacity,halo,blue; varying float vSide,vTravel;
void main(){
  float aa=max(.001,fwidth(vSide)*.65);
  float edge=1.-smoothstep(1.-aa,1.,abs(vSide));
  float glow=exp(-vSide*vSide*3.5)*edge;
  float spot=exp(-pow((vTravel-.58)/.08,2.));
  vec3 highlight=mix(tint,vec3(.72,.88,1.),blue*spot*.4);
  float energy=mix(1.,.35+1.35*spot,halo);
  gl_FragColor=vec4(highlight,opacity*energy*mix(edge,glow,halo));
  #include <colorspace_fragment>
}`,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
    blending: halo ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  const line = new THREE.Mesh(new THREE.BufferGeometry(), material);
  line.name = `${kind}-${halo ? "edge-bloom" : "ribbon"}`;
  line.renderOrder = halo ? 5 : 6;
  line.frustumCulled = false;
  return line;
}

export type CelestialSystem = ReturnType<typeof createCelestialSystem>;
export function createCelestialSystem(scene: THREE.Scene, maps: CelestialMaps) {
  const group = new THREE.Group();
  group.name = "Direction-C-celestial-stage";
  scene.add(group);
  const sunlight = new THREE.DirectionalLight("#fff5eb", 2.8);
  sunlight.position.copy(keyDirection).multiplyScalar(20);
  const fill = new THREE.HemisphereLight("#8796a8", "#080b11", 0.08);
  group.add(sunlight, sunlight.target, fill);

  const sunSurface = solarMaterial(maps.sun);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 40), sunSurface);
  sun.name = "Sun-photosphere";
  const coronaSurface = coronaMaterial();
  const corona = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), coronaSurface);
  corona.name = "Sun-restrained-corona";
  group.add(sun, corona);

  const earthSystem = new THREE.Group();
  earthSystem.name = "Terra-layers";
  earthSystem.rotation.z = 0.23;
  earthSystem.rotation.x = 0.68;
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 80, 48),
    earthMaterial(maps),
  );
  earth.name = "Terra";
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.006, 64, 40),
    new THREE.MeshPhongMaterial({
      map: maps.clouds,
      transparent: true,
      opacity: 0.65,
      color: "#f3f4f7",
      depthWrite: false,
      specular: new THREE.Color("#000000"),
      shininess: 0,
    }),
  );
  clouds.name = "Terra-cloud-layer";
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.004, 64, 40),
    atmosphereMaterial(),
  );
  atmosphere.name = "Terra-atmosphere";
  earthSystem.add(earth, clouds, atmosphere);
  group.add(earthSystem);

  const moonSurface = new THREE.MeshPhongMaterial({
    map: maps.moon,
    bumpMap: maps.lunarHeight,
    bumpScale: 0.007,
    color: "#ffffff",
    emissiveMap: maps.moon,
    emissive: new THREE.Color("#a1aab8"),
    emissiveIntensity: 0.035,
    shininess: 0,
    specular: new THREE.Color("#000000"),
  });
  // NASA lunar albedo remains neutral and reflects the same directional key.
  // A tiny mapped fill preserves shadow-side craters without a glowing ball.
  moonSurface.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
      float lunarAlbedo = dot(diffuseColor.rgb, vec3(.2126,.7152,.0722));
      diffuseColor.rgb = vec3(lunarAlbedo) * vec3(.98,1.0,1.025);`,
      );
  };
  moonSurface.customProgramCacheKey = () => "direction-c-neutral-reflected-luna-v2";
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 40), moonSurface);
  moon.name = "Luna";
  group.add(moon);
  const paths = new THREE.Group();
  paths.name = "Paired-silver-cobalt-path";
  const silverPath = spatialPath("silver");
  const silverHalo = spatialPath("silver", true);
  const cobaltPath = spatialPath("cobalt");
  const cobaltHalo = spatialPath("cobalt", true);
  paths.add(silverHalo, silverPath, cobaltHalo, cobaltPath);
  group.add(paths);
  let pathWidth = 0;
  let pathHeight = 0;

  function place(
    object: THREE.Object3D,
    x: number,
    y: number,
    radius: number,
    z: number,
    camera: THREE.PerspectiveCamera,
  ) {
    const distance = camera.position.z - z;
    const height =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * distance;
    const width = height * camera.aspect;
    object.position.set((x - 0.5) * width, (0.5 - y) * height, z);
    object.scale.setScalar(width * radius);
  }
  function update(
    seconds: number,
    camera: THREE.PerspectiveCamera,
    compact: boolean,
    scrollProgress: number,
  ) {
    camera.position.set(0, 0, 20);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const pose = directionCPose(seconds, compact, scrollProgress);
    place(sun, pose.sun.x, pose.sun.y, pose.sun.radius, 0, camera);
    corona.position.copy(sun.position);
    corona.scale.copy(sun.scale);
    corona.quaternion.copy(camera.quaternion);
    sunSurface.uniforms.seconds.value = seconds;
    coronaSurface.uniforms.seconds.value = seconds;
    place(
      earthSystem,
      pose.earth.x,
      pose.earth.y,
      pose.earth.radius,
      pose.earth.z,
      camera,
    );
    // A maritime/northern-Atlantic presentation keeps the prominent limb
    // cooler without tinting away the natural colors of photographed land.
    earth.rotation.y = -2.05 + seconds * 0.008;
    clouds.rotation.y = earth.rotation.y + 0.04 + seconds * 0.0014;
    place(
      moon,
      pose.moon.x,
      pose.moon.y,
      pose.moon.radius,
      pose.moon.z,
      camera,
    );
    moon.rotation.set(0.06, -0.1 + seconds * 0.009, -0.12);
    const height =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * 20;
    const width = height * camera.aspect;
    const pixelWidth = window.innerWidth;
    const pixelHeight = pixelWidth / camera.aspect;
    const depth = 1;
    const depthHeight = (height * (20 - depth)) / 20;
    const depthWidth = (width * (20 - depth)) / 20;
    const buildPath = (
      kind: "silver" | "cobalt",
      line: ReturnType<typeof spatialPath>,
    ) => {
      const sourcePoints = compact
        ? compactPathPoints[kind]
        : cPathPoints[kind].map(([x, y]) => [x / 1536, y / 1024]);
      const anchors = sourcePoints.map(
        ([x, y]) =>
          new THREE.Vector3(
            (x - 0.5) * depthWidth,
            (0.5 - y) * depthHeight,
            depth,
          ),
      );
      const points = new THREE.CatmullRomCurve3(anchors).getPoints(180);
      const positions: number[] = [];
      const normals: number[] = [];
      const sides: number[] = [];
      const travels: number[] = [];
      const indices: number[] = [];
      points.forEach((point, i) => {
        const before = points[Math.max(0, i - 1)],
          after = points[Math.min(points.length - 1, i + 1)];
        const dx = after.x - before.x,
          dy = after.y - before.y;
        const length = Math.hypot(dx, dy) || 1;
        for (const side of [-1, 1]) {
          positions.push(point.x, point.y, point.z);
          normals.push(-dy / length, dx / length);
          sides.push(side);
          travels.push(i / (points.length - 1));
        }
        if (i < points.length - 1) {
          const base = i * 2;
          indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
        }
      });
      line.geometry.dispose();
      line.geometry = new THREE.BufferGeometry();
      line.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      line.geometry.setAttribute(
        "pathNormal",
        new THREE.Float32BufferAttribute(normals, 2),
      );
      line.geometry.setAttribute(
        "pathSide",
        new THREE.Float32BufferAttribute(sides, 1),
      );
      line.geometry.setAttribute(
        "pathTravel",
        new THREE.Float32BufferAttribute(travels, 1),
      );
      line.geometry.setIndex(indices);
      line.material.uniforms.resolution.value.set(pixelWidth, pixelHeight);
    };
    // Resize rebuilds anchors; scroll moves one cached path group. Idle frames
    // never recreate buffers. Widths stay 2.2 / 2 CSS pixels at any aspect/DPR.
    if (pixelWidth !== pathWidth || pixelHeight !== pathHeight) {
      buildPath("silver", silverPath);
      buildPath("silver", silverHalo);
      buildPath("cobalt", cobaltPath);
      buildPath("cobalt", cobaltHalo);
      pathWidth = pixelWidth;
      pathHeight = pixelHeight;
    }
    const returning = THREE.MathUtils.smoothstep(scrollProgress, 0.78, 1);
    paths.position.y =
      -depthHeight * scrollProgress * (1 - returning) * 0.09 +
      Math.sin(seconds * 0.03) * depthHeight * 0.002;
    paths.visible = true;
    // A bounded flyby belongs to the design, not an orbital simulation.
    // Celestial layers recede as selected work becomes the focal plane.
    group.visible = true;
    return pose;
  }
  function dispose() {
    scene.remove(group);
    group.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();
      if (mesh.material)
        (Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material]
        ).forEach((material) => material.dispose());
    });
    disposeMaps(maps);
  }
  return { group, sun, earth, earthSystem, moon, paths, update, dispose };
}
