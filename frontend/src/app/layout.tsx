import { ThemeProvider } from "@/components/ui/providers";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "MTC/docs",
  description: "Home for everything CS @ UMich",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
