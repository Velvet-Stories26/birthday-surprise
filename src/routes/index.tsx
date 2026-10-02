import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import cakeVisual from "@/assets/bday_cake.png";
import letterVisual from "@/assets/letter_backup.png";
import { LOVE } from "@/lib/love-config";
import { Confetti, FloatingHearts, Reveal, Sparkles } from "@/components/love/Effects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${LOVE.partnerName} ❤️` },
      { name: "description", content: `A little birthday surprise for ${LOVE.partnerName}, made with love by ${LOVE.myName}.` },
      { property: "og:title", content: `Happy Birthday, ${LOVE.partnerName} ❤️` },
      { property: "og:description", content: "A digital love letter and birthday surprise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-balance text-center font-script text-4xl leading-tight text-burgundy min-[375px]:text-5xl md:text-6xl">{children}</h2>;
}

function Index() {
  const [opened, setOpened] = useState(false);
  const open = () => {
    setOpened(true);
    setTimeout(() => document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" }), 80);
  };
  return (
    <main className="relative">
      <FloatingHearts count={10} />
      <Welcome onOpen={open} />
      {opened && (
        <div className="animate-fade-in relative z-10">
          <Birthday />
          <Story />
          <Gallery />
          <Letter />
          <Vision />
          <Reasons />
          <Gift />
          <Final onReplay={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        </div>
      )}
    </main>
  );
}

function Welcome({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-12 text-center sm:px-5 md:py-16">
      <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-cream/60" />
      <Sparkles count={18} />
      <div className="relative w-full max-w-2xl">
        <h1 className="animate-pop whitespace-nowrap font-script text-3xl leading-tight text-burgundy min-[375px]:text-4xl md:text-7xl lg:text-8xl">Hey, My Love ❤️</h1>
        <p className="animate-fade-in mt-5 font-serif text-xl italic text-foreground min-[375px]:text-2xl md:mt-6 md:text-3xl" style={{ animationDelay: ".6s", animationFillMode: "both" }}>
          Today isn't just another day...
        </p>
        <p className="animate-fade-in mt-3 font-serif text-lg leading-relaxed text-muted-foreground min-[375px]:text-xl md:text-2xl" style={{ animationDelay: "1.2s", animationFillMode: "both" }}>
          It's the day someone incredibly special came into this world.
        </p>
        <button onClick={onOpen} className="btn-love mt-8 min-h-12 max-w-full md:mt-10">Open Your Surprise 💌</button>
      </div>
    </section>
  );
}

function Birthday() {
  const candleCenters = [41.5, 46, 51, 55, 58];
  const [blown, setBlown] = useState<boolean[]>(candleCenters.map(() => false));
  const extinguish = (index: number) => setBlown((current) => current.map((value, i) => i === index || value));
  const handleCandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event.detail) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickPosition = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nearestCandle = candleCenters.reduce((nearest, center, index) =>
      Math.abs(center - clickPosition) < Math.abs(candleCenters[nearest]! - clickPosition) ? index : nearest, 0);
    extinguish(nearestCandle);
    event.stopPropagation();
  };
  return (
    <section id="birthday" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-3 py-12 text-center sm:px-5 md:py-16">
      <Reveal>
        <h2 className="text-balance font-script text-2xl leading-tight text-burgundy min-[375px]:text-4xl md:text-7xl lg:text-8xl"><span className="block">Happy Birthday,</span><span className="block">My Love ❤️</span></h2>
        <p className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-relaxed min-[375px]:text-xl md:mt-6 md:text-2xl">
          Happy Birthday to the person who makes my world brighter, my days happier, and my heart fuller. I'm so grateful for every moment, every conversation, every laugh, and every memory we've shared.
        </p>
      </Reveal>
      <Reveal delay={200} className="mt-8 w-full md:mt-12">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl" onClickCapture={handleCandleClick}>
          <img src={cakeVisual} alt="Birthday cake with five lit candles" width={1456} height={1092} className="absolute inset-0 h-full w-full object-contain" />
          {candleCenters.map((center, index) => (
            <Fragment key={center}>
              <button
                type="button"
                aria-label={`Blow out candle ${index + 1}`}
                aria-pressed={blown[index]}
                className="absolute top-[12%] z-10 h-[22%] min-h-11 w-[8%] min-w-11 -translate-x-1/2 cursor-pointer rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                style={{ left: `${center}%` }}
                onClick={() => extinguish(index)}
              />
              {blown[index] && (
                <>
                  <span className="pointer-events-none absolute top-[17%] z-20 h-[7%] w-[2.2%] -translate-x-1/2 rounded-full bg-[rgba(245,198,187,0.9)] blur-[2px]" style={{ left: `${center}%` }} aria-hidden />
                  <span className="animate-smoke pointer-events-none absolute left-1/2 top-[14%] z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-cream/70 blur-sm" style={{ left: `${center}%` }} aria-hidden />
                </>
              )}
            </Fragment>
          ))}
        </div>
      </Reveal>
      {blown.every(Boolean) && <p className="animate-fade-in mt-8 font-script text-2xl text-primary min-[375px]:text-2xl">Make a Wish, My Love ✨</p>}
    </section>
  );
}

