import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pressStart } from "../../../styles/fonts";
import React from "react";

export const Breadcrumb = () => {
  const pathname = usePathname();

  if (!pathname || pathname === "/docs") return null;

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: segment,
    }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 mb-6 text-sm"
    >
      {segments.map((segment, index) => (
        <React.Fragment key={segment.path}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )}
          <Link
            href={`/${segments
              .slice(0, index + 1)
              .map((s) => s.path)
              .join("/")}`}
            className={`${pressStart.className} ${
              index === segments.length - 1
                ? "text-maize"
                : "text-muted-foreground hover:text-foreground"
            } transition-colors duration-200`}
          >
            {segment.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
