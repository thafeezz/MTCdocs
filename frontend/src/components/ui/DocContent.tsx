import { ReactNode } from "react";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="flex-1 p-6 lg:p-16 ml-[40px] lg:ml-[250px] transition-all duration-300">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
};
