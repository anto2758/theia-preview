import type { Metadata } from "next";
import Link from "next/link";

import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "For partners · Lyra",
  description:
    "How Lyra promotes partner brands: licensed product feeds, tracked deep links to retailer product pages, and no coupons, cashback, or brand bidding.",
};

const flow = [
  {
    step: "01",
    title: "Browse looks",
    copy: "Shoppers open curated outfits matched to taste, size, and season — not a coupon list or search ads.",
    src: "/looks/swipe-park.jpg",
    position: "object-[center_32%]",
    alt: "Lyra discover feed showing an autumn outfit",
  },
  {
    step: "02",
    title: "Open the outfit",
    copy: "Each look shows the pieces and the partner brand clearly. Product titles, prices, and images come from licensed feeds.",
    src: "/looks/suit.jpg",
    position: "object-[center_40%]",
    alt: "Lyra outfit detail with brand pieces",
  },
  {
    step: "03",
    title: "Shop on your site",
    copy: "A tap opens the retailer’s product page via a tracked affiliate deep link. Checkout stays on the partner site.",
    src: "/looks/swipe-gray-coat.jpg",
    position: "object-[center_28%]",
    alt: "Product piece ready to shop at the brand",
  },
] as const;

const weDo = [
  "Ingest licensed product feeds (Awin, Impact, Adtraction, and similar programmes).",
  "Display partner products and images under the terms of each programme.",
  "Deep-link shoppers to the partner’s product page with network tracking.",
  "Label brands and products clearly inside the iOS app.",
] as const;

const weDont = [
  "Coupon, voucher, or cashback sites",
  "Brand-name bidding or trademark search ads",
  "Misleading claims, fake scarcity, or undisclosed affiliate links",
  "Scraping partner sites outside a written feed or content licence",
] as const;

export default function PartnersPage() {
  return (
    <div className="relative overflow-x-clip text-ink">
      <SiteHeader />

      <main className="relative">
        <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
          <Reveal>
            <p className="text-sm text-primary">For partners</p>
            <h1 className="text-display mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-balance sm:text-6xl">
              How Lyra shows your products.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              Lyra is an editorial fashion discovery app for iOS. People browse a few outfits in
              their taste, then tap through to buy on the retailer’s own site. This page is public
              so affiliate teams can audit promotion methods without an App Store login.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-line bg-secondary">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <Reveal>
              <p className="text-sm text-primary">01 · In the app</p>
              <h2 className="text-display mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Browse → outfit → your product page
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                Representative screens of the promotion flow. Live catalogue content uses licensed
                feed assets from approved programmes.
              </p>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-3" step={0.08}>
              {flow.map((item) => (
                <RevealItem key={item.step}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`aspect-[3/4] w-full object-cover ${item.position}`}
                  />
                  <p className="mt-5 text-[11px] tracking-[0.28em] text-primary uppercase">
                    {item.step}
                  </p>
                  <h3 className="text-display-soft mt-2 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{item.copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-16 sm:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-sm text-primary">02 · Promotion methods</p>
            <h2 className="text-display mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Product feeds and tracked links.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-soft">
              We promote as an in-app editorial discovery channel. Commission is only earned when a
              shopper follows a tracked link from Lyra to a partner product page and completes a
              purchase under that programme’s rules.
            </p>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <Reveal delay={0.06}>
              <p className="text-[11px] tracking-[0.28em] text-primary uppercase">What we do</p>
              <ul className="mt-5 space-y-4 border-t border-line pt-5">
                {weDo.map((item) => (
                  <li key={item} className="text-sm leading-6 text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[11px] tracking-[0.28em] text-primary uppercase">What we don’t</p>
              <ul className="mt-5 space-y-4 border-t border-line pt-5">
                {weDont.map((item) => (
                  <li key={item} className="text-sm leading-6 text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line">
          <Reveal
            y={16}
            amount={0.4}
            className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className="text-sm text-primary">03 · Contact</p>
              <h2 className="text-display mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Need more for an audit?
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-ink-soft">
                Publisher: Lyra (Awin pid 3139854). Site:{" "}
                <a
                  className="text-ink underline-offset-4 hover:underline"
                  href="https://www.wearlyra.io"
                >
                  wearilyra.io
                </a>
                . Happy to walk through the app flow, feed usage, or tracking setup.
              </p>
            </div>
            <address className="text-sm leading-7 text-ink-soft not-italic lg:col-span-5 lg:justify-self-end">
              <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Partnerships</p>
              <p className="mt-4 font-serif text-xl text-ink">Anton Larsen</p>
              <p>Copenhagen</p>
              <a
                className="mt-3 inline-block text-ink underline-offset-4 hover:underline"
                href="mailto:antonllarsen@gmail.com"
              >
                antonllarsen@gmail.com
              </a>
            </address>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-soft">
          <Link href="/" className="font-serif text-lg text-ink">
            Lyra
          </Link>
          <div className="flex gap-6 text-[11px] tracking-[0.18em] uppercase">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <Link href="/partners" className="text-ink">
              For partners
            </Link>
            <a href="mailto:antonllarsen@gmail.com" className="hover:text-ink">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
