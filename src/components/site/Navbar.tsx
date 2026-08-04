import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import logo from "@/assets/Screenshot_2026-07-25_141748-removebg-preview.png";

type NavItem = { label: string; to: string; children?: { label: string; to: string }[] };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "SMS Service",
    to: "/services",
    children: [
      { label: "Bulk SMS Provider", to: "/services/bulk-sms-services" },
      { label: "Voice Call", to: "/services/voice-call-services" },
      { label: "Transactional SMS", to: "/services/bulk-sms-services" },
      { label: "Promotional SMS", to: "/services/bulk-sms-services" },
      { label: "Missed Call Service", to: "/services/missed-call-services" },
      { label: "IVR Solutions", to: "/services/ivr-services" },
      { label: "OTP Service", to: "/services/bulk-sms-services" },
      { label: "RCS Services", to: "/services" },
      { label: "WhatsApp Marketing", to: "/services/whatsapp-marketing" },
    ],
  },
  {
    label: "Web Services",
    to: "/services",
    children: [
      { label: "E-Commerce", to: "/services/ecommerce-website" },
      { label: "Web Development", to: "/services/web-development" },
      { label: "Web Designing", to: "/services/web-designing" },
      { label: "Software Development", to: "/services/software-development" },
      { label: "Website Hosting", to: "/services/web-hosting" },
    ],
  },
  {
    label: "Digital Marketing",
    to: "/services",
    children: [
      { label: "Search Engine (SEO)", to: "/services/seo" },
      { label: "Social Media", to: "/services/social-media" },
      { label: "Influencer Marketing", to: "/services/influencer-marketing" },
      { label: "Google My Business", to: "/services/google-my-business" },
      { label: "Brand Building", to: "/services/brand-building" },
    ],
  },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to: string) => {
    navigate({ to });
    setMobile(false);
    setOpen(null);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-5 transition-all duration-300 md:px-7 lg:gap-3 xl:gap-4 ${
          scrolled ? "mt-2 rounded-2xl glass py-2.5 shadow-lift" : "mt-3 rounded-2xl bg-white/70 py-3.5 backdrop-blur-md"
        } w-[calc(100%-1.5rem)]`}
      >
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <motion.img
            src={logo}
            alt="ANK Digital Media"
            className="h-11 w-11 shrink-0 object-contain"
            initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08, rotate: 6 }}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide">ANK Digital</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Media</span>
          </div>
        </Link>

        <nav
          className="hidden items-center lg:flex"
          onMouseLeave={() => setHoverItem(null)}
        >
          {NAV.map((item, i) => (
            <motion.div
              key={item.label}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.35, ease: "easeOut" }}
              onMouseEnter={() => {
                setHoverItem(item.label);
                if (item.children) setOpen(item.label);
              }}
              onMouseLeave={() => item.children && setOpen(null)}
            >
              <motion.button
                onClick={() => go(item.to)}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-0.5 whitespace-nowrap rounded-lg px-1.5 py-2 text-[12.5px] font-medium text-foreground/80 transition-colors hover:text-primary lg:px-2 xl:gap-1 xl:px-3 xl:text-sm"
              >
                {item.label}
                {item.children && (
                  <motion.span
                    animate={{ rotate: open === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </motion.span>
                )}
              </motion.button>
              {hoverItem === item.label && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <AnimatePresence>
                {item.children && open === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-64 rounded-2xl border border-border bg-card p-2 shadow-lift">
                      {item.children.map((c, i) => (
                        <motion.button
                          key={c.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * i, duration: 0.25 }}
                          onClick={() => go(c.to)}
                          className="block w-full rounded-xl px-3 py-2 text-left text-sm text-foreground/75 transition-all hover:translate-x-1 hover:bg-secondary hover:text-primary"
                        >
                          {c.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* <a
            href="tel:+919999779817"
            className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary md:inline-flex"
          >
            <Phone className="h-4 w-4" /> +91 99997 79817
          </a> */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate({ to: "/contact" })}
            className="hidden rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft sm:block"
          >
            Get a Quote
          </motion.button>
          <motion.button
            aria-label="Menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: 90 }}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
            onClick={() => setMobile(true)}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 h-dvh w-[85%] max-w-sm overflow-y-auto bg-card p-6 shadow-lift xl:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">Menu</span>
                <button aria-label="Close" onClick={() => setMobile(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-border">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 space-y-1">
                {NAV.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                    onClick={() => go(item.to)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <a
                href="tel:+919999779817"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Call us now
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}