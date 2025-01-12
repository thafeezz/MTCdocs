import { Config, nodes } from "@markdoc/markdoc";
import Heading from "./Heading";
import Callout from "./Callout";
import { ReactNode } from "react";

const config: Config = {
  nodes: {
    ...nodes,
    heading: {
      render: "Heading",
      attributes: {
        level: { type: Number },
      },
    },
    paragraph: {
      render: "Paragraph",
    },
  },
  tags: {
    callout: {
      render: "callout",
      attributes: {
        title: {
          type: String,
          default: "default title",
        },
      },
    },
    break: {
      render: "break",
      selfClosing: true,
    },
    underline: {
      render: "underline",
      selfClosing: false,
    },
    a: {
      render: "a",
      selfClosing: false,
      attributes: {
        href: { type: String },
        title: { type: String },
      },
    },
  },
};

const components = {
  Heading: Heading,
  Paragraph: ({ children }: { children: ReactNode }) => {
    return <div className="text-lg pb-1">{children}</div>;
  },
  Callout: Callout,
  break: () => <br className="my-4" />,
  underline: ({ children }: { children: ReactNode }) => (
    <span style={{ textDecoration: "underline" }}>{children}</span>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  a: ({ children, href, title }: any) => (
    <a href={href} title={title} className="text-blue-500 hover:underline">
      {children}
    </a>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="pl-4 border-l-4 border-gray-200 my-4">
      {children}
    </blockquote>
  ),
  list: ({ children, ordered }: any) => {
    const ListTag = ordered ? "ol" : "ul";
    return <ListTag className="list-inside my-4 space-y-2">{children}</ListTag>;
  },
  item: ({ children }: any) => <li className="list-disc ml-4">{children}</li>,
  code: ({ children, language }: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  ),
  fence: ({ children, language }: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  ),
  hr: () => <hr className="my-8 border-t border-gray-200" />,
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-gray-50">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }: any) => <tr>{children}</tr>,
  th: ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {children}
    </td>
  ),
};

export { config, components };
