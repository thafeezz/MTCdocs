import Layout from "@/components/layout";
import { getMarkdownContent } from "../../../markdoc/parse";

export default function QuickLinks() {
  return <Layout>{getMarkdownContent("docs")}</Layout>;
}
