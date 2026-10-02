import { useEffect, useRef, useState, type ReactNode } from "react";

export function FloatingHearts({ count = 16 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; d: number; s: number; delay: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        d: 10 + Math.random() * 12,
        s: 10 + Math.random() * 18,
        delay: -Math.random() * 20,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((h, i) => (
        <span
          key={i}
          className="animate-float-up absolute text-rose"
          style={{ left: `${h.l}%`, bottom: -40, fontSize: h.s, animationDuration: `${h.d}s`, animationDelay: `${h.delay}s` }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export function Sparkles({ count = 30 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; t: number; d: number; delay: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: count }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: 2 + Math.random() * 3, delay: Math.random() * 3 })));
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute h-1.5 w-1.5 rounded-full bg-gold"
          style={{ left: `${s.l}%`, top: `${s.t}%`, animationDuration: `${s.d}s`, animationDelay: `${s.delay}s`, boxShadow: "0 0 8px var(--gold)" }}
        />
      ))}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function HeartBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return (
          <span
            key={i}
            className="animate-burst absolute text-2xl text-rose"
            style={{ ["--x" as string]: `${Math.cos(a) * 220}px`, ["--y" as string]: `${Math.sin(a) * 180}px`, animationDelay: `${(i % 3) * 0.15}s` }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}

const CONFETTI_COLORS = ["var(--rose)", "var(--blush)", "var(--gold)", "var(--burgundy)", "var(--cream)"];
export function Confetti() {
  const [pieces, setPieces] = useState<{ l: number; d: number; delay: number; c: string; w: number }[]>([]);
  useEffect(() => {
    setPieces(Array.from({ length: 48 }, (_, i) => ({ l: Math.random() * 100, d: 3 + Math.random() * 2.5, delay: Math.random() * 0.8, c: CONFETTI_COLORS[i % 5]!, w: 5 + Math.random() * 5 })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span key={i} className="animate-confetti absolute top-0 rounded-sm" style={{ left: `${p.l}%`, width: p.w, height: p.w * 1.6, background: p.c, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}
