"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pressStart } from "../../../styles/fonts";
import { Button } from "./Button";

const sections = [
  { id: 1, name: "Overview", subsections: [] },
  { id: 2, name: "Library", subsections: ["API", "Guides", "Docs"] },
  { id: 3, name: "Curriculum", subsections: [] },
  { id: 4, name: "Contact", subsections: ["Support", "Feedback"] },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}

export const Sidebar = ({
  isCollapsed,
  onToggle,
  onNavigate,
}: SidebarProps) => {
  return (
    <aside className="z-20 relative">
      <div
        className={`${
          isCollapsed ? "w-10" : "w-60"
        } transition-all duration-300 bg-gradient-to-l bg-themegray h-full overflow-auto border-r-2 border-offwhite`}
      >
        <div className="flex justify-end pt-3 pr-3">
          <button
            onClick={onToggle}
            className={`${pressStart.className} text-offwhite hover:bg-gray-900 rounded text-xs`}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        <nav>
          <ul className="space-y-1 p-4">
            {sections.map((section) => (
              <SidebarNav
                key={section.id}
                navName={section.name}
                subsections={section.subsections}
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
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
  isCollapsed: boolean;
  onNavigate: () => void;
}

const SidebarNav = ({
  navName,
  subsections,
  isCollapsed,
  onNavigate,
}: SidebarNavProps) => {
  return (
    <li className="ml-2 text-white">
      <Link
        href={`/docs/${navName.toLowerCase()}`}
        className={`${pressStart.className}`}
        onClick={onNavigate}
      >
        <Button
          className={`text-xs font-bold ${isCollapsed ? "hidden" : "inline"}`}
          variant="link"
        >
          {navName}
        </Button>
      </Link>
      {!isCollapsed && subsections.length > 0 && (
        <ul className="ml-4 space-y-1">
          {subsections.map((subsection, index) => (
            <li key={index} className="text-offwhite text-xs">
              <Link
                href={`/docs/${navName.toLowerCase()}/${subsection.toLowerCase()}`}
                className={`${pressStart.className}`}
                onClick={onNavigate}
              >
                <Button className="text-xs" variant="link">
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
