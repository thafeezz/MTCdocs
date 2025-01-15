import React from "react";
import Link from "next/link";
import { pressStart } from "../../../styles/fonts";
import { Button } from "./Button";
import { DirectoryTree } from "@/lib/types";
import { usePathname } from "next/navigation";

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
    <aside className="h-full bg-[hsl(var(--sidebar-bg))] border-gradient-right">
      <div className="flex justify-end p-3 flex-shrink-0">
        <button
          onClick={onToggle}
          className={`${pressStart.className} text-muted-foreground hover:text-foreground transition-colors duration-200 py-1 rounded text-xs`}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="flex-1">
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

const DirectoryItem = ({ item, onNavigate, level = 0 }: DirectoryItemProps) => {
  const pathname = usePathname();
  const urlPath = getCleanPath(item.path);
  const isActive = pathname === urlPath;

  return (
    <li className={`ml-${level * 2}`}>
      <Link
        href={urlPath}
        className={`${pressStart.className}`}
        onClick={onNavigate}
      >
        <Button
          className={`text-xs font-bold ${
            isActive
              ? "text-[#FFCB05]"
              : "text-[hsl(var(--nav-muted))] hover:text-[hsl(var(--nav-foreground))]"
          } transition-colors duration-200`}
          variant="link"
        >
          {item.name}
          {item.type === "directory" && "/"}
        </Button>
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="ml-4 space-y-1">
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

const getCleanPath = (itemPath: string): string => {
  const segments = itemPath
    .split("/")
    .filter((segment) => segment && segment !== "content" && segment !== "docs")
    .map((segment) => segment.replace(/\.md$/, ""));
  return `/docs/${segments.join("/")}`;
};

export default Sidebar;
