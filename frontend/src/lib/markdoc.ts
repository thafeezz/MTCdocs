import { readFileSync } from "node:fs";
import { join } from "node:path";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { components, config } from "@/components/markdoc/config.markdoc";

export const getMarkdownContent = async (slug: string) => {
  const path = join(process.cwd(), "content/docs", `${slug}.md`);
  const fileContent = readFileSync(path, "utf-8");

  const ast = Markdoc.parse(fileContent);

  const errors = Markdoc.validate(ast, config);
  if (errors.length > 0) {
    console.error("Markdoc validation errors:", errors);
  }

  const content = Markdoc.transform(ast, config);

  return Markdoc.renderers.react(content, React, { components });
};
