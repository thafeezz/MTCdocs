"use client";

import { useState, useEffect } from "react";
import { jerseyOne, pressStart } from "../../../styles/fonts";

export const WelcomeTitle = () => {
  const [text, setText] = useState("");

  const fullText = "MTCdocs";

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [text]);

  return (
    <div className="flex flex-col items-center">
      <h3
        className={`${pressStart.className} text-[20px] text-offwhite opacity-0 animate-fade-in-delay`}
      >
        Welcome to
      </h3>
      <div className="flex items-baseline leading-none">
        <h1 className={`${jerseyOne.className} text-[128px] flex`}>
          <span className="text-maize">{text.slice(0, 3)}</span>
          <span className="text-umblue">{text.slice(3)}</span>
          <span className="w-[8px] h-[128px] bg-maize animate-blink ml-2"></span>
        </h1>
      </div>
      <h3
        className={`${pressStart.className} text-[14px] text-offwhite opacity-0 animate-fade-in-delay`}
      >
        at the University of Michigan
      </h3>
    </div>
  );
};
