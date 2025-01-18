import path from "path";
import fs from "fs";

export const navConfig = {
  order: ["overview", "lib", "c8m", "contribute", "contact", "support", "todo"],
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
  const index = navConfig.order.indexOf(name.toLowerCase());
  return index === -1 ? 999 : index;
};

const shouldIncludeFile = (name: string): boolean => {
  return !name.startsWith("index.");
};

export const getDirectoryTree = (dirPath: string): DirectoryTree => {
  const absolutePath = path.join(process.cwd(), dirPath);
  const name = path.basename(absolutePath);
  const stats = fs.statSync(absolutePath);

  if (!stats.isDirectory()) {
    if (!shouldIncludeFile(name)) {
      return null;
    }
    const nameWithoutExt = name.replace(/\.[^/.]+$/, "");
    return {
      name: nameWithoutExt,
      path: dirPath,
      type: "file",
      sortOrder: getSortOrder(nameWithoutExt),
    };
  }

  let children = fs
    .readdirSync(absolutePath)
    .map((file) => getDirectoryTree(path.join(dirPath, file)))
    .filter((item) => item !== null);

  // Sort children using explicit sortOrder comparison
  children = children.sort((a, b) => {
    const aOrder = a.sortOrder ?? 999;
    const bOrder = b.sortOrder ?? 999;

    // Always compare sortOrder first
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // If sortOrder is the same, fall back to alphabetical
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
