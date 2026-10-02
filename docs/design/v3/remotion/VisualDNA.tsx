import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BusinessCardSpecimen, MenuSpecimen, PosterSpecimen} from './Specimens';
import {font, FontGate, palette, ReviewFrame, smooth} from './theme';

export function VisualDNA() {
  const frame = useCurrentFrame();
  return <AbsoluteFill className="v3-motion" style={{background: palette.ivory, color: palette.graphite, fontFamily: font, overflow: 'hidden'}}>
    <FontGate />
    <div style={{position: 'absolute', left: 62, top: 118, opacity: interpolate(frame, [150, 177], [1, 0], smooth), translate: `0px ${interpolate(frame, [150, 177], [0, -16], smooth)}px`}}>
      <div style={{fontSize: 54, letterSpacing: '-2.5px', fontWeight: 550}}>Good design has relationships.</div>
      <div style={{fontSize: 21, color: '#7A6C75', marginTop: 16}}>Capture the visual language of a complete reference.</div>
    </div>
    <div style={{position: 'absolute', left: 62, top: 118, opacity: interpolate(frame, [166, 190], [0, 1], smooth), translate: `0px ${interpolate(frame, [166, 190], [18, 0], smooth)}px`}}>
      <div style={{fontSize: 54, letterSpacing: '-2.5px', fontWeight: 550}}>Keep the language. Change the format.</div>
      <div style={{fontSize: 21, color: '#7A6C75', marginTop: 16}}>One coherent system becomes guidance for the next design.</div>
    </div>

    <svg viewBox="0 0 1440 900" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} aria-hidden="true">
      <path d="M379 483H439" fill="none" stroke={palette.plum} strokeWidth="2" strokeDasharray="60" strokeDashoffset={interpolate(frame, [46, 77], [60, 0], smooth)} />
      <path d="m430 477 9 6-9 6" fill="none" stroke={palette.plum} strokeWidth="2" opacity={interpolate(frame, [70, 80], [0, 1], smooth)} />
      <path d="M874 483H938Q960 483 960 461V421Q960 398 983 398H1054" fill="none" stroke={palette.plum} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame, [105, 144], [1, 0], smooth)} />
      <path d="M938 483Q960 483 960 506V672Q960 696 983 696H1013" fill="none" stroke={palette.copper} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame, [132, 174], [1, 0], smooth)} />
      <circle cx="960" cy="483" r="4" fill={palette.plum} opacity={interpolate(frame, [120, 140], [0, 1], smooth)} />
    </svg>

    <div style={{position: 'absolute', left: 65, top: 252, fontSize: 13, letterSpacing: '1.5px', color: '#7A6C75'}}>01 / INTACT REFERENCE</div>
    <div style={{position: 'absolute', left: interpolate(frame, [25, 65], [128, 65], smooth), top: interpolate(frame, [25, 65], [286, 291], smooth), width: interpolate(frame, [25, 65], [320, 288], smooth), height: interpolate(frame, [25, 65], [427, 384], smooth), rotate: `${interpolate(frame, [25, 65], [-3, 0], smooth)}deg`, boxShadow: '0 20px 45px #19191B15'}}>
      <PosterSpecimen />
      <div style={{position: 'absolute', inset: '13% 5% 59%', border: `1.5px solid ${palette.plum}`, borderRadius: 3, opacity: interpolate(frame, [32, 43, 76, 91], [0, 0.9, 0.9, 0], smooth)}} />
      <div style={{position: 'absolute', inset: '34% 12% 20%', border: `1.5px solid ${palette.copper}`, borderRadius: '50%', opacity: interpolate(frame, [41, 56, 83, 98], [0, 0.9, 0.9, 0], smooth)}} />
    </div>
    <div style={{position: 'absolute', left: 65, top: 698, width: 300, fontSize: 17, color: '#81747C', opacity: interpolate(frame, [45, 77], [0, 1], smooth)}}>The composition stays whole.</div>

    <div style={{position: 'absolute', left: 465, top: 252, fontSize: 13, letterSpacing: '1.5px', color: '#7A6C75', opacity: interpolate(frame, [42, 64], [0, 1], smooth)}}>02 / CONNECTED VISUAL DNA</div>
    <div style={{position: 'absolute', left: 465, top: 291, width: 410, height: 385, padding: 31, border: '1px solid #CDC2CA', borderRadius: 18, background: '#EBE5E7', opacity: interpolate(frame, [49, 81], [0, 1], smooth), translate: `0px ${interpolate(frame, [49, 81], [20, 0], smooth)}px`}}>
      <div style={{fontSize: 23, fontWeight: 550, letterSpacing: '-.5px'}}>One connected system.</div>
      <svg viewBox="0 0 350 85" style={{width: '100%', height: 85, marginTop: 16}} aria-hidden="true">
        <path d="M31 46Q90-10 175 45T321 46" stroke={palette.plum} fill="none" strokeWidth="1.5" />
        <path d="M31 46Q90 104 175 45T321 46" stroke={palette.copper} fill="none" strokeWidth="1.5" />
        <circle cx="31" cy="46" r="8" fill={palette.graphite} /><circle cx="175" cy="45" r="8" fill={palette.plum} /><circle cx="321" cy="46" r="8" fill={palette.copper} />
      </svg>
      <div style={{fontSize: 20, lineHeight: 1.5, color: '#5E505A', marginTop: 11}}>A bold headline sets the scale. The orbital form balances its weight. A restrained palette holds the composition together.</div>
      <div style={{position: 'absolute', left: 31, bottom: 28, fontSize: 13, letterSpacing: '.5px', color: '#8A7381'}}>REFERENCE → RELATIONSHIPS → GUIDANCE</div>
    </div>
    <div style={{position: 'absolute', left: 465, top: 698, width: 410, fontSize: 17, color: '#81747C', opacity: interpolate(frame, [78, 101], [0, 1], smooth)}}>A description of how the parts belong together.</div>

    <div style={{position: 'absolute', left: 1045, top: 252, fontSize: 13, letterSpacing: '1.5px', color: '#7A6C75', opacity: interpolate(frame, [105, 134], [0, 1], smooth)}}>03 / CARRIED ACROSS FORMATS</div>
    <div style={{position: 'absolute', left: 1080, top: 291, width: 257, height: 343, rotate: `${interpolate(frame, [112, 155], [7, 0], smooth)}deg`, opacity: interpolate(frame, [112, 151], [0, 1], smooth), translate: `${interpolate(frame, [112, 155], [-32, 0], smooth)}px 0px`, boxShadow: '0 18px 38px #19191B15'}}><MenuSpecimen /></div>
    <div style={{position: 'absolute', left: 1026, top: 596, width: 306, height: 175, rotate: `${interpolate(frame, [143, 184], [-7, -3], smooth)}deg`, opacity: interpolate(frame, [143, 181], [0, 1], smooth), translate: `0px ${interpolate(frame, [143, 184], [25, 0], smooth)}px`, boxShadow: '0 18px 38px #19191B24'}}><BusinessCardSpecimen /></div>

    <div style={{position: 'absolute', left: 65, top: 795, width: 1120, fontSize: 18, color: '#5E505A', opacity: interpolate(frame, [172, 199], [0, 1], smooth)}}>
      Developed for menus. Later adopted by the original poster-pipeline owner across other formats.
    </div>
    <ReviewFrame light label="02 / visual DNA" />
  </AbsoluteFill>;
}
