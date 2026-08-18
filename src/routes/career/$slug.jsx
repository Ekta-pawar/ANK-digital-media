import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Sections";
import { CareerDetailBanner } from "@/components/site/PageBanners";
import { CAREER_CONTENT, CAREER_SLUGS } from "./-content";

export const Route = createFileRoute("/career/$slug")({
  loader: ({ params }) => {
    const entry = CAREER_CONTENT[params.slug];
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} — Careers — Ank Digital Media`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: CareerDetailPage,
});

function CareerDetailPage() {
  const entry = Route.useLoaderData();
  const { slug } = Route.useParams();

  const otherSlugs = CAREER_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <CareerDetailBanner
        title={entry.title}
        type={entry.type}
        location={entry.location}
        experience={entry.experience}
        summary={entry.summary}
      />

      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-10 pt-14 sm:grid-cols-2 md:pt-16">
            <Reveal>
              <h2 className="font-display text-lg font-bold">Responsibilities</h2>
              <div className="mt-4 space-y-3">
                {entry.responsibilities.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[linear-gradient(120deg,#29b6f6,#0277bd)] text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-lg font-bold">Requirements</h2>
              <div className="mt-4 space-y-3">
                {entry.requirements.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Ready to apply? Send your CV to{" "}
              <a href="mailto:ankdigitalmedia@gmail.com" className="font-semibold text-primary">
                ankdigitalmedia@gmail.com
              </a>
            </p>
            <a
              href={`mailto:ankdigitalmedia@gmail.com?subject=${encodeURIComponent(`Application — ${entry.title}`)}`}
              className="pulse-ring inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#29b6f6,#0277bd)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              Apply Now
            </a>
          </Reveal>
        </div>
      </section>

      {/* {otherSlugs.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-lg font-bold">
              Other <span className="text-gradient">open roles</span>
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {otherSlugs.map((s, i) => (
                <Reveal key={s} delay={i * 0.08}>
                  <Link
                    to="/career/$slug"
                    params={{ slug: s }}
                    className="card-soft group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div>
                      <div className="text-sm font-semibold">{CAREER_CONTENT[s].title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {CAREER_CONTENT[s].location} · {CAREER_CONTENT[s].experience}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </>
  );
}
