import {
  Palette,
  Share2,
  FileText,
  Layout,
  Printer,
  PenTool,
  CreditCard,
} from "lucide-react";

const skills = [
  { icon: Palette, name: "Brand Identity Design", level: 95 },
  { icon: Share2, name: "Social Media Design", level: 92 },
  { icon: FileText, name: "Flyer & Poster Design", level: 90 },
  { icon: Layout, name: "Interface Design (Figma)", level: 85 },
  { icon: Printer, name: "Print Design", level: 88 },
  { icon: PenTool, name: "Logo Design", level: 94 },
  { icon: CreditCard, name: "Business Card Design", level: 90 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 lg:py-32 bg-surface/30 relative">
      <div className="container">
        <div className="max-w-2xl mb-16" data-aos="fade-up">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Skills
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5">
            A toolkit built for
            <span className="text-gradient"> real brand work.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Cross-disciplinary skills sharpened across dozens of projects — each
            one built around clarity, consistency, and impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <div
              key={s.name}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              className="group relative p-6 rounded-2xl border border-border bg-surface hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-soft"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-blue opacity-0 group-hover:opacity-[0.06] transition-opacity" />

              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary mb-5 group-hover:bg-gradient-blue group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-500">
                  <s.icon size={20} />
                </div>

                <h3 className="font-display font-semibold text-foreground mb-4">
                  {s.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-foreground font-medium">
                      {s.level}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-blue rounded-full transition-all duration-1000 group-hover:shadow-glow-soft"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
