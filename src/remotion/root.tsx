import { Composition } from "remotion";
import {
  BrandStudy,
  STUDY_DURATION,
  STUDY_FPS,
  STUDY_WIDTH,
  STUDY_HEIGHT,
} from "./brand-study";
export function RemotionRoot() {
  return (
    <Composition
      id="NekomataBrandStudy"
      component={BrandStudy}
      durationInFrames={STUDY_DURATION}
      fps={STUDY_FPS}
      width={STUDY_WIDTH}
      height={STUDY_HEIGHT}
    />
  );
}
