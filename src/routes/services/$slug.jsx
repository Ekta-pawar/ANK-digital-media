import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Sections";
import { ServiceDetailBanner } from "@/components/site/PageBanners";
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
  const { slug } = Route.useParams();

  const related = Object.entries(SERVICE_CONTENT)
    .filter(([s, e]) => s !== slug && e.category === entry.category)
    .slice(0, 3);

  return (
    <>
      <ServiceDetailBanner
        icon={entry.icon}
        category={entry.category}
        title={entry.title}
        description={entry.description}
      />

      <section className="bg-background pb-6 md:pb-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 pt-14 sm:grid-cols-2 md:pt-16">
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

      {related.length > 0 && (
        <section className="bg-surface py-6 md:py-10">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-lg font-bold">
              More in <span className="text-gradient">{entry.category}</span>
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map(([s, e], i) => (
                <Reveal key={s} delay={i * 0.08}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s }}
                    className="card-soft group flex h-full flex-col justify-between gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div>
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
                        <e.icon className="h-4 w-4" />
                      </span>
                      <div className="mt-3 text-sm font-semibold">{e.title}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
