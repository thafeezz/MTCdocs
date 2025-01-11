import { Config } from "@markdoc/markdoc";
import Heading from "./Heading";
import Callout from "./Callout";

const config: Config = {
  nodes: {
    paragraph: {
      render: "Paragraph",
    },
    heading: {
      render: "Heading",
      attributes: {
        level: { type: Number },
      },
    },
  },
  tags: {
    callout: {
      render: "Callout",
      attributes: {
        title: {
          type: String,
          default: "default title",
        },
      },
    },
  },
};

const components = {
  Paragraph: ({ children }: any) => {
    return <div className="text-base pb-2">{children}</div>;
  },
  Heading: Heading,
  Callout: Callout,
};

export { config, components };
