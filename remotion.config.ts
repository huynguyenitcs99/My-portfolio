import { Config } from "@remotion/cli/config";
import path from "node:path";

// Share the same public assets and artwork CSS with Next without duplicating either.
Config.overrideWebpackConfig((configuration) => ({
  ...configuration,
  resolve: {
    ...configuration.resolve,
    alias: {
      ...configuration.resolve?.alias,
      "/images": path.resolve("public/images"),
      "/fonts": path.resolve("public/fonts"),
    },
  },
}));
