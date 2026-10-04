# Planet texture sources

Retrieved 2026-10-03 for this local Three.js review study from the public Three.js examples asset host:

- `earth-day.jpg`: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg
- `earth-normal.jpg`: https://threejs.org/examples/textures/planets/earth_normal_2048.jpg
- `earth-specular.jpg`: https://threejs.org/examples/textures/planets/earth_specular_2048.jpg
- `earth-clouds.png`: https://threejs.org/examples/textures/planets/earth_clouds_1024.png
- `moon.jpg`: https://threejs.org/examples/textures/planets/moon_1024.jpg

These maps are third-party reference assets, not Image Gen output or product evidence. Sun surface and corona are procedural shaders authored in `motion/CelestialSystem.ts`. The nebula, portrait and project illustrations retain their separate Image Gen provenance. This file records retrieval sources; it does not establish original authorship of the maps or assert a blanket license for all third-party assets.

Site implementation keeps the existing material setup and animates the meshes in Three.js. The movement is art-directed, not an astronomical simulation.

## Research-based update — 2026-10-03

The previous independent paths/procedural orange Sun are superseded by the heliocentric hierarchy, tracking camera and materials documented in `docs/research/2026-10-03-celestial-motion/research.md`.

New files (downloaded unchanged):

- `sun-hmi-20260921.jpg`: https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMII.jpg — observed SDO/HMI quick-look continuum, image timestamp 2026-09-21 15:11:15 TAI; HTTP Last-Modified 2026-09-21 15:40:08 GMT. Saved snapshot, not a live map. Courtesy of NASA/SDO and the AIA, EVE, and HMI science teams. See https://sdo.gsfc.nasa.gov/data/rules.php.
- `moon-albedo-nasa.jpg`: https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg — NASA SVS CGI Moon Kit, LROC albedo. Retrieved-content SHA-256 (before adding origin metadata) `b246064f217f8d479df78c49c7c8595a8f5fbda008a72fd539978d2e121e0109`.
- `moon-height-nasa.jpg`: https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg — NASA SVS CGI Moon Kit, LOLA terrain elevation. Retrieved-content SHA-256 (before adding origin metadata) `6d93f887e7d8bedfe35ab89ba785e5e3ca12381bd092a5e6abe2c707dda8bb98`.

The solar shader reprojects the observed hemisphere, models the unobserved rear and applies an interpreted warm-white color and limb profile. It is a visualization derived from intensity data, not a new NASA observation. The lunar height map is now used separately from the albedo map. Website footer carries source attribution and the compressed scale/time disclosure.

## Approved direction C implementation — 2026-10-03

Direction C replaces the rejected heliocentric composition with bounded, art-directed 3D flybys. Terra is cropped at the upper-right edge, Luna occupies a separate reading-safe anchor, and the warm Sun is small and partly off the left edge. Motion and relative scale are deliberately designed, not an astronomical demonstration.

- `earth-night.png`: https://threejs.org/examples/textures/planets/earth_lights_2048.png — retrieved by verified HTTPS on 2026-10-03, 2048 × 1024 PNG (410,160 bytes), public Three.js examples asset. Supplies night-side city-light texture, blended across the terminator by the authored material. This records the retrieval source and does not assert original authorship or a blanket asset license.

Earth's day/cloud/specular/normal maps and NASA lunar maps remain separate textures. The Sun retains the HMI intensity snapshot, with procedural granulation and an explicitly interpreted amber/gold palette. It is not an actual NASA color photograph. Assets are visual context, never product evidence.

- Higher-resolution night map: NASA Earth Observatory, Black Marble 2012 global composite, 3600×1800. https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg . Retrieved 2026-10-03; desktop/night-light refinement. The SolarSystemScope 8k endpoint returned CAPTCHA HTML and was not used.

- Current C Sun: sun-plasma-c.webp is an original generated equirectangular solar-plasma concept texture (2026-10-03), with exact native image-generation prompt in its sidecar. It is an art-directed surface and is not an observed HMI measurement. The older HMI file is retained as historical research provenance.

## Reflected-light material correction — 2026-10-03

The current implementation keeps the same cited photographic Earth and NASA Moon maps. It restores native daytime geographic color under a shared front-left key instead of replacing terrestrial land with a navy palette. NASA Black Marble supplies thresholded city-only emission on the shadowed side; clouds reflect the shared key and the thin atmospheric shell supplies directional scattering. Luna uses neutral reflected albedo and a small mapped shadow fill, rather than blue self-illumination. The generated Sun panorama retains visible convection under a softer ivory/amber radiance profile and a feathered, localized corona. All three are still moving 3D meshes; these corrections are editorial lighting and material choices, not an astronomical simulation or new scientific imagery.
