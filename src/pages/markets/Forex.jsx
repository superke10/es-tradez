import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Globe, Clock, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMarketQuotes, formatPrice, formatChange } from "@/hooks/useMarketQuotes";

const pairs = [
  { pair: "EUR/USD", finnhub: "OANDA:EUR_USD", spread: "0.8 pips", session: "London/NY" },
  { pair: "GBP/USD", finnhub: "OANDA:GBP_USD", spread: "1.0 pips", session: "London" },
  { pair: "USD/JPY", finnhub: "OANDA:USD_JPY", spread: "0.7 pips", session: "Tokyo/NY" },
  { pair: "AUD/USD", finnhub: "OANDA:AUD_USD", spread: "0.9 pips", session: "Sydney/Tokyo" },
  { pair: "USD/CAD", finnhub: "OANDA:USD_CAD", spread: "1.1 pips", session: "NY" },
  { pair: "EUR/GBP", finnhub: "OANDA:EUR_GBP", spread: "1.2 pips", session: "London" },
];

export default function Forex() {
  const { data: quotes } = useMarketQuotes(pairs.map((p) => p.finnhub));
  const quoteMap = new Map((quotes || []).map((q) => [q.symbol, q]));

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

          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-grotesk font-bold text-foreground text-lg">Covered Pairs</h2>
            <span className="flex items-center gap-1.5 text-xs text-green font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Live
            </span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {pairs.map((p, i) => {
              const q = quoteMap.get(p.finnhub);
              return (
                <motion.div key={p.pair} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                  className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-grotesk font-bold text-foreground">{p.pair}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.session}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-foreground">{q && q.price ? formatPrice(q.price, 4) : "—"}</span>
                      {q && q.price && (
                        <span className={`text-xs font-semibold ${q.percentChange >= 0 ? "text-green" : "text-red"}`}>
                          {formatChange(q.percentChange)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">{p.spread}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}