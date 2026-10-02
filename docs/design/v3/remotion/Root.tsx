import React from 'react';
import {Composition} from 'remotion';
import {CardToHero} from './CardToHero';
import {VisualDNA} from './VisualDNA';

export function MotionStoryboardRoot() {
  return <>
    <Composition id="CardToHero" component={CardToHero} durationInFrames={180} fps={30} width={1440} height={900} />
    <Composition id="VisualDNA" component={VisualDNA} durationInFrames={240} fps={30} width={1440} height={900} />
  </>;
}
