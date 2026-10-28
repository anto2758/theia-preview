import { BrandMarquee } from "@/components/brand-marquee";
import { KnowsYou } from "@/components/knows-you";
import { PhoneStory } from "@/components/phone-story";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

const chapters = [
  {
    src: "/looks/fall-brown-coat.jpg",
    position: "object-[center_28%]",
    title: "Brown coat",
    copy: "Earthy, this week. Not the whole site.",
  },
  {
    src: "/looks/editorial/camel-coat.jpg",
    position: "object-[center_32%]",
    title: "Camel",
    copy: "The cut you actually wear.",
  },
  {
    src: "/looks/editorial/cashmere.jpg",
    position: "object-center",
    title: "Cashmere",
    copy: "A name you haven’t tried.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-x-clip text-ink">
      {/* Impact ownership check — must appear in homepage HTML */}
      <p className="sr-only" aria-hidden="true">
        Impact-Site-Verification: 3000ddf6-dab5-43d3-bd30-a1ce1ef19731
      </p>
      <SiteHeader />

      <main id="top" className="relative">
        <PhoneStory />

        <KnowsYou />

        <BrandMarquee />

        <section id="edit" className="mx-auto grid w-full max-w-6xl items-end gap-10 px-6 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-7">
            <img
              src="/looks/editorial/camel-coat.jpg"
              alt="Camel wool coat"
              className="aspect-[4/5] w-full object-cover object-[center_32%]"
            />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pb-4" delay={0.08}>
            <p className="text-sm text-primary">01 · The point</p>
            <h2 className="text-display mt-4 font-serif text-4xl leading-[1.08] text-balance sm:text-5xl">
              Not another catalogue.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">
              You don’t scroll a hundred videos to find one you’d like. Clothes still work that
              way: one brand’s site, then the next. Lyra opens with a few outfits in your taste,
              your size, and the season you’re actually in.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <p className="text-display-soft font-serif text-3xl">Few</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">Looks, not hundreds.</p>
              </div>
              <div>
                <p className="text-display-soft font-serif text-3xl">1</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">Place to open.</p>
              </div>
              <div>
                <p className="text-display-soft font-serif text-3xl">Yours</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">Taste, size, brands.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <RevealGroup className="mx-auto grid w-full max-w-6xl gap-3 px-6 pb-20 sm:grid-cols-3 lg:pb-28" step={0.08}>
          {chapters.map((chapter) => (
            <RevealItem key={chapter.title}>
              <img
                src={chapter.src}
                alt=""
                className={`aspect-[3/4] w-full object-cover ${chapter.position}`}
              />
              <h3 className="text-display-soft mt-4 font-serif text-2xl">{chapter.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{chapter.copy}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <section id="look" className="relative h-[78svh] min-h-[28rem]">
          <img
            src="/looks/editorial/suit.jpg"
            alt="Camel tailored suit"
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(42,36,28,0.62)] via-[rgba(42,36,28,0.12)] to-transparent" />
          <Reveal y={24} amount={0.4} className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:pb-16">
            <p className="mx-auto max-w-3xl font-serif text-4xl leading-[1.12] text-balance text-canvas sm:text-6xl">
              Fall, without opening every site.
            </p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <Reveal
          y={16}
          amount={0.4}
          className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr]"
        >
          <div>
            <p className="text-display font-serif text-3xl">Lyra</p>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-soft sm:text-lg">
              Shopping, tailored the way the rest of the internet already is. A few outfits for the
              season you’re in: your taste, your measurements, your brands.
            </p>
          </div>
          <address className="text-sm leading-7 text-ink-soft not-italic lg:justify-self-end">
            <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Studio</p>
            <p className="mt-4 font-serif text-xl text-ink">Anton Larsen</p>
            <p>Copenhagen</p>
            <p>Hvidkildevej 54</p>
            <a className="mt-3 inline-block text-ink underline-offset-4 hover:underline" href="mailto:antonllarsen@gmail.com">
              antonllarsen@gmail.com
            </a>
          </address>
        </Reveal>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-8 text-sm text-ink-soft">
          <p>Outfit discovery</p>
          <p>Copenhagen</p>
        </div>
      </footer>
    </div>
  );
}
