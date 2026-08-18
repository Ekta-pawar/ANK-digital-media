import { createFileRoute } from "@tanstack/react-router";
import { Career } from "@/components/site/Sections";
import { CareerBanner, Industries } from "@/components/site/PageBanners";

const title = "Careers — Ank Digital Media";
const description =
  "Open roles at Ank Digital Media. Join a team that builds web, marketing and SMS/WhatsApp projects measured in real results.";

export const Route = createFileRoute("/career/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CareerIndexPage,
});

function CareerIndexPage() {
  return (
    <>
      <CareerBanner />
      <Career />
      <Industries />
    </>
  );
}
