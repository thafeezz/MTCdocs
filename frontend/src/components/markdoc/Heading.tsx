import React from "react";
import { JSX } from "react";

type HeadingProps = {
  children: any;
  level: number;
};

const Heading = ({ children, level }: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const fontSizeClasses =
    ["text-3xl", "text-2xl", "text-xl", "text-lg", "text-base", "text-sm"][
      level - 1
    ] || "text-base";

  return React.createElement(
    HeadingTag,
    { id: children, className: `${fontSizeClasses} font-semibold my-6` },
    children
  );
};

export default Heading;
