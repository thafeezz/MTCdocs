import React from "react";
import Link from "next/link";
import { pressStart } from "../../../styles/fonts";
import { Button } from "./Button";
import { DirectoryTree } from "@/lib/types";

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
    <aside className="z-20 relative">
      <div
        className={`${
          isCollapsed ? "w-10" : "w-60"
        } transition-all duration-300 bg-gradient-to-l bg-themegray h-full overflow-auto border-r-2 border-offwhite`}
      >
        <div className="flex justify-end pt-3 pr-3">
          <button
            onClick={onToggle}
            className={`${pressStart.className} text-offwhite hover:bg-gray-900 rounded text-xs`}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        <nav>
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
      </div>
    </aside>
  );
};

interface DirectoryItemProps {
  item: DirectoryTree;
  onNavigate: () => void;
  level?: number;
}

const DirectoryItem = ({ item, onNavigate, level = 0 }: DirectoryItemProps) => {
  // Create clean URL path without 'content', 'docs', and '.md'
  const getCleanPath = (itemPath: string): string => {
    const segments = itemPath
      .split("/")
      .filter(
        (segment) => segment && segment !== "content" && segment !== "docs"
      )
      .map((segment) => segment.replace(/\.md$/, "")); // Remove .md extension

    // If it's a directory, we want to point to its index file
    // but keep the URL clean (without /index)
    if (item.type === "directory") {
      return `/docs/${segments.join("/")}`;
    }

    return `/docs/${segments.join("/")}`;
  };

  const urlPath = getCleanPath(item.path);

  return (
    <li className={`ml-${level * 2} text-white`}>
      <Link
        href={urlPath}
        className={`${pressStart.className}`}
        onClick={onNavigate}
      >
        <Button className="text-xs font-bold" variant="link">
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
