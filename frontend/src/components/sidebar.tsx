import React from "react";
import { pressStart } from "../../styles/fonts";
import Link from "next/link";
import { Button } from "./ui/button";

const sections = [
  { id: 1, name: "Introduction", subsections: ["Overview", "Getting Started"] },
  { id: 2, name: "Library", subsections: ["API", "Guides", "Docs"] },
  { id: 3, name: "Curriculum", subsections: ["Course 1", "Course 2"] },
  { id: 4, name: "Contact", subsections: ["Support", "Feedback"] },
];

export default function Sidebar() {
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
}

interface SidebarNavProps {
  navName: string;
  subsections: string[];
}

function SidebarNav({ navName, subsections }: SidebarNavProps) {
  return (
    <li className="ml-2 text-offwhite">
      <Link
        href={`/${navName.toLowerCase()}`}
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
                href={`/${navName.toLowerCase()}/${subsection.toLowerCase()}`}
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
}
