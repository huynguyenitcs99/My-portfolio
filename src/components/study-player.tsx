"use client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { COMPACT_STUDY_HEIGHT, COMPACT_STUDY_WIDTH } from "@/remotion/compact-study";
import { studyPhaseAt, type StudyPhase } from "@/remotion/study-content";
import {
  BrandStudy,
  STUDY_DURATION,
  STUDY_FPS,
  STUDY_WIDTH,
  STUDY_HEIGHT,
} from "@/remotion/brand-study";

export default function StudyPlayer({
  active,
  compact,
  onPhaseChange,
  onReady,
  seek,
}: {
  active: boolean;
  compact: boolean;
  onPhaseChange: (phase: StudyPhase) => void;
  onReady: () => void;
  seek: { frame: number; request: number } | null;
}) {
  const player = useRef<PlayerRef>(null);
  useEffect(() => {
    const current = player.current;
    if (!current) return;
    let previous = -1;
    const update = ({ detail }: { detail: { frame: number } }) => {
      const phase = studyPhaseAt(detail.frame);
      if (phase !== previous) {
        previous = phase;
        onPhaseChange(phase);
      }
    };
    current.addEventListener("frameupdate", update);
    update({ detail: { frame: current.getCurrentFrame() } });
    onReady();
    return () => current.removeEventListener("frameupdate", update);
  }, [onPhaseChange, onReady]);
  useEffect(() => {
    if (seek) player.current?.seekTo(seek.frame);
  }, [seek]);
  useEffect(() => {
    if (active) player.current?.play();
    else player.current?.pause();
  }, [active]);
  return (
    <div className="study-player" aria-hidden="true">
      <Player
        ref={player}
        component={BrandStudy}
        durationInFrames={STUDY_DURATION}
        compositionWidth={compact ? COMPACT_STUDY_WIDTH : STUDY_WIDTH}
        compositionHeight={compact ? COMPACT_STUDY_HEIGHT : STUDY_HEIGHT}
        inputProps={{ compact }}
        fps={STUDY_FPS}
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
