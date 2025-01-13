import Link from "next/link";
import { jerseyOne, pressStart } from "../../../styles/fonts";
import { Button } from "./Button";

export const Header = () => {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="flex items-center justify-center h-[80px] border-b-2 bg-gradient-to-b from-themegray/80 to-transparent">
        <Button>
          <Link href="/">
            <div className={`${jerseyOne.className}`}>
              <span className=" text-maize text-[40px]">MTC</span>
              <span className="text-offwhite text-[40px]">/</span>
              <span className="text-umblue text-[40px]">docs</span>
            </div>
          </Link>
        </Button>
      </div>
    </header>
  );
};
