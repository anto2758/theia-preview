const brands = [
  { name: "Toteme", src: "/brands/toteme.png" },
  { name: "The Row", src: "/brands/row.svg" },
  { name: "COS", src: "/brands/cos.png" },
  { name: "Arket", src: "/brands/arket.svg" },
  { name: "Acne Studios", src: "/brands/acne.svg" },
  { name: "Khaite", src: "/brands/khaite.png" },
  { name: "Lemaire", src: "/brands/lemaire.svg" },
  { name: "Max Mara", src: "/brands/max-mara.svg" },
  { name: "Filippa K", src: "/brands/filippa-k.svg" },
  { name: "Ganni", src: "/brands/ganni.png" },
  { name: "Vince", src: "/brands/vince.svg" },
  { name: "Skall Studio", src: "/brands/skall.svg" },
  { name: "& Other Stories", src: "/brands/stories.svg" },
  { name: "Our Legacy", src: "/brands/our-legacy.svg" },
] as const;

export function BrandMarquee() {
  const loop = [...brands, ...brands];

  return (
    <section id="names" className="group relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-[11px] tracking-[0.28em] text-primary uppercase">The names</p>
        <h2 className="text-display mt-4 max-w-[16ch] font-serif text-4xl leading-[1.08] text-balance sm:text-5xl">
          The houses in the first edit.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-ink-soft sm:text-lg">
          The brands we are opening with — already in a quiet wardrobe, and the ones we are
          bringing in.
        </p>
      </div>

      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="brand-marquee flex w-max items-center gap-x-16 pr-16 sm:gap-x-20 sm:pr-20">
          {loop.map((brand, index) => (
            <li key={`${brand.name}-${index}`} className="flex h-9 shrink-0 items-center">
              <img
                src={brand.src}
                alt={brand.name}
                draggable={false}
                className="h-7 w-auto object-contain opacity-80 grayscale sm:h-8"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
