import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Win Rate", value: "78.4%" },
  { label: "Markets Covered", value: "4+" },
  { label: "Avg Monthly ROI", value: "12.6%" },
  { label: "Signals Delivered", value: "2,400+" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-16">
      {/* Dark overlay on grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Live Trading · Professional Signals
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-grotesk text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          Trade Smarter.<br />
          <span className="text-primary glow-text">Win Consistently.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          es-tradez delivers institutional-grade trading signals across Forex, Crypto, Stocks, and Futures —
          backed by rigorous analysis and a proven track record.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#signals"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-all glow-green text-sm"
          >
            View Live Signals <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#performance"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded hover:border-primary/50 hover:text-primary transition-all text-sm"
          >
            See Performance
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-5 text-center">
              <div className="text-2xl md:text-3xl font-grotesk font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}