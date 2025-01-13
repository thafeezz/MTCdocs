"use client";

import { ReactNode } from "react";
import { DocContent, Sidebar, Header } from "@/components/ui";
import { useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const DocsLayout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 relative overflow-hidden">
        {!isCollapsed && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-10"
            onClick={toggleSidebar}
          />
        )}
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
          onNavigate={handleNavigate}
        />
        <div className="flex-1 overflow-auto">
          <DocContent>{children}</DocContent>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
