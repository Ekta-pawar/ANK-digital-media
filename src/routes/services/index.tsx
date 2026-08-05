import { createFileRoute } from "@tanstack/react-router";
import { Plans, Process } from "@/components/site/Sections";
import { ServiceHighlights, ServicesBanner } from "@/components/site/PageBanners";

const title = "Our Services — Ank Digital Media";
const description =
  "Web development, digital marketing, bulk SMS/WhatsApp and web hosting services from Ank Digital Media, New Delhi.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  return (
    <>
      <ServicesBanner />
      <Process />
      <Plans />
      <ServiceHighlights />
    </>
  );
}
