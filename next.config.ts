import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // next-intl plugin places the alias under experimental.turbo (Next.js ≤15 API),
  // but Next.js 16 moved it to nextConfig.turbopack. Add it explicitly here.
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
};

export default withNextIntl(nextConfig);
