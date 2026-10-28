import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { MotionRoot } from "@/components/motion-root";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Lyra",
  description:
    "Lyra is clothes, already in your taste. A few outfits for the season you’re in: your size, your brands, and a few you don’t know yet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <head>
        <meta
          name="impact-site-verification"
          // Impact verifies via `value`, not `content`
          {...{ value: "dbbde2b1-3342-4b99-af40-9790cae08ad6" }}
        />
      </head>
      <body className="min-h-full font-sans">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
