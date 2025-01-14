import { ReactNode } from "react";
import ClientDocsLayout from "./clientLayout";
import { getDirectoryTree } from "@/lib/serverUtils";

const DocsLayout = async ({ children }: { children: ReactNode }) => {
  const tree = getDirectoryTree("content/docs");
  return <ClientDocsLayout tree={tree}>{children}</ClientDocsLayout>;
};

export default DocsLayout;
