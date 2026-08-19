import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Sections";
import { ContactBanner, ContactExtras } from "@/components/site/PageBanners";
import { createContact } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICE_OPTIONS = [
  "Web Designing",
  "Web Development",
  "Web Hosting",
  "Software Development",
  "E-Commerce Website",
  "Digital Marketing",
  "SEO",
  "Social Media",
  "Influencer Marketing",
  "Google My Business",
  "Brand Building",
  "Bulk SMS Services",
  "WhatsApp Marketing",
  "Voice Call Services",
  "IVR Services",
  "Missed Call Services",
];

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
  const [formData, setFormData] = useState({
    user_name: "",
    phone: "",
    user_email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    const results = await Promise.allSettled([
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      ),
      createContact({
        name: formData.user_name,
        phone: formData.phone,
        email: formData.user_email,
        service: formData.service,
        message: formData.message,
      }),
    ]);

    const failure = results.find((result) => result.status === "rejected");

    if (failure) {
      console.error("Contact submission error:", failure.reason);
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setStatus("idle");
    toast.success("Your enquiry has been sent successfully!");

    setFormData({
      user_name: "",
      phone: "",
      user_email: "",
      service: "",
      message: "",
    });
  };

  return (
    <>
      <ContactBanner />

      <section className="bg-background pb-20 pt-16 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">

            {/* Contact Information */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  t: "Mobile No",
                  d: "+91 99997 79817",
                  href: "tel:+919999779817",
                },
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

                      <div className="mt-1 text-sm font-medium leading-relaxed">
                        {c.d}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Contact Form */}
            <Reveal delay={0.15}>
              <form
                onSubmit={handleSubmit}
                className="card-soft grid gap-4 rounded-2xl p-7 sm:grid-cols-2"
              >

                {/* Name */}
                <input
                  required
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
                />

                {/* Phone */}
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
                />

                {/* Email */}
                <input
                  required
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
                />

                {/* Service */}
             
<Select
  name="service"
  value={formData.service}
  onValueChange={handleServiceChange}
  required
>
  <SelectTrigger className="h-auto rounded-xl border-input bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40 sm:col-span-2">
    <SelectValue placeholder="Select a service" />
  </SelectTrigger>

  <SelectContent className="max-h-64">
    {SERVICE_OPTIONS.map((s) => (
      <SelectItem key={s} value={s}>
        {s}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                {/* Project Description */}
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/40 sm:col-span-2"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="pulse-ring rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                >
                  {status === "sending" ? "Sending..." : "Send enquiry"}
                </button>

              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactExtras />
    </>
  );
}