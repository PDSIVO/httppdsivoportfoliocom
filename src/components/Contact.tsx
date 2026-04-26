import { useState } from "react";
import { Mail, Phone, Instagram, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "pdsivo1@gmail.com",
    href: "mailto:pdsivo1@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp / Call",
    value: "+234 701 903 4924",
    href: "https://wa.me/2347019034924",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@pdsivo1",
    href: "https://www.instagram.com/pdsivo1",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`New project enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi PDSIVO,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:pdsivo1@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      toast.success("Opening your email — talk soon!");
      setSending(false);
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Get in touch
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5">
            Let&apos;s build your <span className="text-gradient">brand.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind, or just want to say hi? Drop a message and
            I&apos;ll get back within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Channels */}
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-primary/60 hover:shadow-glow-soft transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary group-hover:bg-gradient-blue group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                  <c.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="font-medium text-foreground truncate">
                    {c.value}
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition"
                />
              </a>
            ))}

            <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5">
              <div className="text-xs uppercase tracking-widest text-primary mb-1">
                Currently
              </div>
              <div className="font-display font-medium">
                Open to new freelance projects
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            data-aos="fade-left"
            className="lg:col-span-3 p-6 lg:p-8 rounded-2xl border border-border bg-surface space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Your name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Tell me about your project
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                placeholder="I'm launching a new brand and need..."
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={sending}
              className="w-full sm:w-auto"
            >
              {sending ? "Sending..." : "Send message"} <Send />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
