"use client";
import { Header, Sidebar, DocContent } from "@/components/ui";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DirectoryTree } from "@/lib/types";
import { ReactNode, useCallback, useState } from "react";

const ClientDocsLayout = ({
  children,
  tree,
}: {
  children: ReactNode;
  tree: DirectoryTree;
}) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 768;
  });

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
          tree={tree}
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

export default ClientDocsLayout;