import { ReactNode } from "react";
import { inter } from "../../../styles/fonts";
import { Breadcrumb } from "./BreadcrumbNav";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <>
      <Breadcrumb />
      <div className={`${inter.className} prose prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground max-w-none`}>
        {children}
      </div>
    </>
  );
};