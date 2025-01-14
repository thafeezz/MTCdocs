export type DirectoryTree = {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: DirectoryTree[];
  sortOrder?: number;
};
