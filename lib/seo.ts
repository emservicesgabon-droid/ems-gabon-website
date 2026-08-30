import type { Metadata } from "next";

/**
 * Construit les métadonnées SEO/OpenGraph par page.
 * `path` : chemin après la locale, ex. "" (accueil), "/services", "/a-propos".
 * Les champs OG/Twitter (siteName, images, locale) sont fusionnés avec ceux du layout.
 */
export function pageMeta({
  locale,
  title,
  description,
  path,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `/fr${path}`,
        en: `/en${path}`,
        "x-default": `/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
