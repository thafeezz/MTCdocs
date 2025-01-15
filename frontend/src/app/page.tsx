import { Button } from "@/components/ui/Button";
import { WelcomeTitle } from "@/components/ui/Welcome";
import Link from "next/link";
import { pressStart } from "../../styles/fonts";

const Home = () => {
  return (
    <div className="bg-background">
      <main className="min-h-screen">
        <div className="flex flex-col items-center mt-40">
          <WelcomeTitle />
          <Button
            className={`${pressStart.className} opacity-0 animate-fade-in-delay text-foreground text-[10px] font-bold 
            hover:text-maize transition-colors duration-300`}
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