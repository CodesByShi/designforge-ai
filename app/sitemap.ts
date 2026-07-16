import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://designforge.dev";
  const routes = ["", "/library", "/playground", "/my-kit", "/changelog", "/docs/getting-started", "/settings"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
