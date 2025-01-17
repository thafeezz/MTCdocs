"use client";

import { Header, Sidebar, DocContent } from "@/components/ui";
import { MobileNav } from "@/components/ui/MobileNav";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { useIsMobile } from "@/hooks/useIsMobile";
import { DirectoryTree } from "@/lib/types";
import {
  ReactNode,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { usePreventScroll } from "@react-aria/overlays";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ClientDocsLayout = ({
  children,
  tree,
}: {
  children: ReactNode;
  tree: DirectoryTree;
}) => {
  const { isMobile, isLoading } = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      setIsCollapsed(!!isMobile);
    }
  }, [isMobile, isLoading]);

  usePreventScroll({
    isDisabled: isCollapsed || !isMobile,
  });

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-shrink-0">
        <Header toggleSidebar={toggleSidebar} isMobile={!!isMobile} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            tree={tree}
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
            onNavigate={handleNavigate}
          />
        )}

        {isMobile && !isCollapsed && (
          <div className="fixed inset-0 z-50 mt-[60px]">
            <div className="h-full bg-white">
              <MobileNav tree={tree} onNavigate={handleNavigate} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex">
            <DocContent>{children}</DocContent>
            {!isMobile && (
              <div className="w-80 flex-shrink-0 px-4 py-8">
                <TableOfContents key={pathname} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDocsLayout;
