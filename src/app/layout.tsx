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
    "Lyra will be a personal edit of outfits: collections for the season, new drops from the brands you wear, and a swipe for the looks you want to keep.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
