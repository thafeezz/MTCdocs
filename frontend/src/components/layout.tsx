"use client";

import React, { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import DocContent from "./doc-content";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-row">
        <Sidebar />
        <DocContent>{children}</DocContent>
      </div>
    </div>
  );
}
