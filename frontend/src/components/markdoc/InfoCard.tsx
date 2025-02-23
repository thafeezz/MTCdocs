import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jerseyOne } from "../../../styles/fonts";
import { FileText, Construction } from "lucide-react";

interface InfoCardProps {
  href: string;
  title: string;
  description: string;
  content: string;
  disabled?: boolean;
}

const InfoCard = ({
  title,
  description,
  content,
  href,
  disabled = false,
}: InfoCardProps) => {
  const cardContent = (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105
        bg-background dark:bg-secondary hover:shadow-[0_0_15px_rgba(255,203,5,0.3)]  
        dark:hover:shadow-[0_0_20px_rgba(255,203,5,0.15)] border hover:border-maize/80
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {disabled && (
        <div className="absolute inset-0 bg-red-500/40 flex items-center justify-center">
          <Construction className="w-10 h-10 text-red-600" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-maize" />
          <CardTitle
            className={`${jerseyOne.className} text-2xl text-foreground dark:text-secondary-foreground`}
          >
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      {/* <CardDescription
            className={`${pressStart.className} text-xs text-muted-foreground dark:text-secondary-foreground/70 mt-1`}
          >
            {description}
          </CardDescription> */}
      <CardContent>
        <p className="text-sm text-foreground dark:text-secondary-foreground">
          {content}
        </p>
      </CardContent>
    </Card>
  );

  return disabled ? (
    <div className="block w-full">{cardContent}</div>
  ) : (
    <Link href={href} className="block w-full">
      {cardContent}
    </Link>
  );
};

export default InfoCard;
