const config = {
  nodes: {
    heading: {
      render: "Heading",
      attributes: {
        id: { type: String },
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
          description: "Top callout title",
        },
      },
    },
  },
  variables: {
    name: "Dr. Mark",
    frontmatter: {
      title: "Configuration options",
    },
  },
  functions: {
    
  },
};

export default config;
