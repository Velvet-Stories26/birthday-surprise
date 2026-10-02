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
  return <h2 className="text-center font-script text-4xl leading-tight text-burgundy min-[375px]:text-5xl md:text-7xl">{children}</h2>;
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
    <section className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
      <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-cream/60" />
      <Sparkles />
      <div className="relative w-full max-w-2xl">
        <h1 className="animate-pop font-script text-5xl leading-tight text-burgundy min-[375px]:text-6xl md:text-8xl">Hey, My Love ❤️</h1>
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
  const [blown, setBlown] = useState(false);
  return (
    <section id="birthday" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 md:py-24">
      <Reveal>
        <h2 className="font-script text-5xl leading-tight text-burgundy min-[375px]:text-6xl md:text-8xl">Happy Birthday, My Love ❤️</h2>
        <p className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-relaxed min-[375px]:text-xl md:mt-6 md:text-2xl">
          Happy Birthday to the person who makes my world brighter, my days happier, and my heart fuller. I'm so grateful for every moment, every conversation, every laugh, and every memory we've shared.
        </p>
      </Reveal>
      <Reveal delay={200} className="mt-10 w-full md:mt-14">
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
          <div className="mx-auto h-14 w-44 rounded-t-2xl bg-blush shadow-soft min-[375px]:h-16 min-[375px]:w-56" />
          <div className="mx-auto h-3 w-48 bg-cream min-[375px]:w-60" />
          <div className="mx-auto h-18 w-56 rounded-b-2xl bg-rose shadow-soft min-[375px]:h-20 min-[375px]:w-72" />
          <div className="mx-auto h-3 w-64 max-w-full rounded-full bg-burgundy/30 min-[375px]:w-80" />
          {!blown && <p className="mt-4 text-sm text-muted-foreground">Tap the candles to blow them out 🕯️</p>}
        </button>
      </Reveal>
       {blown && <p className="animate-pop mt-8 font-script text-4xl text-primary min-[375px]:text-5xl">Make a Wish, My Love ✨</p>}
    </section>
  );
}

