import { motion, useTransform, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Code2,
  Megaphone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Search,
  ShoppingCart,
} from "lucide-react";

import girl from "@/assets/ggggg-removebg-preview.png";
import bgVideo from "@/assets/video Ank1.mp4";

const SUBLINES = [
  "Web Design & Development",
  "SEO & Digital Marketing",
  "Bulk SMS, WhatsApp & Voice",
  "Software & Website Hosting",
];

const HEADLINE = ["Digital", "growth,", "engineered", "for", "your", "brand"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = SUBLINES[i];
    if (!del && text === full) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((p) => (p + 1) % SUBLINES.length);
      return;
    }
    const t = setTimeout(
      () => setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      del ? 35 : 65,
    );
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient font-semibold">
      {text}
      <span className="animate-caret text-primary">|</span>
    </span>
  );
}

/* Grouped into 3 horizontal rows (left card + right card share the same vertical offset),
   so each pair slides in together, in sequence, top row first then down. */
const PILLARS = [
  // row 1 — resting right on the head, same height on both sides
  {
    icon: ShieldCheck,
    title: "Hosting & Security",
    note: "SSL, 99.9% uptime",
    pos: "left-4 top-6 sm:left-8",
    side: "left" as const,
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    note: "SEO, ads & social",
    pos: "right-4 top-6 sm:right-8",
    side: "right" as const,
  },
  // row 2 — middle
  {
    icon: Code2,
    title: "Web Development",
    note: "Fast, scalable builds",
    pos: "left-2 top-1/2 sm:left-4",
    side: "left" as const,
  },
  {
    icon: Search,
    title: "SEO Growth",
    note: "Rank higher, faster",
    pos: "right-2 top-1/2 sm:right-4",
    side: "right" as const,
  },
  // row 3 — bottom
  {
    icon: MessageSquare,
    title: "SMS / WhatsApp",
    note: "Reach at scale",
    pos: "bottom-16 left-2 sm:left-6",
    side: "left" as const,
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    note: "Stores that convert",
    pos: "bottom-16 right-2 sm:right-6",
    side: "right" as const,
  },
];

let letterCounter = 0;
const HEADLINE_CHARS = HEADLINE.map((w, wi) => {
  const chars = w.split("").map((ch) => ({ ch, idx: letterCounter++ }));
  letterCounter += 1;
  return { word: w, wi, chars };
});

const PARTICLES = [
  { top: "18%", left: "4%", size: 10, delay: 2.0 },
  { top: "72%", right: "2%", size: 14, delay: 2.3 },
  { top: "42%", left: "-6%", size: 8, delay: 2.6 },
  { top: "0%", right: "10%", size: 7, delay: 2.9 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden bg-background py-28 md:py-32"
      style={{ perspective: "1600px" }}
    >
      {/* Autoplay background video — content column below has its own z-10 so it always stacks
          above this regardless of what value ends up here */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ y: bgParallax }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover opacity-160"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/70 via-background/40 to-background/10" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.06)_42%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,182,246,0.18)_0%,rgba(255,255,255,0.18)_100%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          style={{ y: textParallax }}
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5" /> Trusted Global IT Services
          </motion.div>

          <h1
            className="mt-6 font-display text-[clamp(2rem,5.4vw,3.25rem)] font-bold leading-[1.08]"
            style={{ perspective: 700 }}
          >
            {HEADLINE_CHARS.map(({ word, wi, chars }) => (
              <span
                key={word + wi}
                className={`mr-2 inline-block ${wi === 2 ? "text-gradient-shimmer" : ""}`}
              >
                {chars.map(({ ch, idx }) => (
                  <span key={idx} className="inline-block overflow-hidden pb-1 align-bottom">
                    <motion.span
                      initial={{ opacity: 0, y: "100%", rotateX: -70 }}
                      animate={{ opacity: 1, y: "0%", rotateX: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 1.0 + idx * 0.025,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ transformOrigin: "50% 100%" }}
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-balck-foreground md:text-base"
          >
            Ank Digital Media builds and grows brands online — <Typewriter />
            <br />
            One IT partner for everything your business needs to scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="pulse-ring group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              Get Started Now!
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="/services"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card px-6 py-3.5 text-sm font-semibold text-primary shadow-soft"
            >
              <Play className="h-4 w-4" /> Explore Services
            </motion.a>
          </motion.div>
        </motion.div>

        {/* presenter + 3D pillar cluster */}
        <div className="relative" style={{ perspective: "1400px" }}>
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: -280, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex max-w-md items-end justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-6 h-64 w-64 rounded-full bg-primary/10 blur-3xl md:h-80 md:w-80"
              />
              <img
                src={girl}
                alt="Ank Digital Media consultant presenting web, marketing and messaging services"
                width={912}
                height={1200}
                className="relative z-10 w-70 drop-shadow-[0_28px_45px_rgba(41,182,246,0.28)] md:w-90"
              />
              {PARTICLES.map((pt, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-primary/40 blur-[1px]"
                  style={{
                    top: pt.top,
                    left: pt.left,
                    right: pt.right,
                    width: pt.size,
                    height: pt.size,
                  }}
                  animate={{ y: [0, -20, 0], opacity: [0.25, 0.85, 0.25] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    delay: pt.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {PILLARS.map((p, i) => {
              const xFrom = p.side === "right" ? 160 : -160;
              const rowDelay = 0.4 + Math.floor(i / 2) * 0.35;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.4, x: xFrom }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 13, delay: rowDelay }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`animate-float absolute z-20 hidden items-center gap-2 rounded-xl border border-primary/15 bg-card p-2 shadow-lift sm:flex ${p.pos}`}
                >
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
                    <p.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-semibold">{p.title}</div>
                    <div className="truncate text-[10px] text-muted-foreground">{p.note}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
