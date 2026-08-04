import { createFileRoute } from "@tanstack/react-router";
import { Plans, Process } from "@/components/site/Sections";

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
      <Process />
      <Plans />
    </>
  );
}
