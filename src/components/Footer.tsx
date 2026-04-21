import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 rounded-lg bg-gradient-blue grid place-items-center font-display font-bold text-primary-foreground text-sm">
            P
          </span>
          <div>
            <div className="font-display font-semibold leading-none">PDSIVO</div>
            <div className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} Israel Victor Olamide. All rights reserved.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:pdsivo1@gmail.com"
            className="h-10 w-10 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary transition"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://wa.me/2347019034924"
            target="_blank"
            rel="noreferrer"
            className="h-10 w-10 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary transition"
            aria-label="WhatsApp"
          >
            <Phone size={16} />
          </a>
          <a
            href="https://www.instagram.com/pdsivo1"
            target="_blank"
            rel="noreferrer"
            className="h-10 w-10 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary transition"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
