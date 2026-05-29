import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Globe, Clock, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const pairs = [
  { pair: "EUR/USD", spread: "0.8 pips", session: "London/NY" },
  { pair: "GBP/USD", spread: "1.0 pips", session: "London" },
  { pair: "USD/JPY", spread: "0.7 pips", session: "Tokyo/NY" },
  { pair: "AUD/USD", spread: "0.9 pips", session: "Sydney/Tokyo" },
  { pair: "USD/CAD", spread: "1.1 pips", session: "NY" },
  { pair: "EUR/GBP", spread: "1.2 pips", session: "London" },
];

export default function Forex() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Markets</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Forex <span className="text-primary">Trading</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              The world's largest financial market with over $7.5 trillion traded daily. We cover all major, minor, and exotic currency pairs with precision signals and tight risk management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Globe, label: "24/5 Market", desc: "Trade across all global sessions" },
              { icon: TrendingUp, label: "High Liquidity", desc: "Tight spreads on major pairs" },
              { icon: Clock, label: "Fast Execution", desc: "Signals delivered in real-time" },
            ].map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{f.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-grotesk font-bold text-foreground text-lg mb-4">Covered Pairs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {pairs.map((p, i) => (
              <motion.div key={p.pair} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <div className="font-grotesk font-bold text-foreground">{p.pair}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.session}</div>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">{p.spread}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}