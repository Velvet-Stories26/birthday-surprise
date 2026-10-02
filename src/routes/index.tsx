import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import { LOVE } from "@/lib/love-config";
import { Confetti, FloatingHearts, HeartBurst, Reveal, Sparkles } from "@/components/love/Effects";

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
  return <h2 className="text-center font-script text-5xl text-burgundy md:text-7xl">{children}</h2>;
}

function Index() {
  const [opened, setOpened] = useState(false);
  const open = () => {
    setOpened(true);
    setTimeout(() => document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" }), 80);
  };
  return (
    <main className="relative">
      <FloatingHearts />
      <Welcome onOpen={open} />
      {opened && (
        <div className="animate-fade-in relative z-10">
          <Birthday />
          <Story />
          <Gallery />
          <Letter />
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
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-cream/60" />
      <Sparkles />
      <div className="relative max-w-2xl">
        <h1 className="animate-pop font-script text-6xl text-burgundy md:text-8xl">Hey, My Love ❤️</h1>
        <p className="mt-6 font-serif text-2xl italic text-foreground md:text-3xl animate-fade-in" style={{ animationDelay: ".6s", animationFillMode: "both" }}>
          Today isn't just another day...
        </p>
        <p className="mt-3 font-serif text-xl text-muted-foreground md:text-2xl animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "both" }}>
          It's the day someone incredibly special came into this world.
        </p>
        <button onClick={onOpen} className="btn-love mt-10">Open Your Surprise 💌</button>
      </div>
    </section>
  );
}

function Birthday() {
  const [blown, setBlown] = useState(false);
  return (
    <section id="birthday" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal>
        <h2 className="font-script text-6xl text-burgundy md:text-8xl">Happy Birthday, My Love ❤️</h2>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl leading-relaxed md:text-2xl">
          Happy Birthday to the person who makes my world brighter, my days happier, and my heart fuller. I'm so grateful for every moment, every conversation, every laugh, and every memory we've shared.
        </p>
      </Reveal>
      <Reveal delay={200} className="mt-14">
        <button onClick={() => setBlown(true)} aria-label="Blow out the candles" className="group relative mx-auto block">
          <div className="flex justify-center gap-6 pb-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                <div className="h-8 w-4">
                  {!blown ? (
                    <div className="animate-flicker mx-auto h-7 w-3.5 rounded-full bg-gold" style={{ boxShadow: "0 0 20px var(--gold)", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
                  ) : (
                    <div className="animate-smoke mx-auto h-4 w-4 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="h-12 w-3 rounded-sm bg-cream ring-1 ring-rose/40" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 4px, var(--blush) 4px 8px)" }} />
              </div>
            ))}
          </div>
          <div className="mx-auto h-16 w-56 rounded-t-2xl bg-blush shadow-soft" />
          <div className="mx-auto h-3 w-60 bg-cream" />
          <div className="mx-auto h-20 w-72 rounded-b-2xl bg-rose shadow-soft" />
          <div className="mx-auto h-3 w-80 rounded-full bg-burgundy/30" />
          {!blown && <p className="mt-4 text-sm text-muted-foreground">Tap the candles to blow them out 🕯️</p>}
        </button>
      </Reveal>
      {blown && <p className="animate-pop mt-8 font-script text-5xl text-primary">Make a Wish, My Love ✨</p>}
    </section>
  );
}

function Story() {
  return (
    <section className="px-6 py-24">
      <Reveal><Title>Our Story ❤️</Title></Reveal>
      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-rose/40 md:left-1/2" />
        {LOVE.story.map((s, i) => (
          <Reveal key={i} className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
            <span className={`absolute top-6 left-1.5 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground ${i % 2 ? "md:-left-3" : "md:left-auto md:-right-3"}`}>♥</span>
            <div className="glass rounded-2xl p-6 shadow-soft transition hover:-translate-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{s.date}</p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-burgundy">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const n = LOVE.photos.length;
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
    <section className="px-6 py-24">
      <Reveal><Title>Little Moments, Big Memories 📸</Title></Reveal>
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {LOVE.photos.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 120}>
            <button onClick={() => setIdx(i)} className="group block w-full overflow-hidden rounded-2xl bg-card p-2 pb-3 shadow-soft transition hover:-translate-y-1 hover:rotate-1">
              <div className="overflow-hidden rounded-xl">
                <img src={p.src} alt={p.caption} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <p className="mt-2 font-serif text-base italic text-burgundy md:text-lg">{p.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {idx !== null && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-burgundy/85 p-4 backdrop-blur" onClick={() => setIdx(null)}>
          <button className="absolute right-5 top-5 text-3xl text-cream" aria-label="Close">✕</button>
          <button className="absolute left-3 text-4xl text-cream md:left-8" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + n) % n); }}>‹</button>
          <figure className="animate-scale-in max-w-3xl text-center" onClick={(e) => e.stopPropagation()}>
            <img src={LOVE.photos[idx].src} alt={LOVE.photos[idx].caption} className="max-h-[78vh] rounded-2xl object-contain shadow-soft" />
            <figcaption className="mt-4 font-script text-4xl text-cream">{LOVE.photos[idx].caption}</figcaption>
          </figure>
          <button className="absolute right-3 text-4xl text-cream md:right-8" aria-label="Next" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % n); }}>›</button>
        </div>
      )}
    </section>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-6 py-24">
      <Reveal><Title>A Little Letter For You 💌</Title></Reveal>
      {!open ? (
        <Reveal className="mt-14">
          <button onClick={() => setOpen(true)} className="animate-wobble relative mx-auto block h-48 w-72 md:h-56 md:w-96" aria-label="Open the letter">
            <div className="absolute inset-0 rounded-lg bg-blush shadow-soft" />
            <div className="absolute inset-x-0 top-0 h-1/2 origin-top bg-rose" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-full bg-accent" style={{ clipPath: "polygon(0 100%,50% 45%,100% 100%)" }} />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-xl text-cream shadow-soft">♥</span>
          </button>
          <p className="mt-6 text-center text-sm text-muted-foreground">Tap the envelope to open it</p>
        </Reveal>
      ) : (
        <article className="animate-scale-in mx-auto mt-14 max-w-2xl rounded-2xl bg-cream p-8 shadow-soft md:p-12" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 38px, color-mix(in oklab, var(--rose) 20%, transparent) 38px 39px)" }}>
          <p className="font-script text-4xl text-burgundy">My Love,</p>
          {LOVE.letter.map((p, i) => (
            <p key={i} className="animate-fade-in mt-5 font-serif text-xl leading-relaxed" style={{ animationDelay: `${0.3 + i * 0.4}s`, animationFillMode: "both" }}>{p}</p>
          ))}
          <p className="mt-8 font-serif text-lg italic">With all my heart,</p>
          <p className="font-script text-4xl text-primary">{LOVE.myName}</p>
        </article>
      )}
    </section>
  );
}

