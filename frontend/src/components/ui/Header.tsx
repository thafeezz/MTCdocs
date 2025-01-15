import Link from "next/link";
import { jerseyOne } from "../../../styles/fonts";
import { Button } from "./Button";
import { IoHome } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

export const Header = ({ toggleSidebar, isMobile }: HeaderProps) => {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-border bg-[hsl(var(--header-bg))] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--header-bg))]/95">
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleSidebar}
            >
              <TfiMenu size={20} />
            </Button>
          ) : (
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <IoHome size={20} />
              </Button>
            </Link>
          )}
        </div>

        <Link href="/docs">
          <div className={`${jerseyOne.className}`}>
            <span className="text-maize text-[32px]">MTC</span>
            <span className="text-foreground text-[32px]">/</span>
            <span className="text-umblue text-[32px]">docs</span>
          </div>
        </Link>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};