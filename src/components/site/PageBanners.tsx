import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Award,
  Building2,
  ChevronRight,
  Clock,
  Globe,
  Headphones,
  Layers,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MonitorSmartphone,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Counter, Header, Reveal } from "@/components/site/Sections";
import aboutVideo from "@/assets/video Ank1.mp4";
import projectsVideo from "@/assets/is.mp4";

/* ---------- breadcrumb ---------- */

export function Breadcrumb({
  items,
  className = "",
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground ${className}`}
    >
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
          {it.href ? (
            <a href={it.href} className="opacity-80 transition-opacity hover:opacity-100">
              {it.label}
            </a>
          ) : (
            <span className="opacity-100">{it.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}

/* ---------- about banner (video) ---------- */

const ABOUT_STATS = [
  { n: 9, s: " yrs", l: "In business" },
  { n: 320, s: "+", l: "Happy clients" },
  { n: 450, s: "+", l: "Projects delivered" },
];

export function AboutBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-end overflow-hidden bg-foreground pb-14 pt-36 md:pb-16"
    >
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 z-0">
        <video
          src={aboutVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,34,0.5)_0%,rgba(6,20,34,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(2,119,189,0.38)_0%,rgba(2,119,189,0)_60%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
          className="text-white/70"
        />
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" /> Since 2015
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] text-white"
        >
          Built by people who care about <span className="text-gradient-shimmer">your growth</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75"
        >
          A New Delhi-based team of designers, developers and marketers running one IT partner for
          everything your brand needs to scale online.
        </motion.p>

        <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
          {ABOUT_STATS.map((d, i) => (
            <motion.div
              key={d.l}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
            >
              <div className="font-display text-2xl font-black text-white sm:text-3xl">
                <Counter to={d.n} suffix={d.s} />
              </div>
              <div className="mt-1 text-xs leading-snug text-white/65">{d.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- journey timeline (about page) ---------- */

const JOURNEY = [
  {
    y: "2015",
    t: "Founded in New Delhi",
    d: "Started as a small web design studio serving local businesses.",
  },
  {
    y: "2018",
    t: "Digital marketing added",
    d: "Expanded into SEO, social and paid campaigns as clients asked for full-funnel growth.",
  },
  {
    y: "2020",
    t: "Bulk SMS & WhatsApp launch",
    d: "Built messaging infrastructure to help clients reach customers directly.",
  },
  {
    y: "2023",
    t: "450+ projects delivered",
    d: "Grew into a full IT partner — web, marketing, messaging and hosting under one roof.",
  },
  {
    y: "Today",
    t: "Serving clients nationwide",
    d: "A trusted partner for brands across India and overseas, still growing.",
  },
];

export function Timeline() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Header
          badge="Our Journey"
          title="Nine years of building digital growth"
          sub="From a small studio to a full-service digital partner — here's how we got here."
        />
        <div className="relative mt-16 space-y-10 pl-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-border">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.y} delay={i * 0.1} from={i % 2 === 0 ? "left" : "right"}>
              <div className="relative">
                <span className="absolute -left-8 top-1 grid h-4 w-4 place-items-center rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] ring-4 ring-surface" />
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {step.y}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold">{step.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact banner (animated gradient) ---------- */

const CONTACT_FLOATERS = [
  { icon: Zap, top: "14%", left: "6%", delay: 0 },
  { icon: MessageCircle, top: "68%", left: "10%", delay: 0.6 },
  { icon: Users, top: "20%", right: "8%", delay: 1.1 },
  { icon: Headphones, top: "62%", right: "5%", delay: 1.6 },
];

export function ContactBanner() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0277bd,#03a9f4_55%,#29b6f6)] pb-16 pt-36 md:pb-20 md:pt-40">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      />

      {CONTACT_FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm sm:flex"
          style={{ top: f.top, left: f.left, right: f.right }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
        >
          <f.icon className="h-5 w-5" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          className="justify-center text-white/70"
        />
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
        >
          <MessageCircle className="h-3 w-3" /> Get in Touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] text-white"
        >
          Let's start a conversation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/80"
        >
          Tell us about your project and we'll get back to you within one working hour — call,
          WhatsApp or the form below, whatever's easiest.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- contact quick-facts strip ---------- */

const CONTACT_FACTS = [
  { icon: Clock, t: "Mon – Sat, 10am–7pm", d: "Our team is online and replies fast" },
  { icon: Zap, t: "1 hour response", d: "Average reply time on enquiries" },
  { icon: Headphones, t: "24×7 support", d: "For clients on active projects" },
  { icon: Users, t: "Dedicated manager", d: "One point of contact, start to finish" },
];

export function ContactExtras() {
  return (
    <section className="bg-surface py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {CONTACT_FACTS.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className="flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
                <f.icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <div className="text-sm font-semibold">{f.t}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{f.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- career banner (video) ---------- */

const CAREER_STATS = [
  { n: 25, s: "+", l: "Team members" },
  { n: 4, s: "", l: "Open roles" },
  { n: 9, s: " yrs", l: "Growing team" },
];

export function CareerBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden bg-foreground pb-14 pt-32"
    >
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 z-0">
        <video
          src={projectsVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,20,34,0.9)_20%,rgba(6,20,34,0.5)_100%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Career" }]}
          className="text-white/70"
        />
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" /> We're hiring
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] text-white"
        >
          Build your <span className="text-gradient-shimmer">career</span> with us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75"
        >
          Join a New Delhi-based team of designers, developers and marketers building web,
          marketing and messaging products for brands across India.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-8 border-t border-white/15 pt-6">
          {CAREER_STATS.map((d, i) => (
            <motion.div
              key={d.l}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
            >
              <div className="font-display text-2xl font-black text-white sm:text-3xl">
                <Counter to={d.n} suffix={d.s} />
              </div>
              <div className="mt-1 text-xs leading-snug text-white/65">{d.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- industries (projects page) ---------- */

const INDUSTRIES = [
  { icon: ShoppingCart, t: "Retail & E-commerce" },
  { icon: Headphones, t: "Healthcare" },
  { icon: Building2, t: "Manufacturing" },
  { icon: Globe, t: "EdTech" },
  { icon: Server, t: "Logistics" },
  { icon: Megaphone, t: "Hospitality" },
  { icon: MonitorSmartphone, t: "Real Estate" },
  { icon: Award, t: "Finance" },
];

export function Industries() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header badge="Where we've worked" title="Industries we've delivered results for" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.t} delay={i * 0.06}>
              <div className="card-soft group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                  <ind.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">{ind.t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- services banner (orbiting icons, no video) ---------- */

const SERVICE_ORBIT = [
  { icon: MonitorSmartphone, angle: 0 },
  { icon: Megaphone, angle: 60 },
  { icon: MessageSquare, angle: 120 },
  { icon: Server, angle: 180 },
  { icon: Search, angle: 240 },
  { icon: ShoppingCart, angle: 300 },
];

export function ServicesBanner() {
  return (
    <section className="relative overflow-hidden bg-surface pb-16 pt-36 md:pb-20 md:pt-40">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <Reveal>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3 w-3" /> What we do
            </span>
          </Reveal>
          <Reveal delay={0.12} from="left" duration={1}>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3rem)] font-bold leading-[1.1]">
              Everything your business needs, <span className="text-gradient">under one roof</span>
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Web development, digital marketing, bulk messaging and hosting — pick a category below
              or explore how our process turns a brief into a launch.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto hidden h-64 w-64 sm:block">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-10 grid place-items-center rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground shadow-lift">
            <Layers className="h-9 w-9" />
          </div>
          {SERVICE_ORBIT.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const r = 110;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 16 }}
                className="absolute grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card text-primary shadow-soft"
                style={{ left: "50%", top: "50%", marginLeft: x - 22, marginTop: y - 22 }}
              >
                <s.icon className="h-4.5 w-4.5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- service highlights strip ---------- */

const HIGHLIGHTS = [
  { icon: Zap, t: "Fast turnaround", d: "Most builds go live in 3–6 weeks" },
  { icon: ShieldCheck, t: "Transparent pricing", d: "No hidden costs, ever" },
  { icon: Award, t: "9 years experience", d: "Proven across 450+ projects" },
  { icon: Headphones, t: "Real support", d: "A person answers, not a bot" },
];

export function ServiceHighlights() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.t} delay={i * 0.1}>
              <div className="card-soft flex h-full items-start gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <h.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{h.t}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{h.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- service detail banner (per-entry) ---------- */

export function ServiceDetailBanner({
  icon: Icon,
  category,
  title,
  description,
}: {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,rgba(41,182,246,0.12),rgba(2,119,189,0.06))] pb-14 pt-36 md:pb-16 md:pt-40">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: category },
            { label: title },
          ]}
          className="justify-center"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
          className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground shadow-lift"
        >
          <Icon className="h-7 w-7" />
        </motion.div>
        <Reveal delay={0.1} className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {category}
          </span>
        </Reveal>
        <Reveal delay={0.2} from="left" duration={0.9}>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-bold leading-tight">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