function Reasons() {
  const [count, setCount] = useState(1);
  const done = count >= LOVE.reasons.length;
  return (
    <section className="px-6 py-24">
      <Reveal><Title>Reasons Why I Love You ❤️</Title></Reveal>
      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-4">
        {LOVE.reasons.slice(0, count).map((r, i) => (
          <div key={i} className="animate-pop glass rounded-2xl px-6 py-5 shadow-soft">
            <span className="mr-2 font-script text-3xl text-primary">{i + 1}.</span>
            <span className="font-serif text-xl text-burgundy">{r}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        {done ? (
          <p className="font-script text-3xl text-primary">…and a million more ♥</p>
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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <Reveal><Title>One Last Surprise... 🎁</Title></Reveal>
      {open && <Confetti />}
      {!open ? (
        <Reveal className="mt-14">
          <button onClick={() => setOpen(true)} className="animate-wobble relative block" aria-label="Open the gift">
            <div className="relative mx-auto h-10 w-56 rounded-md bg-burgundy shadow-soft">
              <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gold" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl text-gold">🎀</span>
            </div>
            <div className="relative mx-auto h-40 w-48 rounded-b-md bg-rose shadow-soft">
              <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gold" />
            </div>
          </button>
          <p className="mt-6 text-sm text-muted-foreground">Tap to open</p>
        </Reveal>
      ) : (
        <div className="relative mt-14 max-w-2xl">
          <HeartBurst />
          <p className="animate-pop relative font-serif text-2xl leading-relaxed text-burgundy md:text-3xl">
            You are my favorite person, my happiest memory, and one of the most beautiful parts of my life. ❤️
          </p>
          <p className="animate-pop relative mt-8 font-script text-5xl text-primary md:text-6xl" style={{ animationDelay: "1.2s" }}>
            I love you. More than words can say.
          </p>
        </div>
      )}
    </section>
  );
}

function Final({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <img src={hero} alt="" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-burgundy/55" />
      <Sparkles />
      <Reveal className="relative max-w-2xl text-cream">
        <h2 className="font-script text-6xl md:text-8xl">Happy Birthday, My Love ❤️</h2>
        <p className="mt-6 font-serif text-xl md:text-2xl">
          Here's to another year of your beautiful smile, your dreams, your happiness, and hopefully many more memories together.
        </p>
        <p className="mt-10 font-serif text-xl italic">Forever yours,</p>
        <p className="font-script text-5xl">{LOVE.myName} ❤️</p>
        <button onClick={onReplay} className="btn-love mt-10">Replay Our Story 🔄</button>
      </Reveal>
    </section>
  );
}
