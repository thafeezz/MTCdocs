import Layout from "@/components/layout";
import { getMarkdownContent } from "../../../markdoc/parse";

export default function Intro() {
  return <Layout>{getMarkdownContent("introduction")}</Layout>;
}
