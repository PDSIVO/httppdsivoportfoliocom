import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import projectFood from "@/assets/project-food.jpg";
import projectBrand from "@/assets/project-brand.jpg";
import projectPrint from "@/assets/project-print.jpg";

type Project = {
  title: string;
  category: string;
  image: string;
  focus: string;
  description: string;
  deliverables: string[];
  className: string;
};

const projects: Project[] = [
  {
    title: "Food Brand Social Media Campaign",
    category: "Social Media",
    image: projectFood,
    focus: "Visual appeal & customer engagement",
    description:
      "Designed a cohesive set of promotional posts and flyers for a food business — focused on appetite-driven visuals, clear hierarchy, and a recognizable look across every post.",
    deliverables: ["Post templates", "Story sets", "Promo flyers", "Brand color palette"],
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Business Brand Identity Design",
    category: "Brand Identity",
    image: projectBrand,
    focus: "Professionalism & consistency",
    description:
      "Built a complete identity system — logo, color palette, typography and usage rules — giving the business a credible, consistent presence across every touchpoint.",
    deliverables: ["Logo system", "Color palette", "Typography", "Brand guidelines"],
    className: "lg:col-span-1",
  },
  {
    title: "Event Flyer & Print Design",
    category: "Print",
    image: projectPrint,
    focus: "Clarity & strong visual communication",
    description:
      "Designed flyers and print materials for events and promotions, balancing bold typography with structured layouts that read instantly from across a room.",
    deliverables: ["Event flyers", "Posters", "Print collateral"],
    className: "lg:col-span-1",
  },
];

const Portfolio = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 lg:py-32 bg-surface/30 relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14" data-aos="fade-up">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Selected Work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Projects that
              <span className="text-gradient"> moved the needle.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A snapshot of recent work across branding, social, and print. Click
            any project to see the full case.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:auto-rows-[260px] gap-5">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(p)}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className={`group lift-on-hover relative overflow-hidden rounded-2xl border border-border bg-surface text-left transition-all duration-500 hover:border-primary/60 hover:shadow-glow ${p.className}`}
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={768}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-6 lg:p-7">
                <div className="text-xs uppercase tracking-widest text-primary mb-2">
                  {p.category}
                </div>
                <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground pr-8">
                  {p.title}
                </h3>
                <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-surface-elevated/80 backdrop-blur border border-border grid place-items-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </button>
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
              width={1024}
              height={768}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6 lg:p-8">
              <div className="text-xs uppercase tracking-widest text-primary mb-2">
                {active.category}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {active.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {active.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Focus
                  </div>
                  <div className="text-foreground">{active.focus}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Deliverables
                  </div>
                  <ul className="text-foreground space-y-1 text-sm">
                    {active.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
