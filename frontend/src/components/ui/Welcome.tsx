"use client";
import { useState, useEffect } from "react";
import { jerseyOne, pressStart } from "../../../styles/fonts";
import { useIsMobile } from "@/hooks/useIsMobile";

export const WelcomeTitle = () => {
  const [text, setText] = useState("");
  const fullText = "MTC/docs";
  const { isMobile } = useIsMobile();

  useEffect(() => {
    setText("");

    const typeText = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      for (let i = 0; i <= fullText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setText(fullText.slice(0, i));
      }
    };

    typeText();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isMobile ? "min-h-[200px]" : "min-h-[300px]"
      } px-4`}
    >
      <h3
        className={`${pressStart.className} ${
          isMobile ? "text-xs" : "text-lg"
        } text-foreground opacity-0 animate-fade-in-welcome mb-2 text-center`}
      >
        Welcome to
      </h3>
      <div className="flex items-baseline leading-none">
        <h1
          className={`${jerseyOne.className} text-7xl sm:text-7xl md:text-8xl lg:text-9xl flex`}
        >
          <span className="text-maize">{text.slice(0, 3)}</span>
          <span className="text-foreground">{text.slice(3, 4)}</span>
          <span className="text-umblue">{text.slice(4)}</span>
          <span className="w-2 h-16 sm:h-20 md:h-24 lg:h-32 bg-maize animate-blink ml-2"></span>
        </h1>
      </div>
      <h3
        className={`${pressStart.className} ${
          isMobile ? "text-xs" : "text-base"
        } text-foreground opacity-0 animate-fade-in-delay mt-4 text-center`}
      >
        at the University of Michigan
      </h3>
    </div>
  );
};
