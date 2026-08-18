import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValueEvent } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  Globe,
  Headphones,
  Layers,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Users,
  Wand2,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import promoVideo from "@/assets/video Ank1.mp4";
import pro from "@/assets/build_a_video_it_have_same_peo.mp4";
import showcaseImg from "@/assets/Screenshot 2026-02-23 214451.png";
import { CAREER_CONTENT } from "@/routes/career/-content";

/* ---------- shared ---------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
  duration = 0.7,
  once = true,
}) {
  const initial =
    from === "left"
      ? { opacity: 0, x: -80, filter: "blur(8px)" }
      : from === "right"
        ? { opacity: 0, x: 80, filter: "blur(8px)" }
        : { opacity: 0, y: 26, filter: "blur(8px)" };
  const animate =
    from === "left" || from === "right"
      ? { opacity: 1, x: 0, filter: "blur(0px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Header({ badge, title, sub, center = true, subFrom = "up", subDuration = 0.7 }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" /> {badge}
        </span>
      </Reveal>
      <Reveal delay={0.12} from="left" duration={1.2}>
        <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-tight">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.24} from={subFrom} duration={subDuration}>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- marquee ---------- */

export function Marquee() {
  const line = "The Fastest way to grow your business with Digital Presence";
  return (
    <div
      className="overflow-hidden border-y border-border py-3"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-sm font-semibold tracking-wide text-primary-foreground">
            {line} <span className="mx-4 opacity-60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- video promo ---------- */

export function VideoPromo() {
  const stats = [
    { n: 85, s: "%", l: "Increase in organic new users" },
    { n: 450, s: "+", l: "Number of projects done" },
    { n: 420, s: "+", l: "Reviews from happy clients" },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal from="left" duration={0.8}>
          <div className="relative mx-auto max-w-md">
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 hidden rounded-full border-2 border-dashed border-primary/30 sm:block"
            />
            <div className="relative rounded-4xl border border-border bg-card p-3 shadow-lift">
              <div className="relative overflow-hidden rounded-3xl">
                <video
                  src={promoVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                  className="aspect-4/3 w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,119,189,0.05)_0%,rgba(2,119,189,0.22)_100%)]" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="animate-float absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lift"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-(--gradient-hero) text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-bold">13+ Years</div>
                <div className="text-xs text-muted-foreground">Trusted experience</div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3 w-3" /> About Ank Digital Media
            </span>
          </Reveal>
          <Reveal delay={0.12} from="left" duration={1.1}>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.8vw,2.6rem)] font-bold leading-tight">
              We are a passionate digital agency who always{" "}
              <span className="relative inline-block text-gradient">
                focused
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 14"
                  className="pointer-events-none absolute -bottom-2 left-0 w-full text-primary"
                >
                  <motion.path
                    d="M2 10 C 30 2, 60 2, 118 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
                  />
                </svg>
              </span>{" "}
              on growth that lasts.
            </h2>
          </Reveal>
          <Reveal delay={0.24} duration={0.8}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Ank Digital Media is a digital innovation and marketing excellence agency. We offer a
              wide range of digital marketing services and IT services designed to meet the diverse
              needs of our clients — from the first line of code to the first page ranking.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((d, i) => (
              <Reveal key={d.l} delay={i * 0.1}>
                <div>
                  <div className="font-display text-3xl font-black text-gradient sm:text-4xl">
                    <Counter to={d.n} suffix={d.s} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {d.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

export function About() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header
          badge="About Ank Digital Media"
          title={
            <>
              Technology is <span className="text-gradient">incredibly</span> performance and fully
              based on service.
            </>
          }
          sub="Ank Digital Media is a trusted global IT services company offering enterprise mobile app development, enterprise content management and customer relationship management solutions. Our relationship with clients, employees and communities is imbibed within us as the company's vision and mission — values that guide our business strategy and future growth. We deliver trust, ethics and confidentiality to our clients."
          subFrom="left"
          subDuration={1.4}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Target,
              t: "Our Mission",
              d: "Give every business an honest, high-performing digital presence that actually converts.",
            },
            {
              icon: Lightbulb,
              t: "Our Vision",
              d: "To be the single IT partner brands trust for web, marketing and communication.",
            },
            {
              icon: ShieldCheck,
              t: "Our Values",
              d: "Trust, ethics, confidentiality and measurable results on every engagement.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.12}>
              <div className="card-soft group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-(--gradient-hero) text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ---------- plan cards (from original site) ---------- */

const PLANS = [
  {
    icon: Building2,
    title: "Developments",
    items: [
      "Website Designing",
      "Web Application",
      "Software Development",
      "Mobile Application",
      "Graphics Design",
      "E-Commerce",
    ],
  },
  {
    icon: Server,
    title: "Services",
    items: [
      "Web Design & Development",
      "Mobile Application",
      "Desktop Application",
      "Text and Voice SMS",
      "Domain Registration",
      "Hosting",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    items: [
      "Search Engine Optimisation",
      "Social Media Optimisation",
      "Voice and Text SMS",
      "Mobile Application",
      "Offline Marketing",
      "Web Pages",
    ],
  },
  {
    icon: MessageSquare,
    title: "SMS",
    items: [
      "Transactional SMS",
      "Promotional SMS",
      "Missed Call",
      "Voice Call",
      "WhatsApp Messages",
      "IVR Calls",
    ],
  },
];

export function Plans() {
  return (
    <section id="plans" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header badge="What we deliver" title="Everything your business needs, under one roof" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="card-soft group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="flex items-center gap-2 bg-(--gradient-hero) px-5 py-4 text-primary-foreground">
                  <p.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-[0.14em]">
                    {p.title}
                  </span>
                </div>
                <ul className="flex-1 space-y-3 px-5 py-6">
                  {p.items.map((it, ii) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.15 + ii * 0.06, duration: 0.4, ease: "easeOut" }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{it}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="px-5 pb-6">
                  <a
                    href="/contact"
                    className="block rounded-full bg-(--gradient-hero) px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Get Started Now!
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ---------- process ---------- */

const STEPS = [
  { t: "Discovery", d: "We map your goals, audience and competitors.", icon: Search },
  { t: "Strategy", d: "A clear plan for web, marketing and messaging.", icon: Target },
  { t: "Design", d: "Modern UI/UX crafted around your brand.", icon: Wand2 },
  { t: "Build", d: "Clean, fast and secure development.", icon: Layers },
  { t: "Deploy", d: "Launch with hosting, security and monitoring.", icon: Rocket },
  { t: "Optimize", d: "Track, iterate and scale performance.", icon: Award },
];

export function Process() {
  return (
    <section id="process" className="bg-surface py-4 md:py-7">
      <div className="mx-auto max-w-7xl px-6">
        <Header
          badge="Our Process"
          title="Strategy, planning, build — then our work speaks"
          sub="A transparent six-step process that keeps you in the loop from first call to final launch."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div
                className="card-soft group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lift"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="absolute right-4 top-3 font-display text-5xl font-black text-primary/10">
                  {i + 1}
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
                  className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"
                >
                  <s.icon className="h-5 w-5" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.18, duration: 0.45, ease: "easeOut" }}
                  className="mt-4 font-display text-base font-semibold"
                >
                  {s.t}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.26, duration: 0.45, ease: "easeOut" }}
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                >
                  {s.d}
                </motion.p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- why choose us / advance features ---------- */

const FEATURES = [
  {
    icon: Wand2,
    t: "Unique Animations",
    d: "Motion-led interfaces that feel alive, not templated.",
  },
  {
    icon: Layers,
    t: "Widget Integration",
    d: "Chat, payments, CRM and analytics wired in from day one.",
  },
  { icon: Users, t: "Personalization", d: "Content and offers tailored to each visitor segment." },
  {
    icon: ShieldCheck,
    t: "Security First",
    d: "SSL, hardened hosting and regular vulnerability checks.",
  },
  { icon: Globe, t: "Global Delivery", d: "Serving clients across India and overseas since 2013." },
  {
    icon: Headphones,
    t: "24×7 Support",
    d: "Real humans on call whenever something needs attention.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header
          badge="Why choose us"
          title="Advance features built into every project"
          sub="What our clients say they value most about working with Ank Digital Media."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08}>
              <div className="card-soft group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-(--gradient-hero) text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const [val, setVal] = useState(0);

  useMotionValueEvent(spring, "change", (v) => setVal(Math.round(v)));
  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, to, spring]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Stats() {
  const data = [
    { n: 450, s: "+", l: "Projects delivered" },
    { n: 420, s: "+", l: "Happy clients" },
    { n: 10, s: "M+", l: "SMS sent monthly" },
    { n: 15, s: " yrs", l: "In business" },
  ];
  return (
    <section className="bg-(--gradient-hero) py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 sm:gap-8 lg:grid-cols-4">
        {data.map((d, i) => (
          <Reveal key={d.l} delay={i * 0.1}>
            <div className="text-center text-primary-foreground">
              <div className="font-display text-2xl font-black sm:text-3xl lg:text-4xl">
                <Counter to={d.n} suffix={d.s} />
              </div>
              <div className="mt-1 text-xs opacity-90 sm:text-sm">{d.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- showcase (image left, copy right, hover effect) ---------- */

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,rgba(41,182,246,0.08),rgba(2,119,189,0.05))] py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="relative mx-auto flex max-w-md items-start pb-10 pl-2 pt-2">
          <motion.span
            aria-hidden="true"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[38%] top-0 z-20 text-2xl font-black text-primary/50"
          >
            +
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 right-2 z-20 text-3xl text-primary/50"
          >
            ↗
          </motion.span>

          {/* photo pill — slides in from the left, then floats continuously */}
          <motion.div
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[52%] shrink-0"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="group relative overflow-hidden rounded-[999px] border border-primary/15 bg-card shadow-lift"
            >
              <img
                src={showcaseImg}
                alt="Ank Digital Media team member at work"
                className="aspect-3/5 w-full origin-bottom scale-100 object-cover grayscale-10 transition-all duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(41,182,246,0)_60%,rgba(2,119,189,0.18)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </motion.div>

          {/* video pill — slides in from the right, floats in the opposite phase */}
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 -ml-8 mt-20 w-[52%] shrink-0"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="group relative overflow-hidden rounded-[999px] border border-primary/15 bg-card shadow-lift"
            >
              <video
                src={pro}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="aspect-3/5 w-full origin-bottom scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(41,182,246,0)_60%,rgba(2,119,189,0.22)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </motion.div>
        </div>

        <div>
          <Reveal delay={0.1} from="left" duration={1.1}>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-tight">
              Discover the powerhouse of digital growth where{" "}
              <span className="text-gradient">creativity meets strategy</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} duration={0.7} from="right" once={false}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              At Ank Digital Media, we provide top-notch digital services under one roof, aimed at
              delivering the highest quality of work across web, marketing and communication.
            </p>
          </Reveal>
          <Reveal delay={0.2} duration={0.7} from="right" once={false}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              We're built on the belief that a great digital presence is a right for every brand,
              whether an established name or a growing startup — delivered through creativity,
              strategy and cutting-edge technology.
            </p>
          </Reveal>
          <Reveal delay={0.3} duration={0.6} from="right" once={false}>
            <a
              href="/about"
              className="group/btn mt-8 inline-flex items-center gap-4 rounded-full bg-(--gradient-hero) py-2 pl-6 pr-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              Know About Us
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:bg-white/30">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- featured projects (swiper) ---------- */

const PROJECTS = [
  { t: "E-Commerce Store", c: "Retail brand · Delhi", m: "3.4× online sales", icon: ShoppingCart },
  { t: "Corporate Website", c: "Manufacturing · Noida", m: "62% more enquiries", icon: Globe },
  { t: "Bulk SMS Campaign", c: "EdTech · Pan India", m: "98% delivery rate", icon: MessageSquare },
  { t: "SEO Growth Program", c: "Healthcare · Gurugram", m: "Top-3 for 40 keywords", icon: Search },
  { t: "Custom Software", c: "Logistics · Delhi NCR", m: "Ops time cut by 45%", icon: Layers },
];

export function Projects() {
  return (
    <section id="projects" className="bg-surface py-5 md:py-7">
      <div className="mx-auto max-w-7xl px-6">
        <Header badge="Featured Projects" title="Our work, measured in results" />
        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12!"
          >
            {PROJECTS.map((p) => (
              <SwiperSlide key={p.t}>
                <div className="card-soft group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.85 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid h-12 w-12 place-items-center rounded-xl bg-(--gradient-hero) text-primary-foreground"
                  >
                    <p.icon className="h-5 w-5" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 font-display text-lg font-semibold"
                  >
                    {p.t}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-1 text-sm text-muted-foreground"
                  >
                    {p.c}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.26, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 text-sm font-semibold text-primary"
                  >
                    {p.m}
                  </motion.p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* ---------- career ---------- */

export function Career() {
  const roles = Object.entries(CAREER_CONTENT).map(([slug, r]) => ({
    slug,
    t: r.title,
    x: `${r.location} · ${r.experience}`,
  }));
  return (
    <section id="career" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header
          badge="Career"
          title="Build your career with us"
          sub="We're always looking for people who care about craft. Send your CV to ankdigitalmedia@gmail.com."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08}>
              <Link
                to="/career/$slug"
                params={{ slug: r.slug }}
                className="card-soft group flex items-center justify-between gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold">{r.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.x}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
