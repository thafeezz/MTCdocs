import { Config } from "@markdoc/markdoc";

const config: Config = {
  nodes: {
    document: {
      render: "article",
    },
    heading: {
      render: "h1",
      attributes: {
        level: { type: Number, required: true },
        id: { type: String },
      },
    },
    paragraph: {
      render: "p",
    },
    // Add other nodes as needed
  },
  tags: {
    // Define your custom tags here
    callout: {
      render: "Callout",
      attributes: {
        type: {
          type: String,
          default: "note",
        },
      },
    },
  },
  variables: {
    markdoc: {
      frontmatter: {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    },
  },
};

export default config;
