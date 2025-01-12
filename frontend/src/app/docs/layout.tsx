"use client";

import { ReactNode } from "react";
import { DocContent, Sidebar, Header } from "@/components/ui";
import { useCallback, useState } from "react";

const DocsLayout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 relative">
        {!isCollapsed && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-20"
            onClick={toggleSidebar}
          />
        )}
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
          onNavigate={closeSidebar}
        />
        <DocContent>{children}</DocContent>
      </div>
    </div>
  );
};

export default DocsLayout;
