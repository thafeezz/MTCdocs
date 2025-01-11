import { ReactNode } from "react";
import { DocContent, Sidebar, Header } from "@/components";

const DocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-row">
        <Sidebar />
        <DocContent>{children}</DocContent>
      </div>
    </div>
  );
};

export default DocsLayout;