function Story() {
  // return (
  //   <section className="overflow-hidden px-3 py-12 sm:px-5 md:py-16">
  //     <Reveal><Title>Our Story</Title></Reveal>
  //     <div className="relative mx-auto mt-9 max-w-3xl md:mt-12">
  //       <div className="absolute bottom-0 left-3 top-0 w-px bg-gold/65 min-[375px]:left-4 md:left-1/2" />
  //       {LOVE.story.map((item, index) => (
  //         <Reveal key={`${item.date}-${item.title}`} className={`relative mb-6 min-w-0 pl-9 min-[375px]:pl-12 md:mb-8 md:w-1/2 md:pl-0 ${index % 2 ? "md:ml-auto md:pl-10" : "md:pr-10 md:text-right"}`}>
  //           <span className={`absolute left-0 top-5 grid h-6 w-6 place-items-center rounded-full border border-gold/70 bg-cream text-xs text-primary min-[375px]:left-1.5 ${index % 2 ? "md:-left-3" : "md:left-auto md:-right-3"}`} aria-hidden>✦</span>
  //           <article className="h-full rounded-lg border border-gold/35 bg-card/90 p-4 shadow-soft min-[375px]:p-5 sm:p-6">
  //             <p className="font-sans text-xs font-medium uppercase text-primary">{item.date}</p>
  //             <h3 className="mt-2 font-serif text-xl font-semibold text-burgundy min-[375px]:text-2xl">{item.title}</h3>
  //             <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
  //           </article>
  //         </Reveal>
  //       ))}
  //     </div>
  //   </section>
  // );
}

