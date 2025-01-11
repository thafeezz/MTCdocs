import type { NextConfig } from "next";

const withMarkdoc = require("@markdoc/next.js")({
    schemaPath: "",
  mode: "static",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withMarkdoc(nextConfig);
