import React, { useState } from "react";
import Link from "next/link";
import { pressStart } from "../../../styles/fonts";
import { Button } from "./Button";
import { DirectoryTree } from "@/lib/types";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SidebarProps {
  tree: DirectoryTree;
  isCollapsed: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}

export const Sidebar = ({
  tree,
  isCollapsed,
  onToggle,
  onNavigate,
}: SidebarProps) => {
  return (
    <aside className="h-full bg-[hsl(var(--sidebar-bg))] border-gradient-right flex flex-col">
      <div className="flex justify-end p-3 flex-shrink-0">
        <button
          onClick={onToggle}
          className={`${pressStart.className} text-muted-foreground hover:text-foreground transition-colors duration-200 py-1 rounded text-xs`}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          {!isCollapsed &&
            tree.children?.map((item) => (
              <DirectoryItem
                key={item.path}
                item={item}
                onNavigate={onNavigate}
              />
            ))}
        </ul>
      </nav>
    </aside>
  );
};

interface DirectoryItemProps {
  item: DirectoryTree;
  onNavigate: () => void;
  level?: number;
}

const getCleanPath = (itemPath: string): string => {
  const segments = itemPath
    .split("/")
    .filter((segment) => segment && segment !== "content") // Only remove "content"
    .map((segment) => segment.replace(/\.md$/, ""));
  return `/${segments.join("/")}`; // Don't add /docs/ since it's already in the path
};

const DirectoryItem = ({ item, onNavigate, level = 0 }: DirectoryItemProps) => {
  const pathname = usePathname();
  const urlPath = getCleanPath(item.path);
  const isActive = pathname === urlPath;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className={`ml-${level * 2}`}>
      <div className="flex items-center gap-1">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        <Link
          href={urlPath}
          className={`${pressStart.className} flex-1`}
          onClick={onNavigate}
        >
          <Button
            className={`text-xs font-bold ${
              isActive
                ? "text-maize"
                : "text-muted-foreground hover:text-foreground"
            } transition-colors duration-200 w-full justify-start`}
            variant="link"
          >
            {item.name}
            {item.type === "directory" && "/"}
          </Button>
        </Link>
      </div>
      {hasChildren && isExpanded && (
        <ul className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <DirectoryItem
              key={child.path}
              item={child}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
