import path from "path";
import fs from "fs";

export const navConfig = {
  order: [
    
    "overview",
    "lib",
    "c8m",
    "contribute",
    "contact",
    "support",
    "todo",
  ],
  // Define sections that should show their children by default
  expandedSections: ["lib", "overview", "contact"],
};

export type DirectoryTree = {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: DirectoryTree[];
  sortOrder?: number;
};

const getSortOrder = (name: string): number => {
  const index = navConfig.order.indexOf(name);
  return index === -1 ? navConfig.order.length : index;
};

const shouldIncludeFile = (name: string): boolean => {
  // Don't show index files in the sidebar
  return !name.startsWith("index.");
};

export const getDirectoryTree = (dirPath: string): DirectoryTree => {
  const absolutePath = path.join(process.cwd(), dirPath);
  const name = path.basename(absolutePath);
  const stats = fs.statSync(absolutePath);

  if (!stats.isDirectory()) {
    // If it's an index file and we're not including it
    if (!shouldIncludeFile(name)) {
      return null;
    }

    // For files, remove the extension
    const nameWithoutExt = name.replace(/\.[^/.]+$/, "");
    return {
      name: nameWithoutExt,
      path: dirPath,
      type: "file",
      sortOrder: getSortOrder(nameWithoutExt),
    };
  }

  const children = fs
    .readdirSync(absolutePath)
    .map((file) => getDirectoryTree(path.join(dirPath, file)))
    .filter((item) => item !== null) // Remove null items (filtered index files)
    .sort((a, b) => {
      // Sort by configured order first, then alphabetically
      if (a.sortOrder !== b.sortOrder) {
        return (a.sortOrder || 999) - (b.sortOrder || 999);
      }
      return a.name.localeCompare(b.name);
    });

  return {
    name,
    path: dirPath,
    type: "directory",
    children,
    sortOrder: getSortOrder(name),
  };
};
