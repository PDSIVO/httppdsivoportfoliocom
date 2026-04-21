import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/pdsivo-portrait.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating accent shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur text-xs text-muted-foreground mb-6">
            <Sparkles size={12} className="text-primary" />
            Available for new brand projects
          </div>

          <h1 className="font-display font-bold leading-[0.95] tracking-tighter text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] mb-6">
            Israel Victor <br />
            Olamide <span className="text-gradient">— PDSIVO.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-3 font-medium">
            Graphic Designer · Brand Identity & UI/UX Designer
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/90 max-w-xl mb-10 leading-relaxed">
            I design clean, impactful visuals that help brands communicate
            better and stand out — from full identity systems to interfaces
            people actually want to use.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="lg">
              <a href="#work">
                View Portfolio <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "3+", l: "Years experience" },
              { n: "20+", l: "Projects delivered" },
              { n: "100%", l: "Client focused" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  {s.n}
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="relative max-w-md mx-auto lg:ml-auto">
            <div className="absolute -inset-4 bg-gradient-blue rounded-[2rem] blur-2xl opacity-30 animate-pulse-glow" />
            <div className="relative rounded-[2rem] overflow-hidden border border-border bg-surface shadow-elevated">
              <img
                src={portrait}
                alt="Portrait of Israel Victor Olamide, PDSIVO graphic designer"
                width={1024}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">
                    Based in
                  </div>
                  <div className="font-display font-medium">Nigeria 🇳🇬</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 backdrop-blur grid place-items-center border border-primary/40">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div className="hidden sm:flex absolute -left-6 top-10 animate-float items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-border shadow-elevated">
              <div className="h-7 w-7 rounded-md bg-gradient-blue grid place-items-center text-primary-foreground text-xs font-bold">
                ✦
              </div>
              <div className="text-xs">
                <div className="font-medium">Brand Identity</div>
                <div className="text-muted-foreground">Logo + System</div>
              </div>
            </div>
            <div className="hidden sm:flex absolute -right-4 bottom-16 animate-float items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-border shadow-elevated" style={{ animationDelay: "1.5s" }}>
              <div className="h-7 w-7 rounded-md bg-primary/15 grid place-items-center text-primary text-xs font-bold border border-primary/30">
                UI
              </div>
              <div className="text-xs">
                <div className="font-medium">Figma Native</div>
                <div className="text-muted-foreground">UI/UX Designer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
