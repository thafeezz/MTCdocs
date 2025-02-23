import { Config, nodes } from "@markdoc/markdoc";
import Heading from "./Heading";
import React, { ReactNode } from "react";
import { Note, Alert, Tip } from "./Note";
import { Image } from "./Image";
import InfoCard from "./InfoCard";
import Grid from "./Grid";
import { Math } from "./MathJax";

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
    image: {
      render: "Image",
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        title: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    },
  },
  variables: {
    frontmatter: {
      type: Object,
      default: {},
    },
  },
  tags: {
    math: {
      render: "Math",
      attributes: {
        inline: { type: Boolean, default: true },
      },
    },
    grid: {
      render: "Grid",
      attributes: {
        columns: {
          type: Number,
          default: 3,
        },
      },
    },
    infocard: {
      render: "InfoCard",
      attributes: {
        href: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        content: {
          type: String,
          required: false,
        },
        disabled: {
          type: Boolean,
          required: false,
        },
      },
    },
    note: {
      render: "Note",
      attributes: {
        title: {
          type: String,
        },
      },
    },
    alert: {
      render: "Alert",
      attributes: {
        title: {
          type: String,
        },
      },
    },
    tip: {
      render: "Tip",
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
    return <div className="mb-5">{children}</div>;
  },
  Note,
  Alert,
  Tip,
  Image,
  InfoCard,
  Grid,
  Math,
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
  code: ({ children, language }: { children: ReactNode; language: string }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  ),
  fence: ({
    children,
    language,
  }: {
    children: ReactNode;
    language: string;
  }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
      <code className={language ? `language-${language}` : ""}>{children}</code>
    </pre>
  ),
  hr: () => <hr className="my-8 border-t border-gray-200" />,
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gray-50">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {children}
    </td>
  ),
};

export { config, components };
