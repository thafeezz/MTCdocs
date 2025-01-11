import Layout from "@/components/layout";
import { getMarkdownContent } from "../../../../markdoc/parse";

export default function Doc() {
  return <Layout>{getMarkdownContent("introduction")}</Layout>;
}
