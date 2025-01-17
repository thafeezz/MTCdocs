import type { NextConfig } from "next";

const withMarkdoc = require("@markdoc/next.js")({
  schemaPath: "markdoc/schema.ts",
  mode: "static",
});

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdoc", "js", "ts", "jsx", "tsx"],
  images: {
    domains: [], // Add any external domains you'll load images from
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withMarkdoc(nextConfig);
