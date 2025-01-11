"use client";

import { Button } from "@/components/ui/button";
import WelcomeTitle from "../components/welcome";
import Link from "next/link";
import { pressStart } from "../../styles/fonts";

export default function Home() {
  return (
    <div className="p-8 bg-themegray">
      <main className="min-h-screen">
        <div className="flex flex-col items-center mt-32">
          <WelcomeTitle />
          <Button
            className={`${pressStart.className} mt-6 opacity-0 animate-fade-in-delay text-offwhite text-[10px] font-bold`}
            variant="link"
          >
            <Link href="/docs">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
