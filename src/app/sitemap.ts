import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/about", ...projects.map((p) => `/work/${p.slug}`)].map(
    (path) => ({
      url: `https://huynguyenitcs99.vercel.app${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
