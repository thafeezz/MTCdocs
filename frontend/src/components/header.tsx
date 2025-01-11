import Link from "next/link";
import { pressStart } from "../../styles/fonts";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky z-30 top-0 w-full">
      <div className="h-32 flex justify-center bg-gradient-to-b from-themegray/80 to-transparent">
        <Button className="flex mt-8">
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
}
