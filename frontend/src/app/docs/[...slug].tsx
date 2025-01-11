import { GetStaticPaths, GetStaticProps } from "next";
import { getMarkdownContent } from "../../../markdoc/parse";
import { getAllSlugs } from "../../lib/markdoc";
import Layout from "@/components/layout";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface DocProps {
  children: ReactNode;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<DocProps> = async ({ params }) => {
  const { slug } = params as Params;
  const html = await getMarkdownContent(slug);

  return {
    props: {
      children: html,
    },
  };
};

export default function Doc({ children }: DocProps) {
  return <Layout>{children}</Layout>;
}