function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const photos = [
    { src: new URL("../assets/first-image.png", import.meta.url).href, caption: "You texted me first... just a simple “Hi.” ❤️" },
    { src: new URL("../assets/second-image.png", import.meta.url).href, caption: "Two months later, I finally texted you back. ❤️" },
    { src: new URL("../assets/third_image.png", import.meta.url).href, caption: "One day, we finally told each other how we felt. ❤️" },
    { src: new URL("../assets/fourth_image.png", import.meta.url).href, caption: "Then came the waiting... while we hoped for our families' blessing." },
    { src: new URL("../assets/fifth_image.png", import.meta.url).href, caption: "Five months later, we talked again... and it felt like nothing had changed. ❤️" },
    { src: new URL("../assets/sixth-image.png", import.meta.url).href, caption: "After all those conversations, we finally met. ❤️" },
    { src: new URL("../assets/seventh-image.png", import.meta.url).href, caption: "Still growing, still learning, still choosing each other. ❤️" },
  ];
  const n = photos.length;
  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => ((i ?? 0) + 1) % n);
      if (e.key === "ArrowLeft") setIdx((i) => ((i ?? 0) - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, n]);
  return (
    <section className="overflow-hidden px-3 py-12 sm:px-5 md:py-16">
      <Reveal><Title>Our Story</Title></Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-muted-foreground min-[375px]:text-xl md:text-2xl">
          From one little “Hi” to a story I never want to end. ❤️
        </p>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {photos.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 120}>
            <button onClick={() => setIdx(i)} className="group block w-full overflow-hidden rounded-xl border border-gold/30 bg-card p-2 pb-3 shadow-soft transition hover:-translate-y-1">
              <div className="overflow-hidden rounded-xl">
                <img src={p.src} alt={p.caption} loading="lazy" className="h-auto w-full object-contain" />
              </div>
              <p className="mt-2 font-serif text-base italic text-burgundy md:text-lg">{p.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {idx !== null && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-burgundy/85 p-4 backdrop-blur" onClick={() => setIdx(null)}>
          <button className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center text-3xl text-cream sm:right-5 sm:top-5" aria-label="Close">✕</button>
          <button className="absolute left-1 z-10 grid h-12 w-10 place-items-center text-4xl text-cream sm:left-3 md:left-8" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + n) % n); }}>‹</button>
          {photos[idx] ? (
            <figure className="animate-scale-in w-full max-w-[calc(100vw-5rem)] text-center sm:max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <img src={photos[idx].src} alt={photos[idx].caption} className="mx-auto max-h-[70svh] max-w-full rounded-xl object-contain shadow-soft sm:max-h-[78vh] sm:rounded-2xl" />
              <figcaption className="mt-4 text-balance font-script text-3xl text-cream sm:text-4xl">{photos[idx].caption}</figcaption>
            </figure>
          ) : null}
          <button className="absolute right-1 z-10 grid h-12 w-10 place-items-center text-4xl text-cream sm:right-3 md:right-8" aria-label="Next" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % n); }}>›</button>
        </div>
      )}
    </section>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <section className="overflow-hidden px-3 py-12 sm:px-5 md:py-16">
      {!open && (
        <div className="relative mx-auto w-full max-w-5xl">
          <img src={letterVisual} alt="Cream envelope sealed with a golden heart" width={1657} height={903} className="block h-auto w-full object-contain" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the sealed love letter"
            className="absolute left-1/2 top-[65%] aspect-square w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          />
        </div>
      )}
      {open && (
        <article className="animate-fade-in mx-auto mt-8 w-full max-w-2xl rounded-lg border border-gold/35 bg-card px-5 py-7 shadow-soft min-[375px]:px-6 sm:px-10 sm:py-9 md:mt-10 md:px-12 md:py-11">
          <div className="mb-3 text-center text-lg text-rose" aria-hidden>♥</div>
          <p className="font-script text-4xl text-burgundy min-[375px]:text-5xl">My Love,</p>
          {LOVE.letter.map((p, i) => (
            <p key={i} className="animate-fade-in mt-5 font-serif text-lg leading-[1.75] min-[375px]:text-xl" style={{ animationDelay: `${0.2 + i * 0.25}s`, animationFillMode: "both" }}>{p}</p>
          ))}
          <p className="mt-8 font-serif text-lg italic min-[375px]:text-xl">With all my heart,</p>
          <p className="mt-1 font-script text-4xl text-primary min-[375px]:text-5xl">{LOVE.myName}</p>
        </article>
      )}
    </section>
  );
}

