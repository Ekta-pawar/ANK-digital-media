import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useMotionValueEvent } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ArrowUpRight,
  Award,
  Building2,
  Check,
  CreditCard,
  Globe,
  Headphones,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Phone,
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

/* ---------- shared ---------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
  duration = 0.7,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left";
  duration?: number;
}) {
  const initial =
    from === "left"
      ? { opacity: 0, x: -80, filter: "blur(8px)" }
      : { opacity: 0, y: 26, filter: "blur(8px)" };
  const animate =
    from === "left"
      ? { opacity: 1, x: 0, filter: "blur(0px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Header({
  badge,
  title,
  sub,
  center = true,
  subFrom = "up",
  subDuration = 0.7,
}: {
  badge: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
  subFrom?: "up" | "left";
  subDuration?: number;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" /> {badge}
        </span>
      </Reveal>
      <Reveal delay={0.12} from="left" duration={1.2}>
        <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-tight">{title}</h2>
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
    <div className="overflow-hidden border-y border-border bg-[linear-gradient(120deg,#29b6f6,#0277bd)] py-3">
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

/* ---------- about ---------- */

export function About() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header
          badge="About Ank Digital Media"
          title={
            <>
              Technology is <span className="text-gradient">incredibly</span> performance and fully based on service.
            </>
          }
          sub="Ank Digital Media is a trusted global IT services company offering enterprise mobile app development, enterprise content management and customer relationship management solutions. Our relationship with clients, employees and communities is imbibed within us as the company's vision and mission — values that guide our business strategy and future growth. We deliver trust, ethics and confidentiality to our clients."
          subFrom="left"
          subDuration={1.4}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { icon: Target, t: "Our Mission", d: "Give every business an honest, high-performing digital presence that actually converts." },
            { icon: Lightbulb, t: "Our Vision", d: "To be the single IT partner brands trust for web, marketing and communication." },
            { icon: ShieldCheck, t: "Our Values", d: "Trust, ethics, confidentiality and measurable results on every engagement." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.12}>
              <div className="card-soft group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground transition-transform duration-300 group-hover:scale-105">
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
    items: ["Website Designing", "Web Application", "Software Development", "Mobile Application", "Graphics Design", "E-Commerce"],
  },
  {
    icon: Server,
    title: "Services",
    items: ["Web Design & Development", "Mobile Application", "Desktop Application", "Text and Voice SMS", "Domain Registration", "Hosting"],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    items: ["Search Engine Optimisation", "Social Media Optimisation", "Voice and Text SMS", "Mobile Application", "Offline Marketing", "Web Pages"],
  },
  {
    icon: MessageSquare,
    title: "SMS",
    items: ["Transactional SMS", "Promotional SMS", "Missed Call", "Voice Call", "WhatsApp Messages", "IVR Calls"],
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
                <div className="flex items-center gap-2 bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-5 py-4 text-primary-foreground">
                  <p.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-[0.14em]">{p.title}</span>
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
                    className="block rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
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
    <section id="process" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header badge="Our Process" title="Strategy, planning, build — then our work speaks" sub="A transparent six-step process that keeps you in the loop from first call to final launch." />
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



/* ---------- tabbed services ---------- */

const TABS = [
  {
    key: "web",
    label: "Web Development",
    icon: MonitorSmartphone,
    blurb:
      "Web development covers everything involved in building websites for intranet or Internet hosting — web design, content development, client-side and server-side scripting and network security configuration.",
    steps: ["Plan", "Design", "Build", "Beta", "Launch", "Support"],
    items: ["Web Designing", "Web Development", "E-Commerce Website", "Software Development", "UI/UX Design", "Web Applications"],
  },
  {
    key: "marketing",
    label: "Digital Marketing",
    icon: Megaphone,
    blurb:
      "Data-driven campaigns that put your brand in front of the right people — search, social, influencers and local presence, all measured against real business outcomes.",
    steps: ["Audit", "Keywords", "Content", "Campaign", "Scale", "Report"],
    items: ["Search Engine Optimisation", "Social Media Marketing", "Influencer Marketing", "Google My Business", "Brand Building", "Paid Ads"],
  },
  {
    key: "sms",
    label: "SMS & WhatsApp",
    icon: MessageSquare,
    blurb:
      "Reach thousands of customers in seconds with high-delivery bulk SMS, WhatsApp business messaging, voice calls and IVR — with live reporting on every campaign.",
    steps: ["Setup", "Sender ID", "Template", "Approve", "Send", "Track"],
    items: ["Bulk SMS Services", "WhatsApp Marketing", "Voice Call Services", "IVR Services", "Missed Call Services", "OTP & Transactional"],
  },
  {
    key: "hosting",
    label: "Web Hosting",
    icon: Server,
    blurb:
      "Fast, secure and monitored hosting with free SSL, daily backups and domain registration — so your site stays online while you focus on your business.",
    steps: ["Domain", "Setup", "SSL", "Migrate", "Monitor", "Backup"],
    items: ["Domain Registration", "Shared & Cloud Hosting", "Free SSL Certificates", "Business Email", "Daily Backups", "24×7 Monitoring"],
  },
];

// export function Services() {
//   const [active, setActive] = useState(TABS[0].key);
//   const tab = TABS.find((t) => t.key === active)!;

//   return (
//     <section id="services" className="bg-surface py-20 md:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <Header
//           badge="Our Services"
//           title="Ank Digital Media services"
//           sub="Choose a category to explore what we build and manage for you."
//         />

//         <div className="mt-10 flex flex-wrap justify-center gap-2">
//           {TABS.map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setActive(t.key)}
//               className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
//                 active === t.key
//                   ? "bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground shadow-soft"
//                   : "border border-border bg-card text-foreground/70 hover:-translate-y-0.5 hover:text-primary"
//               }`}
//             >
//               <t.icon className="h-4 w-4" /> {t.label}
//             </button>
//           ))}
//         </div>

//         <motion.div
//           key={tab.key}
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
//           className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
//         >
//           <div className="card-soft rounded-2xl p-7">
//             <h3 className="font-display text-xl font-bold">{tab.label}</h3>
//             <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tab.blurb}</p>
//             <div className="mt-6 flex flex-wrap gap-2">
//               {tab.steps.map((s, i) => (
//                 <motion.span
//                   key={s}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.06 * i }}
//                   className="rounded-full border border-primary/25 bg-secondary px-3 py-1.5 text-xs font-semibold text-primary"
//                 >
//                   {i + 1}. {s}
//                 </motion.span>
//               ))}
//             </div>
//             <a
//               href="#contact"
//               className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
//             >
//               Get Started Now! <ArrowUpRight className="h-4 w-4" />
//             </a>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             {tab.items.map((it, i) => (
//               <motion.div
//                 key={it}
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.05 * i, duration: 0.45 }}
//                 className="card-soft flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lift"
//               >
//                 <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
//                   <Check className="h-4 w-4" />
//                 </div>
//                 <span className="text-sm font-medium">{it}</span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

