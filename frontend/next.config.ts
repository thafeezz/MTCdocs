import type { NextConfig } from "next";

const withMarkdoc = require("@markdoc/next.js")({
  schemaPath: "markdoc/schema.ts",
  mode: "static",
});

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdoc", "js", "ts", "jsx", "tsx"],
};

export default withMarkdoc(nextConfig);
