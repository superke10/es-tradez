import { motion } from "framer-motion";
import { ShieldCheck, Target, Zap, Eye } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision Entry",
    desc: "Every signal is backed by technical confluence — structure, momentum, and volume all aligned before we pull the trigger.",
  },
  {
    icon: ShieldCheck,
    title: "Risk First",
    desc: "Capital preservation is paramount. Strict risk-to-reward requirements and position sizing protect your account above all.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    desc: "No cherry-picked results. Every trade — winner or loser — is logged and shared with the community in real time.",
  },
  {
    icon: Zap,
    title: "Multi-Market Edge",
    desc: "We trade Forex, Crypto, Stocks, and Futures — rotating capital into the highest-probability setups across all sessions.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-4 block">Who We Are</span>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Institutional Thinking.<br />
              <span className="text-primary">Retail Access.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              es-tradez was founded by professional traders with backgrounds in institutional market-making, proprietary trading, and quantitative analysis. We built the firm we wished existed when we started — rigorous, transparent, and relentlessly focused on results.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our edge comes from a systematic approach to multi-timeframe analysis, combined with deep experience reading order flow and market structure across every major asset class.
            </p>

            <div className="flex flex-col gap-3">
              {["5+ years of verified trading history", "Multi-asset coverage: Forex, Crypto, Stocks, Futures", "Real-time signal delivery via community platform"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-5"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <v.icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-grotesk font-bold text-foreground text-sm mb-2">{v.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}