import { ReactNode } from "react";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="bg-themegray flex-1 ml-[250px] p-[64px]">
      <article>{children}</article>
    </main>
  );
};
