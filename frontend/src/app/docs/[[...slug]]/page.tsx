import { getMarkdownContent } from "@/lib/markdoc";
import React from "react";
import { notFound } from "next/navigation";

interface DocumentProps {
  params: Promise<{ slug?: string[] }>;
}

const Document = async ({ params }: DocumentProps) => {
  const { slug } = await params;
  const slugPath = !slug ? "docs" : slug.join("/");

  try {
    const content = await getMarkdownContent(slugPath);

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