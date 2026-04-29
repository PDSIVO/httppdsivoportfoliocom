import { useState } from "react";
import { X } from "lucide-react";
import sm1 from "@/assets/social/sm-1.jpg";
import sm2 from "@/assets/social/sm-2.jpg";
import sm4 from "@/assets/social/sm-4.jpg";

const posts = [
  { title: "Imole Hairline — Brand Post", image: sm1 },
  { title: "Promotional Social Post", image: sm2 },
  { title: "Brand Campaign Post", image: sm4 },
];

const SocialGallery = () => {
  const [active, setActive] = useState<{ title: string; image: string } | null>(null);

  return (
    <section id="social-gallery" className="py-24 lg:py-32 bg-background relative">
      <div className="container">
        <div className="flex flex-col gap-4 mb-12 max-w-3xl" data-aos="fade-up">
          <div className="text-xs uppercase tracking-[0.3em] text-primary">
            Social Media Gallery
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Every post, <span className="text-gradient">in one place.</span>
          </h2>
          <p className="text-muted-foreground">
            A consistent grid of social media designs — built to stop the scroll
            and stay on-brand across every platform.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {posts.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(p)}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface aspect-square transition-all duration-500 hover:border-primary/60 hover:shadow-glow"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-display text-sm font-semibold text-foreground leading-tight">
                  {p.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

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
                Social Media Gallery
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

export default SocialGallery;