function Vision() {
  return (
    <section className="relative isolate overflow-hidden px-3 py-14 sm:px-5 md:py-20">
      <img src={hero} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-cream/70" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm">A future, imagined together</p>
          <h2 className="mt-3 text-balance text-center font-serif text-3xl font-medium text-burgundy min-[375px]:text-4xl md:text-5xl">Our Vision</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-muted-foreground min-[375px]:text-xl md:text-2xl">
            Do you remember you told me we would achieve these dreams together?
          </p>
        </Reveal>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 md:gap-5">
          {LOVE.vision.map((item, i) => (
            <Reveal key={item.question} delay={(i % 2) * 80}>
              <article className="h-full min-w-0 rounded-lg border border-gold/45 bg-cream/92 px-5 py-5 shadow-soft sm:px-7 sm:py-6">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-primary">{String(i + 1).padStart(2, "0")} <span className="text-gold">/</span> 10</p>
                <h3 className="mt-3 font-serif text-base italic leading-relaxed text-muted-foreground min-[375px]:text-lg">{item.question}</h3>
                <div className="my-4 h-px w-12 bg-gold" />
                <p className="break-words font-serif text-xl font-semibold leading-snug text-burgundy min-[375px]:text-2xl">{item.answer}</p>
                {item.note && <p className="mt-3 font-serif text-sm italic text-primary">{item.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
          <p className="font-script text-3xl leading-relaxed text-burgundy min-[375px]:text-4xl md:text-5xl">
            These are the little things we once talked about... and I hope one day, we can look back and say — we did it all together. ❤️
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Reasons() {
  const [count, setCount] = useState(1);
  const done = count >= LOVE.reasons.length;
  return (
    <section className="overflow-hidden px-3 py-12 sm:px-5 md:py-16">
      <Reveal><Title>Reasons Why I Love You ❤️</Title></Reveal>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14">
        {LOVE.reasons.slice(0, count).map((r, i) => (
          <div key={i} className="animate-fade-in flex min-w-0 items-baseline gap-3 rounded-lg border border-gold/35 bg-card/90 px-5 py-4 shadow-soft min-[375px]:px-6">
            <span className="font-serif text-sm tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-serif text-lg text-burgundy min-[375px]:text-xl">{r}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        {done ? (
          <p className="font-script text-3xl text-primary">…and a million more</p>
        ) : (
          <button className="btn-love" onClick={() => setCount((c) => c + 1)}>Show Me Another Reason</button>
        )}
      </div>
    </section>
  );
}

function Gift() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-3 py-12 text-center sm:px-5 md:py-16">
      <Reveal><Title>One Last Surprise... 🎁</Title></Reveal>
      {open && <Confetti />}
      {!open ? (
        <Reveal className="mt-14">
           <button onClick={() => setOpen(true)} className="relative block transition-transform duration-300 hover:-translate-y-1" aria-label="Open the gift">
             <div className="relative mx-auto h-8 w-44 rounded-sm bg-burgundy shadow-soft min-[375px]:w-52">
              <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-gold" />
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-4xl text-gold">🎀</span>
            </div>
             <div className="relative mx-auto h-32 w-36 rounded-b-sm bg-rose shadow-soft min-[375px]:h-36 min-[375px]:w-44">
              <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-gold" />
            </div>
          </button>
          <p className="mt-6 text-sm text-muted-foreground">Tap to open</p>
        </Reveal>
      ) : (
        <div className="relative mt-14 max-w-2xl">
           <p className="animate-pop relative font-serif text-xl leading-relaxed text-burgundy min-[375px]:text-2xl md:text-3xl">
            You are my favorite person, my happiest memory, and one of the most beautiful parts of my life. ❤️
          </p>
           <p className="animate-pop relative mt-8 font-script text-4xl leading-tight text-primary min-[375px]:text-5xl md:text-6xl" style={{ animationDelay: "1.2s" }}>
            I love you. More than words can say.
          </p>
        </div>
      )}
    </section>
  );
}

function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-12 text-center sm:px-5 md:py-16">
      <img src={hero} alt="" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-burgundy/55" />
      <Sparkles />
      <Reveal className="relative max-w-2xl text-cream">
        <h2 className="text-balance font-script text-2xl leading-tight min-[375px]:text-4xl md:text-7xl lg:text-8xl"><span className="block">Happy Birthday,</span><span className="block">My Love ❤️</span></h2>
        <p className="mt-5 font-serif text-lg leading-relaxed min-[375px]:text-xl md:mt-6 md:text-2xl">
          Here's to another year of your beautiful smile, your dreams, your happiness, and hopefully many more memories together.
        </p>
        <p className="mt-10 font-serif text-xl italic">Forever yours,</p>
        <p className="font-script text-4xl min-[375px]:text-5xl">{LOVE.myName} ❤️</p>
        <button onClick={onReplay} className="btn-love mt-10 min-h-12 max-w-full">Replay Our Story 🔄</button>
      </Reveal>
    </section>
  );
}
