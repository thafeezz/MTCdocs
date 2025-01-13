import Link from "next/link";
import { pressStart } from "../../../styles/fonts";
import { Button } from "./Button";

export const Header = () => {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="flex items-center justify-center h-[80px] border-b-2 bg-gradient-to-b from-themegray/80 to-transparent">
        <Button>
          <Link href="/">
            <span className={`${pressStart.className} text-maize text-[20px]`}>
              MTC
            </span>
            <span
              className={`${pressStart.className} text-offwhite ml-1 text-[18px]`}
            >
              docs
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
};
