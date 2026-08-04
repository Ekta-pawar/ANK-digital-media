import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/site/Sections";

const title = "Featured Projects — Ank Digital Media";
const description =
  "A look at recent web, marketing and SMS/WhatsApp projects delivered by Ank Digital Media, measured in real results.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="pt-28">
      <Projects />
    </div>
  );
}
