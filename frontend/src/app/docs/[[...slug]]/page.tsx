import { getMarkdownContent } from "@/lib/markdoc";
import React from "react";
import { notFound } from "next/navigation";

interface DocumentProps {
  params: { slug?: string[] };
}

const Document = ({ params }: DocumentProps) => {
  const { slug } = params;
  const slugPath = !slug ? "docs" : slug.join("/");

  try {
    const content = getMarkdownContent(slugPath);

    if (!content) {
      notFound();
    }

    return <div>{content}</div>;
  } catch (error) {
    console.error("Error loading content:", error);
    notFound();
  }
};

export default Document;
