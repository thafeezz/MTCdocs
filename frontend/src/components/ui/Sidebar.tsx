import React from "react";
import { pressStart } from "../../../styles/fonts";
import Link from "next/link";
import { Button } from "./Button";

const sections = [
  { id: 1, name: "Introduction", subsections: ["Overview"] },
  { id: 2, name: "Library", subsections: ["API", "Guides", "Docs"] },
  { id: 3, name: "Curriculum", subsections: [] },
  { id: 4, name: "Contact", subsections: ["Support", "Feedback"] },
];

export const Sidebar = () => {
  return (
    <aside>
      <div className="bg-gradient-to-l from-themegray/80 to-transparent h-screen w-[250px] fixed overflow-auto">
        <nav>
          <ul>
            {sections.map((section) => (
              <SidebarNav
                key={section.id}
                navName={section.name}
                subsections={section.subsections}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

interface SidebarNavProps {
  navName: string;
  subsections: string[];
}

const SidebarNav = ({ navName, subsections }: SidebarNavProps) => {
  return (
    <li className="ml-2 text-offwhite">
      <Link
        href={`/docs/${navName.toLowerCase()}`}
        className={`${pressStart.className} hover:underline`}
      >
        <Button className="text-[12px]" variant="link">
          {navName}
        </Button>
      </Link>
      {subsections.length > 0 && (
        <ul className="ml-4 ">
          {subsections.map((subsection, index) => (
            <li key={index} className="text-offwhite text-[10px]">
              <Link
                href={`/docs/${navName.toLowerCase()}/${subsection.toLowerCase()}`}
                className={`${pressStart.className} hover:underline`}
              >
                <Button className="text-[10px]" variant="link">
                  {subsection}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
