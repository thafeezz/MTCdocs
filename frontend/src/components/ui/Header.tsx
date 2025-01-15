import Link from "next/link";
import { jerseyOne } from "../../../styles/fonts";
import { Button } from "./Button";
import { IoHome } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

export const Header = ({
  toggleSidebar,
  isMobile,
}: HeaderProps) => {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="flex items-center justify-between px-4 h-[80px] border-b-2 bg-gradient-to-b from-themegray/80 to-transparent">
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-offwhite hover:text-maize"
            onClick={toggleSidebar}
          >
            <TfiMenu size={24} />
          </Button>
        ) : (
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-offwhite hover:text-maize"
            >
              <IoHome size={24} />
            </Button>
          </Link>
        )}

        <Button>
          <Link href="/docs">
            <div className={`${jerseyOne.className}`}>
              <span className="text-maize text-[40px]">MTC</span>
              <span className="text-offwhite text-[40px]">/</span>
              <span className="text-umblue text-[40px]">docs</span>
            </div>
          </Link>
        </Button>

        <div className="w-10" /> {/* Spacer to maintain center alignment */}
      </div>
    </header>
  );
};