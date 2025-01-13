import { ReactNode } from "react";
import { kanit } from "../../../styles/fonts";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="flex-1 p-6 lg:p-16">
      <div
        className={`${kanit.className} max-w-6xl mx-auto prose prose-invert prose-blue`}
      >
        {children}
      </div>
    </main>
  );
};
