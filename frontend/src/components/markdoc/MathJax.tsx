"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export const Math = ({ children, inline = true }) => {
  return (
    <MathJaxContext>
      {inline ? (
        <span>{`\\(${children}\\)`}</span>
      ) : (
        <div>{`\\[${children}\\]`}</div>
      )}
    </MathJaxContext>
  );
};
