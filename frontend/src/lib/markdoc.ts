import { readFileSync } from "node:fs";
import { join } from "node:path";
import Markdoc from "@markdoc/markdoc";
import yaml from "js-yaml";
import { components, config } from "@/components/markdoc/config.markdoc";
import { ReactNode } from "react";
import React from "react";

export const getMarkdownContent = async (slug: string): Promise<ReactNode> => {
  const basePath = join(process.cwd(), "content/docs");
  const filePath =
    !slug || slug === "docs"
      ? join(basePath, "index.md")
      : join(basePath, `${slug}.md`);

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const ast = Markdoc.parse(fileContent);

    const frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};

    const contentConfig = {
      ...config,
      variables: {
        ...config.variables,
        frontmatter,
      },
    };

    const errors = Markdoc.validate(ast, contentConfig);
    if (errors.length > 0) {
      console.error("Markdoc validation errors:", errors);
    }

    const content = Markdoc.transform(ast, contentConfig);
    return Markdoc.renderers.react(content, React, { components });
  } catch (error) {
    if (!slug?.endsWith("index")) {
      return getMarkdownContent(`${slug}/index`);
    }
    throw error;
  }
};
