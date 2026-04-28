import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import sm1 from "@/assets/social/sm-1.jpg";
import sm2 from "@/assets/social/sm-2.jpg";
import sm3 from "@/assets/social/sm-3.jpg";
import sm4 from "@/assets/social/sm-4.jpg";
import ch1 from "@/assets/church/ch-1.jpg";
import ch2 from "@/assets/church/ch-2.jpg";
import ch3 from "@/assets/church/ch-3.jpg";
import ch4 from "@/assets/church/ch-4.jpg";
import brand1 from "@/assets/brand/brand-1.jpg";
import biz1 from "@/assets/business/biz-1.jpg";

type Project = {
  title: string;
  image: string;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  projects: Project[];
};

const sections: Section[] = [
  {
    id: "social-media",
    title: "Social Media Post Designs",
    subtitle: "Scroll-stopping posts crafted to grow brands and drive engagement.",
    projects: [
      { title: "Imole Hairline — Brand Post", image: sm1 },
      { title: "Promotional Social Post", image: sm2 },
      { title: "Mr. Segun Computer Company", image: sm3 },
      { title: "Brand Campaign Post", image: sm4 },
    ],
  },
  {
    id: "church-media",
    title: "Church Media Post Designs",
    subtitle: "Reverent, welcoming flyers built around clarity and message.",
    projects: [
      { title: "Church Event Flyer", image: ch1 },
      { title: "Sunday Service Design", image: ch2 },
      { title: "The Glorious Family Ministries", image: ch3 },
      { title: "Church Program Flyer", image: ch4 },
    ],
  },
  {
    id: "brand-identity",
    title: "Brand Identity Design",
    subtitle: "Logo systems and visual identities that build trust and recall.",
    projects: [{ title: "Annie — Logo Mockup", image: brand1 }],
  },
  {
    id: "business-card",
    title: "Business Card Design",
    subtitle: "Professional, print-ready cards that leave a lasting impression.",
    projects: [{ title: "Business Card Design", image: biz1 }],
  },
];

const Portfolio = () => {
  const [active, setActive] = useState<(Project & { section: string }) | null>(null);

  return (
    <section id="work" className="py-24 lg:py-32 bg-surface/30 relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16" data-aos="fade-up">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Selected Work
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Projects that
              <span className="text-gradient"> moved the needle.</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md">
            A curated look at recent work — grouped by category so you can
            explore the kind of design you came for.
          </p>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div
                className="flex flex-col gap-2 mb-8 pb-4 border-b border-border"
                data-aos="fade-up"
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">
                    {section.projects.length}{" "}
                    {section.projects.length === 1 ? "Project" : "Projects"}
                  </span>
                </div>
                <p className="text-muted-foreground max-w-2xl">{section.subtitle}</p>
              </div>

              <div
                className={`grid gap-5 ${
                  section.projects.length === 1
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {section.projects.map((p, i) => (
                  <button
                    key={p.title}
                    onClick={() => setActive({ ...p, section: section.title })}
                    data-aos="fade-up"
                    data-aos-delay={i * 120}
                    className="group lift-on-hover relative overflow-hidden rounded-2xl border border-border bg-surface text-left transition-all duration-500 hover:border-primary/60 hover:shadow-glow aspect-[4/5]"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />

                    <div className="relative h-full flex flex-col justify-end p-5">
                      <h3 className="font-display text-base lg:text-lg font-semibold text-foreground pr-8 leading-tight">
                        {p.title}
                      </h3>
                      <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-surface-elevated/80 backdrop-blur border border-border grid place-items-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-4 bg-background/80 backdrop-blur-sm animate-fade-up"
          onClick={() => setActive(null)}
          style={{ animationDuration: "300ms" }}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface-elevated shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-background/70 backdrop-blur border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img
              src={active.image}
              alt={active.title}
              className="w-full max-h-[70vh] object-contain bg-background"
            />
            <div className="p-6 lg:p-8">
              <div className="text-xs uppercase tracking-widest text-primary mb-2">
                {active.section}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                {active.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
