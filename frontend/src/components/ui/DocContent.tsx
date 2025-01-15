import { ReactNode } from "react";
import { inter } from "../../../styles/fonts";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="flex-1 p-6 lg:p-16 overflow-y-auto bg-background">
      <div className={`${inter.className} prose max-w-4xl mx-auto`}>
        <div className="prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground">
          {children}
        </div>
      </div>
    </main>
  );
};
