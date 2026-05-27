import type { MetadataRoute } from "next";

const baseUrl = "https://ems-gabon.com";
const locales = ["fr", "en"];

const routes = [
  "",
  "/a-propos",
  "/services",
  "/solutions-entreprises",
  "/solutions-particuliers",
  "/sage-100",
  "/securite-videosurveillance",
  "/fibre-optique",
  "/formation",
  "/support",
  "/realisations",
  "/contact",
  "/devis",
  "/rendez-vous",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
