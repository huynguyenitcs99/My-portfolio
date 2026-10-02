import React from 'react';
import {AbsoluteFill, CanvasImage, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BusinessCardSpecimen, MenuSpecimen, PosterSpecimen} from './Specimens';
import {font, FontGate, palette, ReviewFrame, smooth} from './theme';

export function CardToHero() {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="v3-motion" style={{background: palette.graphite, color: palette.ivory, fontFamily: font, overflow: 'hidden'}}>
    <FontGate />
    <div style={{position: 'absolute', left: 515, top: 125, width: 900, height: 680, opacity: interpolate(frame, [38, 93], [0.82, 0], smooth), translate: `${interpolate(frame, [38, 110], [0, 110], smooth)}px 0px`}}>
      <CanvasImage src={staticFile('assets/motion-twin-ribbons.png')} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 32}} />
    </div>
    <div style={{position: 'absolute', left: 62, top: 231, width: 670, opacity: interpolate(frame, [38, 75], [1, 0], smooth), translate: `0px ${interpolate(frame, [38, 80], [0, -38], smooth)}px`}}>
      <div style={{fontSize: 16, letterSpacing: '2px', color: '#C5B6BF', marginBottom: 27}}>INTELLIGENCE, WITH A CREATIVE INSTINCT.</div>
      <div style={{fontSize: 77, fontWeight: 550, letterSpacing: '-4.7px', lineHeight: 1.045}}>I build intelligence<br />into creative tools.</div>
      <div style={{fontSize: 23, lineHeight: 1.5, color: '#BDB5B0', width: 530, marginTop: 36}}>AI agents. Generative design.<br />Ideas you can actually use.</div>
      <div style={{marginTop: 58, fontSize: 16, color: '#CEBCAD'}}>Huy Nguyen · AI Engineer at Vulcan Labs</div>
    </div>

    <div style={{position: 'absolute', left: interpolate(frame, [38, 84], [875, 1180], smooth), top: interpolate(frame, [38, 84], [460, 480], smooth), width: 417, height: 186, rotate: `${interpolate(frame, [0, 20, 84], [15, 8, 20], smooth)}deg`, opacity: interpolate(frame, [0, 15, 66, 87], [0.3, 1, 1, 0], smooth), background: '#322D34', border: '1px solid #655461', borderRadius: 16, padding: 28, boxShadow: '0 24px 70px #0005'}}>
      <div style={{fontSize: 13, color: '#C5B1BD', letterSpacing: '1.5px'}}>01 / DAILY SMITH</div>
      <div style={{fontSize: 26, lineHeight: 1.13, letterSpacing: '-1px', marginTop: 16}}>From scattered context<br />to a clearer day.</div>
      <div style={{fontSize: 13, color: '#C5B1BD', marginTop: 14}}>AI pipeline + agent context</div>
    </div>
    <div style={{position: 'absolute', left: interpolate(frame, [42, 88], [767, 1067], smooth), top: interpolate(frame, [42, 88], [641, 780], smooth), width: 437, height: 164, rotate: `${interpolate(frame, [0, 24, 88], [-14, -5, 9], smooth)}deg`, opacity: interpolate(frame, [4, 23, 63, 88], [0, 1, 1, 0], smooth), background: '#A16D50', border: '1px solid #D4A283', borderRadius: 16, padding: 24, boxShadow: '0 24px 70px #0005'}}>
      <div style={{fontSize: 13, color: '#F1DBCD', letterSpacing: '1.5px'}}>03 / SLIDE DESIGN</div>
      <div style={{fontSize: 27, fontWeight: 500, letterSpacing: '-.7px', marginTop: 16}}>A designed image. Ready to edit.</div>
      <div style={{fontSize: 13, color: '#F1DBCD', marginTop: 17}}>Lead · In development</div>
    </div>

    {/* This same surface travels from the fan into the full project hero. */}
    <div style={{position: 'absolute', left: interpolate(frame, [38, 112], [881, 58], smooth), top: interpolate(frame, [0, 20, 38, 112], [154, 175, 175, 123], smooth), width: interpolate(frame, [38, 112], [414, 1324], smooth), height: interpolate(frame, [38, 112], [223, 682], smooth), rotate: `${interpolate(frame, [0, 20, 38, 112], [-18, -11, -11, 0], smooth)}deg`, borderRadius: interpolate(frame, [38, 112], [17, 23], smooth), background: palette.ivory, boxShadow: '0 30px 100px #0004', color: palette.graphite, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 186, top: 39, width: 210, opacity: interpolate(frame, [40, 70], [1, 0], smooth)}}>
        <div style={{fontSize: 12, letterSpacing: '1.2px', color: '#7E6B76'}}>02 / CREATIVE STUDIO</div>
        <div style={{fontSize: 26, lineHeight: 1.1, letterSpacing: '-1px', fontWeight: 550, marginTop: 20}}>Visual DNA.<br />Across formats.</div>
        <div style={{fontSize: 12, color: '#7E6B76', marginTop: 17}}>Menu pipeline + visual DNA</div>
      </div>
      <div style={{position: 'absolute', left: 66, top: 56, width: 714, opacity: interpolate(frame, [68, 110], [0, 1], smooth), translate: `0px ${interpolate(frame, [68, 110], [22, 0], smooth)}px`}}>
        <div style={{fontSize: 14, letterSpacing: '1.8px', color: palette.plum}}>CREATIVE STUDIO / CHAT SMITH</div>
        <div style={{fontSize: 66, lineHeight: 1.035, fontWeight: 550, letterSpacing: '-3.7px', marginTop: 34}}>A visual language.<br />Carried across<br />formats.</div>
        <div style={{fontSize: 22, lineHeight: 1.5, color: '#62585E', maxWidth: 616, marginTop: 30}}>I developed a reference-driven visual-DNA<br />method for menu generation.</div>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 32, padding: '9px 15px', borderRadius: 30, border: '1px solid #C8BFC4', fontSize: 14, color: '#675460'}}><span style={{width: 6, height: 6, borderRadius: '50%', background: palette.plum}} />Contributor · Released</div>
        <div style={{fontSize: 17, color: '#7F737A', marginTop: 28}}>Menu pipeline + visual DNA research</div>
      </div>
      <div style={{position: 'absolute', left: interpolate(frame, [38, 115], [27, 962], smooth), top: interpolate(frame, [38, 115], [25, 114], smooth), width: interpolate(frame, [38, 115], [127, 263], smooth), height: interpolate(frame, [38, 115], [169, 351], smooth), rotate: `${interpolate(frame, [38, 115], [-4, 8], smooth)}deg`, boxShadow: '0 19px 44px #19191B22'}}><PosterSpecimen /></div>
      <div style={{position: 'absolute', left: 817, top: 255, width: 243, height: 324, rotate: '-9deg', opacity: interpolate(frame, [105, 134], [0, 1], smooth), translate: `0px ${interpolate(frame, [105, 134], [66, 0], smooth)}px`, boxShadow: '0 19px 44px #19191B22'}}><MenuSpecimen /></div>
      <div style={{position: 'absolute', left: 986, top: 513, width: 257, height: 147, rotate: '5deg', opacity: interpolate(frame, [116, 142], [0, 1], smooth), translate: `0px ${interpolate(frame, [116, 142], [45, 0], smooth)}px`, boxShadow: '0 19px 44px #19191B22'}}><BusinessCardSpecimen /></div>
    </div>
    <ReviewFrame label="01 / card → hero" />
  </AbsoluteFill>;
}
