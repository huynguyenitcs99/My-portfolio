"use client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { BrandStudy } from "@/remotion/brand-study";

export default function StudyPlayer({ active }: { active: boolean }) {
  const player = useRef<PlayerRef>(null);
  useEffect(() => {
    if (active) player.current?.play();
    else player.current?.pause();
  }, [active]);
  return (
    <div className="study-player" aria-hidden="true">
      <Player
        ref={player}
        component={BrandStudy}
        durationInFrames={300}
        compositionWidth={1000}
        compositionHeight={620}
        fps={30}
        loop
        controls={false}
        autoPlay={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
