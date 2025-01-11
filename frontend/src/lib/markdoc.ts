import fs from "fs";
import path from "path";

export function getAllSlugs() {
  const docsDir = path.join(process.cwd(), "content/docs");
  return fs.readdirSync(docsDir).map((file) => file.replace(/\.md$/, ""));
}
