import { GraduationCap, Target, Users, Zap } from "lucide-react";
import portrait from "@/assets/pdsivo-portrait.jpg";

const traits = [
  { icon: Target, title: "Detail-focused", desc: "Pixel-precise execution on every element." },
  { icon: Users, title: "Client-centered", desc: "Your goals shape every design decision." },
  { icon: Zap, title: "Visual clarity", desc: "Stripping noise to amplify the message." },
  { icon: GraduationCap, title: "Always learning", desc: "Sharpening craft with every project." },
];

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="lg:col-span-5 order-2 lg:order-1" data-aos="fade-right">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/40 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-elevated">
                <img
                  src={portrait}
                  alt="PDSIVO at work"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-auto object-cover grayscale-[20%]"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-left">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              About Me
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-8">
              Designing with <span className="text-gradient">intent</span>,
              not just instinct.
            </h2>

            <div className="space-y-5 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                I&apos;m <span className="text-foreground font-medium">Israel Victor Olamide</span>,
                known as PDSIVO — a Nigerian graphic designer with{" "}
                <span className="text-foreground">3+ years</span> of hands-on
                experience helping businesses look credible, modern, and
                unmistakably theirs.
              </p>
              <p>
                I work across brand identity, social media, and print,
                blending sharp visual instincts with a structured, collaborative
                process that keeps the work focused on outcomes — not just
                aesthetics.
              </p>
            </div>

            <div className="mt-8 p-5 rounded-xl border border-border bg-surface/60">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Education
              </div>
              <div className="font-display font-medium text-foreground">
                Folem High School — Secondary education completed
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Currently preparing for university admission.
              </div>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {traits.map((t, i) => (
                <div
                  key={t.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="group lift-on-hover p-4 rounded-xl border border-border bg-surface/40 hover:border-primary/50 hover:bg-surface transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <t.icon size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {t.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {t.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
