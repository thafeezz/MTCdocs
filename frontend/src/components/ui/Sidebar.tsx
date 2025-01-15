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
    <aside className="h-full bg-gradient-to-l from-themegray to-themegray border-r-2 border-offwhite flex flex-col overflow-y-auto">
      <div className="flex justify-end p-3 flex-shrink-0">
        <button
          onClick={onToggle}
          className={`${pressStart.className} text-offwhite hover:bg-gray-900 rounded text-xs`}
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
  const pathname = usePathname(); // Add this hook to get current path

  const getCleanPath = (itemPath: string): string => {
    const segments = itemPath
      .split("/")
      .filter(
        (segment) => segment && segment !== "content" && segment !== "docs"
      )
      .map((segment) => segment.replace(/\.md$/, ""));

    if (item.type === "directory") {
      return `/docs/${segments.join("/")}`;
    }
    return `/docs/${segments.join("/")}`;
  };

  const urlPath = getCleanPath(item.path);
  const isActive = pathname === urlPath;

  return (
    <li className={`ml-${level * 2} text-white`}>
      <Link
        href={urlPath}
        className={`${pressStart.className}`}
        onClick={onNavigate}
      >
        <Button
          className={`text-xs font-bold ${
            isActive ? "text-maize" : "text-white"
          }`}
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

export default Sidebar;
