import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const BLOBS = [
  { top: "-10%", left: "8%", size: 260, delay: 0 },
  { top: "40%", right: "4%", size: 220, delay: 1.2 },
  { bottom: "-15%", left: "38%", size: 240, delay: 2.4 },
];

const COLS = [
  {
    title: "Website Services",
    links: [
      { label: "Web Designing", slug: "web-designing" },
      { label: "Web Development", slug: "web-development" },
      { label: "Web Hosting", slug: "web-hosting" },
      { label: "Software Development", slug: "software-development" },
      { label: "E-Commerce Website", slug: "ecommerce-website" },
    ],
  },
  {
    title: "Digital Services",
    links: [
      { label: "Digital Marketing", slug: "digital-marketing" },
      { label: "SEO", slug: "seo" },
      { label: "Social Media", slug: "social-media" },
      { label: "Influencer Marketing", slug: "influencer-marketing" },
      { label: "Google My Business", slug: "google-my-business" },
      { label: "Brand Building", slug: "brand-building" },
    ],
  },
  {
    title: "SMS Services",
    links: [
      { label: "Bulk SMS Services", slug: "bulk-sms-services" },
      { label: "WhatsApp Marketing", slug: "whatsapp-marketing" },
      { label: "Voice Call Services", slug: "voice-call-services" },
      { label: "IVR Services", slug: "ivr-services" },
      { label: "Missed Call Services", slug: "missed-call-services" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-sky-100">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-primary/10 blur-3xl"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex rounded-2xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3 font-display text-lg font-bold text-primary-foreground shadow-soft"
        >
          Get in Touch
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {COLS.map((c, ci) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-primary">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: l.slug }}
                      className="text-sm text-muted-foreground transition-all hover:translate-x-1 hover:text-primary inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: COLS.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919999779817" className="hover:text-primary">
                  +91 99997 79817
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:ankdigitalmedia@gmail.com" className="break-all hover:text-primary">
                  ankdigitalmedia@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                AG/611, Ground Floor, Opp. Wazirpur Computer Market, Near Shalimar Bagh Metro
                Station Gate No-2, New Delhi-110088
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((I, i) => (
                <Link
                  key={i}
                  to="/"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-primary transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <I className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-border bg-sky-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© Copyright 2015–2026. All Rights Reserved | Ank Digital Media</span>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
            <a href="#privacy" className="hover:text-primary">
              Privacy & Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