/* ---------- why choose us / advance features ---------- */

const FEATURES = [
  { icon: Wand2, t: "Unique Animations", d: "Motion-led interfaces that feel alive, not templated." },
  { icon: Layers, t: "Widget Integration", d: "Chat, payments, CRM and analytics wired in from day one." },
  { icon: Users, t: "Personalization", d: "Content and offers tailored to each visitor segment." },
  { icon: ShieldCheck, t: "Security First", d: "SSL, hardened hosting and regular vulnerability checks." },
  { icon: Globe, t: "Global Delivery", d: "Serving clients across India and overseas since 2015." },
  { icon: Headphones, t: "24×7 Support", d: "Real humans on call whenever something needs attention." },
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
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
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

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
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
    { n: 320, s: "+", l: "Happy clients" },
    { n: 10, s: "M+", l: "SMS sent monthly" },
    { n: 9, s: " yrs", l: "In business" },
  ];
  return (
    <section className="bg-[linear-gradient(120deg,#29b6f6,#0277bd)] py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (
          <Reveal key={d.l} delay={i * 0.1}>
            <div className="text-center text-primary-foreground">
              <div className="font-display text-4xl font-black">
                <Counter to={d.n} suffix={d.s} />
              </div>
              <div className="mt-1 text-sm opacity-90">{d.l}</div>
            </div>
          </Reveal>
        ))}
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
    <section id="projects" className="bg-surface py-20 md:py-28">
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
            className="!pb-12"
          >
            {PROJECTS.map((p) => (
              <SwiperSlide key={p.t}>
                <div className="card-soft group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.85 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground"
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

// export function Career() {
//   const roles = [
//     { t: "Frontend Developer", x: "React · 1–3 yrs · New Delhi" },
//     { t: "SEO Executive", x: "On-page & off-page · 0–2 yrs" },
//     { t: "Business Development", x: "IT sales · 1–4 yrs" },
//     { t: "Graphic Designer", x: "Figma · Adobe · 1–3 yrs" },
//   ];
//   return (
//     <section id="career" className="bg-background py-20 md:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <Header
//           badge="Career"
//           title="Build your career with us"
//           sub="We're always looking for people who care about craft. Send your CV to ankdigitalmedia@gmail.com."
//         />
//         <div className="mt-12 grid gap-4 md:grid-cols-2">
//           {roles.map((r, i) => (
//             <Reveal key={r.t} delay={i * 0.08}>
//               <a
//                 href="#contact"
//                 className="card-soft group flex items-center justify-between gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
//               >
//                 <div className="min-w-0">
//                   <h3 className="font-display text-base font-semibold">{r.t}</h3>
//                   <p className="mt-1 text-sm text-muted-foreground">{r.x}</p>
//                 </div>
//                 <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform group-hover:rotate-45">
//                   <ArrowUpRight className="h-4 w-4" />
//                 </span>
//               </a>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ---------- payment ---------- */

// export function Payment() {
//   return (
//     <section id="payment" className="bg-surface py-20 md:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <Reveal>
//           <div className="card-soft grid items-center gap-8 rounded-3xl p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
//             <div>
//               <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
//                 <CreditCard className="h-3 w-3" /> Payment
//               </span>
//               <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.2rem)] font-bold leading-tight">
//                 Pay securely for your <span className="text-gradient">project or plan</span>
//               </h2>
//               <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
//                 Pay by UPI, net banking, credit or debit card. Share your invoice number while
//                 paying and our team will confirm within one working hour.
//               </p>
//               <div className="mt-7 flex flex-wrap gap-3">
//                 <a
//                   href="#contact"
//                   className="pulse-ring inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1"
//                 >
//                   Request payment link
//                 </a>
//                 <a
//                   href="tel:+919999779817"
//                   className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-1"
//                 >
//                   <Phone className="h-4 w-4" /> Talk to accounts
//                 </a>
//               </div>
//             </div>
//             <div className="grid gap-3 sm:grid-cols-2">
//               {["UPI / QR", "Net Banking", "Credit Card", "Debit Card"].map((m, i) => (
//                 <motion.div
//                   key={m}
//                   initial={{ opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.08, duration: 0.5 }}
//                   className="rounded-2xl border border-border bg-card px-4 py-5 text-center text-sm font-semibold shadow-soft"
//                 >
//                   {m}
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

/* ---------- contact ---------- */

// export function Contact() {
//   const [sent, setSent] = useState(false);
//   return (
//     <section id="contact" className="bg-background py-20 md:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <Header badge="Get in Touch" title="Let's grow your business online" />
//         <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
//           <div className="space-y-4">
//             {[
//               { icon: Phone, t: "Mobile No", d: "+91 99997 79817", href: "tel:+919999779817" },
//               {
//                 icon: Mail,
//                 t: "Email",
//                 d: "ankdigitalmedia@gmail.com",
//                 href: "mailto:ankdigitalmedia@gmail.com",
//               },
//               {
//                 icon: MapPin,
//                 t: "Address",
//                 d: "AG/611, Ground Floor, Opp. Wazirpur Computer Market, Near Shalimar Bagh Metro Station Gate No-2, New Delhi-110088",
//               },
//             ].map((c, i) => (
//               <Reveal key={c.t} delay={i * 0.1}>
//                 <a
//                   href={c.href ?? "#contact"}
//                   className="card-soft flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
//                 >
//                   <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
//                     <c.icon className="h-5 w-5" />
//                   </span>
//                   <div className="min-w-0">
//                     <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
//                       {c.t}
//                     </div>
//                     <div className="mt-1 text-sm font-medium leading-relaxed">{c.d}</div>
//                   </div>
//                 </a>
//               </Reveal>
//             ))}
//           </div>

//           <Reveal delay={0.15}>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setSent(true);
//               }}
//               className="card-soft grid gap-4 rounded-2xl p-7 sm:grid-cols-2"
//             >
//               <input
//                 required
//                 placeholder="Your name"
//                 className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
//               />
//               <input
//                 required
//                 type="tel"
//                 placeholder="Phone number"
//                 className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
//               />
//               <input
//                 required
//                 type="email"
//                 placeholder="Email address"
//                 className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
//               />
//               <select className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 sm:col-span-2">
//                 <option>Web Development</option>
//                 <option>Digital Marketing</option>
//                 <option>Bulk SMS / WhatsApp</option>
//                 <option>Web Hosting</option>
//               </select>
//               <textarea
//                 rows={4}
//                 placeholder="Tell us about your project"
//                 className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
//               />
//               <button
//                 type="submit"
//                 className="pulse-ring rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:col-span-2"
//               >
//                 {sent ? "Thanks — we'll call you shortly!" : "Send enquiry"}
//               </button>
//             </form>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }