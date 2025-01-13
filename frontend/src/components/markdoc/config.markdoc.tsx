import { Config, nodes } from "@markdoc/markdoc";
import Heading from "./Heading";
import Callout from "./Callout";
import React, { ReactNode } from "react";

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
      render: "Callout",
      attributes: {
        title: {
          type: String,
        },
      },
    },
    underline: {
      render: "underline",
      selfClosing: false,
    },
  },
};

const components = {
  Heading: Heading,
  Paragraph: ({ children }: { children: ReactNode }) => {
    return <div className="text-lg mb-5">{children}</div>;
  },
  Callout: Callout,
  underline: ({ children }: { children: ReactNode }) => (
    <span style={{ textDecoration: "underline" }}>{children}</span>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="pl-4 border-l-4 border-gray-200 my-4">
      {children}
    </blockquote>
  ),
  // TODO: add typing like above instead of type any
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