function Story() {
  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <Reveal><Title>Our Story ❤️</Title></Reveal>
      <div className="relative mx-auto mt-10 max-w-3xl md:mt-16">
        <div className="absolute left-3 top-0 h-full w-px bg-rose/40 min-[375px]:left-4 md:left-1/2" />
        {LOVE.story.map((s, i) => (
          <Reveal key={i} className={`relative mb-8 pl-9 min-[375px]:pl-12 md:mb-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}>
            <span className={`absolute left-0 top-5 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground min-[375px]:left-1.5 ${i % 2 ? "md:-left-3" : "md:left-auto md:-right-3"}`}>♥</span>
            <div className="glass rounded-2xl p-4 shadow-soft transition hover:-translate-y-1 min-[375px]:p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{s.date}</p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-burgundy min-[375px]:text-2xl">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
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
    <section className="overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <Reveal><Title>Little Moments, Big Memories 📸</Title></Reveal>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-6">
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
          <button className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center text-3xl text-cream sm:right-5 sm:top-5" aria-label="Close">✕</button>
          <button className="absolute left-1 z-10 grid h-12 w-10 place-items-center text-4xl text-cream sm:left-3 md:left-8" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + n) % n); }}>‹</button>
          {LOVE.photos[idx] ? (
            <figure className="animate-scale-in max-w-[calc(100vw-5rem)] text-center sm:max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <img src={LOVE.photos[idx].src} alt={LOVE.photos[idx].caption} className="max-h-[72svh] w-auto rounded-2xl object-contain shadow-soft sm:max-h-[78vh]" />
              <figcaption className="mt-4 font-script text-3xl text-cream sm:text-4xl">{LOVE.photos[idx].caption}</figcaption>
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
    <section className="overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <Reveal><Title>A Little Letter For You 💌</Title></Reveal>
      {!open && <p className="mx-auto mt-4 max-w-xl text-center font-serif text-lg italic text-muted-foreground min-[375px]:text-xl">There's something I want you to read...</p>}
      {!open ? (
        <Reveal className="mt-8 md:mt-12">
          <button onClick={() => setOpen(true)} className="group relative mx-auto block h-44 w-full max-w-72 min-[375px]:h-48 md:h-56 md:max-w-96" aria-label="Open My Letter">
            <div className="absolute inset-0 rounded-lg bg-blush shadow-soft transition duration-500 group-hover:-translate-y-1" />
            <div className="absolute inset-x-0 top-0 h-1/2 origin-top bg-rose transition-transform duration-500 group-hover:-rotate-x-6" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-full bg-accent" style={{ clipPath: "polygon(0 100%,50% 45%,100% 100%)" }} />
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-xl text-cream shadow-soft">♥</span>
          </button>
          <div className="mt-7 text-center"><button onClick={() => setOpen(true)} className="btn-love min-h-12 max-w-full">Open My Letter 💌</button></div>
        </Reveal>
      ) : (
        <article className="animate-scale-in mx-auto mt-10 w-full max-w-2xl rounded-2xl bg-cream px-5 py-8 shadow-soft min-[375px]:px-6 sm:px-10 sm:py-10 md:mt-14 md:px-12 md:py-12">
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
    <section className="overflow-hidden bg-blush/35 px-4 py-16 sm:px-6 md:py-24">
      <Reveal><Title>Our Vision ❤️</Title></Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-muted-foreground min-[375px]:text-xl md:text-2xl">
          Do you remember you told me we would achieve these dreams together?
        </p>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        {LOVE.vision.map((item, i) => (
          <Reveal key={item.question} delay={(i % 2) * 100}>
            <article className="relative h-full overflow-hidden rounded-2xl bg-cream p-5 shadow-soft min-[375px]:p-6 sm:p-7">
              <span className="absolute right-4 top-3 font-script text-2xl text-rose/30" aria-hidden>♥</span>
              <p className="pr-6 font-serif text-base italic leading-relaxed text-muted-foreground min-[375px]:text-lg">{i + 1}. {item.question}</p>
              <p className="mt-4 font-serif text-xl font-semibold leading-snug text-burgundy min-[375px]:text-2xl">{item.answer}</p>
              {item.note && <p className="mt-3 text-sm italic text-primary">{item.note}</p>}
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mx-auto mt-12 max-w-3xl text-center md:mt-16">
        <p className="font-script text-3xl leading-relaxed text-burgundy min-[375px]:text-4xl md:text-5xl">
          These are the little things we once talked about... and I hope one day, we can look back and say — we did it all together. ❤️
        </p>
      </Reveal>
    </section>
  );
}

function Reasons() {
  const [count, setCount] = useState(1);
  const done = count >= LOVE.reasons.length;
  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <Reveal><Title>Reasons Why I Love You ❤️</Title></Reveal>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14">
        {LOVE.reasons.slice(0, count).map((r, i) => (
          <div key={i} className="animate-pop glass min-w-0 rounded-2xl px-5 py-4 shadow-soft min-[375px]:px-6 min-[375px]:py-5">
            <span className="mr-2 font-script text-3xl text-primary">{i + 1}.</span>
            <span className="font-serif text-lg text-burgundy min-[375px]:text-xl">{r}</span>
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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 md:py-24">
      <Reveal><Title>One Last Surprise... 🎁</Title></Reveal>
      {open && <Confetti />}
      {!open ? (
        <Reveal className="mt-14">
          <button onClick={() => setOpen(true)} className="animate-wobble relative block" aria-label="Open the gift">
             <div className="relative mx-auto h-10 w-48 rounded-md bg-burgundy shadow-soft min-[375px]:w-56">
              <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gold" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl text-gold">🎀</span>
            </div>
             <div className="relative mx-auto h-36 w-40 rounded-b-md bg-rose shadow-soft min-[375px]:h-40 min-[375px]:w-48">
              <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gold" />
            </div>
          </button>
          <p className="mt-6 text-sm text-muted-foreground">Tap to open</p>
        </Reveal>
      ) : (
        <div className="relative mt-14 max-w-2xl">
          <HeartBurst />
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
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
      <img src={hero} alt="" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-burgundy/55" />
      <Sparkles />
      <Reveal className="relative max-w-2xl text-cream">
        <h2 className="font-script text-5xl leading-tight min-[375px]:text-6xl md:text-8xl">Happy Birthday, My Love ❤️</h2>
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
