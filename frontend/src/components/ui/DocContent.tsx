import { ReactNode } from "react";
import { lato } from "../../../styles/fonts";

interface DocContentProps {
  children: ReactNode;
}

export const DocContent = ({ children }: DocContentProps) => {
  return (
    <main className="bg-themegray ml-[400px] mr-[250px] p-[64px]">
      <div className={`${lato.className} `}>{children}</div>
    </main>
  );
};
