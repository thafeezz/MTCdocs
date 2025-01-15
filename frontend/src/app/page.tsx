import { Button } from "@/components/ui/Button";
import { WelcomeTitle } from "@/components/ui/Welcome";
import Link from "next/link";
import { pressStart } from "../../styles/fonts";

const Home = () => {
  return (
    <div className="bg-themegray">
      <main className="min-h-screen">
        <div className="flex flex-col items-center mt-40">
          <WelcomeTitle />
          <Button
            className={`${pressStart.className} opacity-0 animate-fade-in-delay text-offwhite text-[10px] font-bold`}
            variant="link"
          >
            <Link href="/docs">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
