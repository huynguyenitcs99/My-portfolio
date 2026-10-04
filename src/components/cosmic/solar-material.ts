import * as THREE from "three";

export const celestialVertex = `
varying vec3 vLocal; varying vec3 vNormal; varying vec3 vView;
varying vec3 vWorld; varying vec3 vWorldNormal; varying vec2 vUv;
void main(){
  vLocal=position; vNormal=normalize(normalMatrix*normal); vUv=uv;
  vWorld=(modelMatrix*vec4(position,1.)).xyz;
  vWorldNormal=normalize(mat3(modelMatrix)*normal);
  vec4 mv=modelViewMatrix*vec4(position,1.); vView=-mv.xyz;
  gl_Position=projectionMatrix*mv;
}`;

// Generated equirectangular plasma artwork for C, not a solar observation.
// Convection is kept visible, while radiance and limb darkening unite the
// surface into one light source instead of a high-contrast lava material.
export function solarMaterial(plasma: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: { plasmaMap: { value: plasma }, seconds: { value: 0 } },
    vertexShader: celestialVertex,
    fragmentShader: `
uniform sampler2D plasmaMap; uniform float seconds;
varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
void main(){
 vec2 uv=vec2(vUv.x+seconds*.0026,vUv.y);
 vec3 plasma=texture2D(plasmaMap,uv).rgb;
 float mu=max(0.,dot(normalize(vNormal),normalize(vView)));
 float limb=.40+.60*pow(mu,.40);
 // Broad hot ivory emission softens theatrical red channels; real texture
 // structure still supplies the convection detail under ACES tone mapping.
 vec3 photosphere=mix(vec3(1.55,1.04,.48),plasma*2.0,.64)*limb;
 gl_FragColor=vec4(photosphere,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`,
  });
}

export function coronaMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { seconds: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: celestialVertex,
    fragmentShader: `
uniform float seconds; varying vec2 vUv;
float localArc(float angle,float centre,float spread){
 float delta=atan(sin(angle-centre),cos(angle-centre));
 return exp(-delta*delta/(spread*spread));
}
void main(){
 vec2 p=vUv-.5; float radius=length(p)*6.;
 float beyond=max(0.,radius-1.); float angle=atan(p.y,p.x);
 float phase=seconds*.012;
 float boundary=1.+.004*sin(angle*19.+phase)+.004*sin(angle*31.-phase*.7);
 float curl=angle+.18*sin(beyond*4.+phase)+.08*sin(angle*7.-beyond*3.);
 float plumes=localArc(curl,.30,.15)+.6*localArc(curl,-.72,.11)
  +.45*localArc(curl,1.28,.13);
 float threads=pow(.5+.5*sin(angle*33.+beyond*13.+sin(angle*7.)+phase),12.);
 float streamers=.8+.15*cos(angle-.12)+.06*sin(angle*5.+phase);
 float broad=.18*exp(-beyond*2.3)*streamers;
 float localGlow=.22*exp(-beyond*11.)+.12*threads*exp(-beyond*6.)
  +.20*plumes*exp(-pow((beyond-.09)/.13,2.));
 // Zero radiance on the disc side and a feathered emergence outside prevent
 // the opaque yellow ring; localized loops are much shorter than the halo.
 float alpha=min(.38,broad+localGlow)*smoothstep(boundary-.005,boundary+.05,radius)
  *(1.-smoothstep(2.0,2.98,radius));
 vec3 color=mix(vec3(1.0,.41,.13),vec3(1.25,.84,.46),exp(-beyond*5.));
 gl_FragColor=vec4(color,alpha);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`,
  });
}
