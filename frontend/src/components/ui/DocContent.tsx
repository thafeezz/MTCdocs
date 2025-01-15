import { ReactNode } from "react";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="flex-1 p-6 lg:p-16">
      <div>{children}</div>
    </main>
  );
};
