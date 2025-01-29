import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jerseyOne, pressStart } from "../../../styles/fonts";
import { FileText } from "lucide-react";

interface InfoCardProps {
  href: string;
  title: string;
  description: string;
  content: string;
}

const InfoCard = ({ title, description, content, href }: InfoCardProps) => {
  return (
    <Link href={href} className="block w-full">
      <Card
        className="
        overflow-hidden 
        transition-all 
        duration-300 
        ease-in-out 
        hover:scale-105
        bg-background 
        dark:bg-secondary
        hover:shadow-[0_0_15px_rgba(255,203,5,0.3)]  
        dark:hover:shadow-[0_0_20px_rgba(255,203,5,0.15)]
        border 
        hover:border-maize/80
      "
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-maize" />
            <CardTitle
              className={`${jerseyOne.className} text-2xl text-foreground dark:text-secondary-foreground`}
            >
              {title}
            </CardTitle>
          </div>
          {/* <CardDescription
            className={`${pressStart.className} text-xs text-muted-foreground dark:text-secondary-foreground/70 mt-1`}
          >
            {description}
          </CardDescription> */}
        </CardHeader>
        {/* <CardContent className="p-2">
          <p className="text-sm text-foreground dark:text-secondary-foreground">
            {content}
          </p>
        </CardContent> */}
      </Card>
    </Link>
  );
};

export default InfoCard;
