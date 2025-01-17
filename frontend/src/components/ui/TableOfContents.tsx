import { useEffect, useState } from 'react';
import { pressStart } from "../../../styles/fonts";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      }));
    
    setHeadings(elements);

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -66%',
    });

    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <div className="sticky top-8">
      <h4 className={`${pressStart.className} text-xs font-semibold mb-4 text-foreground`}>
        On This Page
      </h4>
      <nav className="overflow-y-auto max-h-[calc(100vh-12rem)]">
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className="flex items-center"
            >
              {heading.level > 1 && (
                <span className="inline-block mr-2 text-muted-foreground">
                  {"—".repeat(heading.level - 1)}
                </span>
              )}
              <a
                href={`#${heading.id}`}
                className={`${pressStart.className} text-[10px] block hover:text-maize transition-colors duration-200 ${
                  activeId === heading.id
                    ? "text-maize"
                    : "text-muted-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};