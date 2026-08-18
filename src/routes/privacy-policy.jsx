import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Sections";
import { Breadcrumb } from "@/components/site/PageBanners";

const title = "Privacy & Policy — Ank Digital Media";
const description =
  "How Ank Digital Media collects, uses and protects information when you use our website and services.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PrivacyPolicyPage,
});

const SECTIONS = [
  {
    h: "Information we collect",
    p: "When you fill out a contact or enquiry form, apply for a role, or message us on WhatsApp/phone, we collect the details you provide — such as your name, email address, phone number and the content of your message.",
  },
  {
    h: "How we use your information",
    p: "We use this information to respond to enquiries, provide quotes, deliver the services you request, process job applications, and — where you've agreed — send updates about our services. We do not sell your personal information to third parties.",
  },
  {
    h: "Cookies & analytics",
    p: "Our website may use cookies and similar technologies to understand how visitors use the site and to improve performance. You can disable cookies in your browser settings at any time.",
  },
  {
    h: "Third-party services",
    p: "We may use trusted third-party tools (such as analytics, hosting and communication providers) to operate this website. These providers only access the information needed to perform their function.",
  },
  {
    h: "Data security",
    p: "We take reasonable technical and organisational measures to protect the information you share with us against unauthorised access, loss or misuse.",
  },
  {
    h: "Your rights",
    p: "You can ask us to access, correct or delete the personal information we hold about you at any time by contacting us using the details below.",
  },
  {
    h: "Contact us",
    p: "For any questions about this policy or how your data is handled, email ankdigitalmedia@gmail.com or call +91 99997 79817.",
  },
];

function PrivacyPolicyPage() {
  return (
    <section className="bg-background pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy & Policy" }]} />
        <Reveal>
          <h1 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight">
            Privacy & Policy
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: August 2026</p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.h} delay={0.05 + i * 0.05}>
              <h2 className="font-display text-base font-bold">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
