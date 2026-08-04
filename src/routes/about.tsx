import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/Sections";

const title = "About Us — Ank Digital Media";
const description =
  "Ank Digital Media is a trusted global IT services company offering enterprise mobile app development, content management and CRM solutions.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-28">
      <About />
    </div>
  );
}
