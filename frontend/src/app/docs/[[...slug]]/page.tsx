import { getMarkdownContent } from "@/lib/markdoc";
import React from "react";

interface DocumentProps {
  params: Promise<{ slug?: string[] }>;
}

const Document = async ({ params }: DocumentProps) => {
  const { slug } = await params;

  const slugPath = !slug ? "docs" : slug.join("/");

  const content = await getMarkdownContent(slugPath);

  if (!content) {
    return <div>Document not found</div>;
  }

  return <div>{content}</div>;
};

export default Document;
