import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zap, Target, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Zap, title: "Real-Time Delivery", desc: "Signals sent instantly via our platform the moment conditions are met." },
  { icon: Target, title: "Precise Entries", desc: "Exact entry price, take profit levels, and stop-loss for every signal." },
  { icon: Clock, title: "All Sessions", desc: "Coverage across Asian, London, and New York trading sessions." },
  { icon: CheckCircle, title: "Verified Results", desc: "Every closed signal is logged and publicly tracked for full transparency." },
];

const plans = [
  { name: "Starter", price: "$49", period: "/mo", features: ["Forex Signals", "2 markets", "Daily recap", "Community access"] },
  { name: "Pro", price: "$99", period: "/mo", features: ["All 4 markets", "Real-time alerts", "Detailed analysis", "Priority support"], highlight: true },
  { name: "Elite", price: "$199", period: "/mo", features: ["Everything in Pro", "1-on-1 mentorship", "Portfolio review", "Exclusive webinars"] },
];

export default function TradingSignals() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Company</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trading <span className="text-primary">Signals</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              Our signals are not guesses — they are calculated setups based on technical confluence, market structure, and risk-reward validation. Every single one is logged.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{f.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-grotesk font-bold text-foreground text-xl mb-6 text-center">Membership Plans</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.4 }}
                className={`rounded-xl p-6 border flex flex-col ${p.highlight ? "bg-primary/5 border-primary/40" : "bg-card border-border"}`}>
                <div className="font-grotesk font-bold text-foreground text-lg mb-1">{p.name}</div>
                <div className="text-3xl font-grotesk font-bold text-primary mb-4">{p.price}<span className="text-sm text-muted-foreground">{p.period}</span></div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href="/#contact" className={`text-center py-2 px-4 rounded text-sm font-semibold transition-all ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:border-primary"}`}>
                  Get Access
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}