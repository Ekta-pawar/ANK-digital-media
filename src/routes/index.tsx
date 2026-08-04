import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Features, Marquee, Process, Projects, Stats } from "@/components/site/Sections";

const title = "Ank Digital Media — Web Development, Marketing & Bulk SMS";
const description =
  "Ank Digital Media is an IT services company in New Delhi offering web development, digital marketing, SEO, web hosting and bulk SMS, WhatsApp and voice campaigns.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Process />
      <Stats />
      <Features />
      <Projects />
    </>
  );
}
