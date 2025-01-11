// import Markdoc from "@markdoc/markdoc";
import { getMarkdownContent } from "@/lib/markdoc";
import React from "react";

// async function generateStaticParams() {}

interface DocumentProps {
  params: Promise<{ slug?: string[] }>;
}

const Document = async ({ params }: DocumentProps) => {
  const { slug } = await params;

  const slugPath = !slug ? "docs" : slug.join("/");

  const { content } = await getMarkdownContent(slugPath);

  if (!content) {
    return <div>Document not found</div>;
  }

  return <div>hello</div>;
  // return Markdoc.renderers.react(content, React, {});
};

export default Document;
