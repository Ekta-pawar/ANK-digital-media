import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp, Facebook, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "/" },
  { icon: Instagram, label: "Instagram", href: "/" },
  { icon: Twitter, label: "Twitter", href: "/" },
  { icon: Linkedin, label: "LinkedIn", href: "/" },
];

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[linear-gradient(120deg,#29b6f6,#0277bd)]"
        style={{ scaleX: progress }}
      />

      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
        {SOCIALS.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.12, x: -4 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-card text-primary shadow-soft transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <s.icon className="h-4.5 w-4.5" />
          </motion.a>
        ))}
      </div>

      <a
        href="https://wa.me/919999779817"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        className="animate-float fixed bottom-6 left-6 z-40 grid h-13 w-13 place-items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground shadow-lift transition-transform hover:-translate-y-1"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}