import Link from "next/link";
import { jerseyOne } from "../../../styles/fonts";
import { Button } from "./Button";
import { IoHome } from "react-icons/io5";

export const Header = () => {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="flex items-center justify-between px-4 h-[80px] border-b-2 bg-gradient-to-b from-themegray/80 to-transparent">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-offwhite hover:text-maize"
          >
            <IoHome size={24} />
          </Button>
        </Link>

        <Button>
          <Link href="/docs">
            <div className={`${jerseyOne.className}`}>
              <span className="text-maize text-[40px]">MTC</span>
              <span className="text-offwhite text-[40px]">/</span>
              <span className="text-umblue text-[40px]">docs</span>
            </div>
          </Link>
        </Button>

        {/* empty div to maintain center alignment with justify-between */}
        <div className="w-[40px]" />
      </div>
    </header>
  );
};
