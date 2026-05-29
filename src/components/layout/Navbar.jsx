import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Markets", href: "#markets" },
  { label: "Signals", href: "#signals" },
  { label: "Performance", href: "#performance" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          {/* Icon mark: upward arrow through an S-curve */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              {/* S-curve body */}
              <path
                d="M22 8 C22 8 26 8 26 13 C26 18 18 18 18 23 C18 28 22 28 22 28"
                stroke="hsl(152 80% 45%)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
              />
              <path
                d="M10 8 C10 8 6 8 6 13 C6 18 14 18 14 23 C14 28 10 28 10 28"
                stroke="hsl(152 80% 45%)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
              />
              {/* Bold upward arrow */}
              <path
                d="M16 26 L16 10"
                stroke="hsl(152 80% 45%)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M10 16 L16 8 L22 16"
                stroke="hsl(152 80% 45%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Arrow head fill */}
              <polygon
                points="16,7 23,17 9,17"
                fill="hsl(152 80% 45%)"
                opacity="0.9"
              />
            </svg>
          </div>
          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="font-grotesk font-bold text-base tracking-tight">
              <span className="text-foreground">es-</span><span className="text-primary">tradez</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-0.5">Trade · Invest · Grow</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-all"
        >
          Get Started
        </a>

        {/* Mobile menu button */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}