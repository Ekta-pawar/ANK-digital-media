import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Header, Reveal } from "@/components/site/Sections";
import { SERVICE_CONTENT } from "./-content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const entry = SERVICE_CONTENT[params.slug];
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} — Ank Digital Media`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const entry = Route.useLoaderData();

  return (
    <section className="bg-background pb-20 md:pb-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto mb-4 flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground shadow-soft">
            <entry.icon className="h-7 w-7" />
          </span>
        </Reveal>
        <Header badge={entry.category} title={entry.title} sub={entry.description} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {entry.features.map((f, i) => (
            <Reveal key={f} delay={i * 0.08}>
              <div className="card-soft flex items-center gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{f}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="pulse-ring inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Get Started Now!
          </a>
        </Reveal>
      </div>
    </section>
  );
}
