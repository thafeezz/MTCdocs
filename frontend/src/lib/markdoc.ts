// import { readFileSync } from "node:fs";
// import { join } from "node:path";
// import Markdoc from "@markdoc/markdoc";
// import React from "react";
// import { components, config } from "@/components/markdoc/config.markdoc";

// export const getMarkdownContent = async (slug: string) => {
//   // If it's a directory path, append index
//   const slugPath = slug.endsWith("/") ? `${slug}index` : slug;

//   // Always append .md to the path
//   const path = join(process.cwd(), "content/docs", `${slugPath}.md`);

//   try {
//     const fileContent = readFileSync(path, "utf-8");

//     const ast = Markdoc.parse(fileContent);

//     const errors = Markdoc.validate(ast, config);
//     if (errors.length > 0) {
//       console.error("Markdoc validation errors:", errors);
//     }

//     const content = Markdoc.transform(ast, config);

//     return Markdoc.renderers.react(content, React, { components });
//   } catch (error) {
//     // If the direct path fails and it's not already an index path, try with index
//     if (!slugPath.endsWith("index")) {
//       return getMarkdownContent(`${slug}/index`);
//     }
//     throw error;
//   }
// };
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { components, config } from "@/components/markdoc/config.markdoc";

export const getMarkdownContent = async (slug: string) => {
  // Handle root case and build path
  const basePath = join(process.cwd(), "content/docs");
  const filePath =
    !slug || slug === "docs"
      ? join(basePath, "index.md")
      : join(basePath, `${slug}.md`);

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const ast = Markdoc.parse(fileContent);
    const errors = Markdoc.validate(ast, config);
    if (errors.length > 0) {
      console.error("Markdoc validation errors:", errors);
    }
    const content = Markdoc.transform(ast, config);
    return Markdoc.renderers.react(content, React, { components });
  } catch (error) {
    // For directories, try to load index.md
    if (!slug?.endsWith("index")) {
      return getMarkdownContent(`${slug}/index`);
    }
    throw error;
  }
};
