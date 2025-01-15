import React, { useState } from "react";
import { DirectoryTree } from "@/lib/types";
import { Button } from "./Button";
import { pressStart } from "../../../styles/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface MobileNavProps {
  tree: DirectoryTree;
  onNavigate: () => void;
}

export const MobileNav = ({ tree, onNavigate }: MobileNavProps) => {
  const [currentPath, setCurrentPath] = useState<DirectoryTree[]>([]);
  const [currentNode, setCurrentNode] = useState<DirectoryTree>(tree);
  const pathname = usePathname();

  const navigateForward = (node: DirectoryTree) => {
    if (node.children) {
      setCurrentPath([...currentPath, currentNode]);
      setCurrentNode(node);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      const previousNode = currentPath[currentPath.length - 1];
      setCurrentNode(previousNode);
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const getCleanPath = (itemPath: string): string => {
    const segments = itemPath
      .split("/")
      .filter(
        (segment) => segment && segment !== "content" && segment !== "docs"
      )
      .map((segment) => segment.replace(/\.md$/, ""));
    return `/docs/${segments.join("/")}`;
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--sidebar-bg))] border-gradient-right">
      {currentPath.length > 0 && (
        <div className="border-gradient-bottom">
          <button
            onClick={navigateBack}
            className={`flex items-center gap-2 p-4 text-sm text-muted-foreground hover:text-foreground ${pressStart.className}`}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <nav className="pl-6">
          <ul className="space-y-1 py-4">
            {currentNode.children?.map((item) => {
              const urlPath = getCleanPath(item.path);
              const isActive = pathname === urlPath;
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li key={item.path} className="flex items-center">
                  {hasChildren ? (
                    <button
                      onClick={() => navigateForward(item)}
                      className={`flex items-center justify-between text-xs ${pressStart.className} text-muted-foreground hover:text-foreground transition-colors duration-200 rounded py-2 px-4 w-full`}
                    >
                      <span>{item.name}/</span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <Link
                      href={urlPath}
                      onClick={onNavigate}
                      className={`${pressStart.className} w-full`}
                    >
                      <Button
                        className={`text-xs font-bold text-left justify-start ${
                          isActive
                            ? "text-maize"
                            : "text-muted-foreground hover:text-foreground"
                        } transition-colors duration-200`}
                        variant="link"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
