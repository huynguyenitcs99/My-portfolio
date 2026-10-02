import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, Easing, staticFile} from 'remotion';

export const palette = {
  ivory: '#F3F0E9', graphite: '#19191B', plum: '#7F627B', copper: '#BD845F',
  muted: '#AAA39E', line: '#D7D0C8', plumDark: '#493B49',
};
export const smooth = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
  easing: Easing.bezier(0.2, 0.8, 0.2, 1),
};
export const font = 'HuyInter, sans-serif';

export function FontGate() {
  const [handle] = useState(() => delayRender('Loading local Inter for the motion storyboard'));
  useEffect(() => {
    const face = new FontFace('HuyInter', `url(${staticFile('assets/inter.woff2')})`, {weight: '100 900'});
    face.load().then((loaded) => {
      document.fonts.add(loaded);
      continueRender(handle);
    }).catch(() => continueRender(handle));
  }, [handle]);
  return <style>{'.v3-motion, .v3-motion * { box-sizing: border-box; }'}</style>;
}

export function ReviewFrame({light = false, label}: {light?: boolean; label: string}) {
  return <>
    <div style={{position: 'absolute', left: 60, right: 60, top: 38, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: light ? palette.graphite : palette.ivory, fontFamily: font}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <span style={{fontSize: 22, fontWeight: 650, letterSpacing: '-0.8px'}}>Huy Nguyen</span>
        <span style={{width: 1, height: 19, background: light ? palette.line : '#444044'}} />
        <span style={{fontSize: 14, opacity: 0.65}}>AI engineer × creative builder</span>
      </div>
      <span style={{fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.6}}>{label}</span>
    </div>
    <div style={{position: 'absolute', left: 60, bottom: 30, color: light ? '#6B6563' : '#B8AFAB', fontSize: 13, fontFamily: font, letterSpacing: '0.1px'}}>
      Concept study · motion direction for review · original design specimens
    </div>
    <div style={{position: 'absolute', right: 60, bottom: 28, color: light ? '#6B6563' : '#B8AFAB', fontSize: 13, fontFamily: font}}>
      HN / 2026
    </div>
  </>;
}
