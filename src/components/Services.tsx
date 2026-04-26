import { Palette, Share2, FileText, Layout, Printer, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Identity Design",
    desc: "Logos, color systems, typography, and full brand guidelines that give your business a clear, ownable identity.",
  },
  {
    icon: Share2,
    title: "Social Media Design",
    desc: "Engaging posts, banners, and content layouts that build presence and stop the scroll.",
  },
  {
    icon: FileText,
    title: "Flyers & Posters",
    desc: "Promotional and event visuals designed for instant clarity and attention — print or digital.",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "Clean, user-friendly interface designs for apps and websites — designed and prototyped in Figma.",
  },
  {
    icon: Printer,
    title: "Print Design",
    desc: "Business cards, brochures, and marketing materials with the polish your brand deserves in hand.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16" data-aos="fade-up">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              Services
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              How I help brands
              <span className="text-gradient"> level up.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Every engagement is built around your goals — not templates. From
            identity to interface, every deliverable is crafted to perform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-aos="zoom-in-up"
              data-aos-delay={i * 80}
              className={`group lift-on-hover relative p-7 lg:p-8 rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 hover:border-primary/70 hover:shadow-glow ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              {/* glow blob */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-3xl transition-all duration-700" />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary group-hover:bg-gradient-blue group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-500">
                    <s.icon size={20} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-500"
                  />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-border/60 text-xs uppercase tracking-widest text-muted-foreground/70">
                  0{i + 1} / 05
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
