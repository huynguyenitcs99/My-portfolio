import { Composition } from "remotion";
import { BrandStudy } from "./brand-study";
export function RemotionRoot() {
  return (
    <Composition
      id="NekomataBrandStudy"
      component={BrandStudy}
      durationInFrames={300}
      fps={30}
      width={1000}
      height={620}
    />
  );
}
