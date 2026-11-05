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

const impactTrackingScript = `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A8064343-4811-4681-bad4-5f75a16d232b1.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full antialiased`}>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: impactTrackingScript }}
        />
      </head>
      <body className="min-h-full font-sans">
        <script type="text/javascript" src="https://s.skimresources.com/js/312348X1800937.skimlinks.js"></script>
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
