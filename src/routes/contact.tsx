import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Header, Reveal } from "@/components/site/Sections";

const title = "Contact Us — Ank Digital Media";
const description =
  "Get in touch with Ank Digital Media for web development, digital marketing and bulk SMS/WhatsApp services.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-background pb-20 pt-28 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <Header badge="Get in Touch" title="Let's grow your business online" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, t: "Mobile No", d: "+91 99997 79817", href: "tel:+919999779817" },
              {
                icon: Mail,
                t: "Email",
                d: "ankdigitalmedia@gmail.com",
                href: "mailto:ankdigitalmedia@gmail.com",
              },
              {
                icon: MapPin,
                t: "Address",
                d: "AG/611, Ground Floor, Opp. Wazirpur Computer Market, Near Shalimar Bagh Metro Station Gate No-2, New Delhi-110088",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <a
                  href={c.href ?? "#"}
                  className="card-soft flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {c.t}
                    </div>
                    <div className="mt-1 text-sm font-medium leading-relaxed">{c.d}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="card-soft grid gap-4 rounded-2xl p-7 sm:grid-cols-2"
            >
              <input
                required
                placeholder="Your name"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
              />
              <select className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 sm:col-span-2">
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Bulk SMS / WhatsApp</option>
                <option>Web Hosting</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us about your project"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
              />
              <button
                type="submit"
                className="pulse-ring rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:col-span-2"
              >
                {sent ? "Thanks — we'll call you shortly!" : "Send enquiry"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
