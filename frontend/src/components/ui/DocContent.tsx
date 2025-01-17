import { ReactNode } from "react";
import { inter } from "../../../styles/fonts";
import { Breadcrumb } from "./BreadcrumbNav";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <div className="w-full flex-1 px-16 py-8">
      <Breadcrumb />
      <div
        className={`
          ${inter.className} 
          prose prose-invert 
          prose-headings:text-foreground 
          prose-p:text-foreground 
          prose-strong:text-foreground 
          max-w-none
          break-words
          overflow-hidden
          prose-pre:overflow-x-auto
          prose-pre:whitespace-pre-wrap
          prose-pre:break-words
          prose-code:break-words
          prose-code:whitespace-pre-wrap
        `}
      >
        {children}
      </div>
    </div>
  );
};
