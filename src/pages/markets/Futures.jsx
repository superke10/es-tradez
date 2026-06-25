import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Activity, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMarketQuotes, formatPrice, formatChange } from "@/hooks/useMarketQuotes";

const instruments = [
  { name: "Gold Futures", symbol: "XAUUSD", finnhub: "GLD", type: "Commodity" },
  { name: "Crude Oil (WTI)", symbol: "CL", finnhub: "USO", type: "Energy" },
  { name: "E-mini S&P 500", symbol: "ES", finnhub: "SPY", type: "Index Future" },
  { name: "Nasdaq Futures", symbol: "NQ", finnhub: "QQQ", type: "Index Future" },
  { name: "Natural Gas", symbol: "NG", finnhub: "UNG", type: "Energy" },
  { name: "Silver Futures", symbol: "XAGUSD", finnhub: "SLV", type: "Commodity" },
];

export default function Futures() {
  const { data: quotes } = useMarketQuotes(instruments.map((item) => item.finnhub));
  const quoteMap = new Map((quotes || []).map((q) => [q.symbol, q]));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Markets</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Futures <span className="text-primary">&amp; Options</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              Derivatives markets demand precision. Our futures signals leverage macro analysis, COT data, and technical setups to identify high-probability entries on commodities and indices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Activity, label: "Commodities", desc: "Gold, Oil, Silver, Gas and more" },
              { icon: TrendingUp, label: "Index Futures", desc: "ES, NQ and major indices" },
              { icon: ShieldCheck, label: "Macro-Driven", desc: "COT + technical confluence" },
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
            <h2 className="font-grotesk font-bold text-foreground text-lg">Covered Instruments</h2>
            <span className="flex items-center gap-1.5 text-xs text-green font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Live
            </span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {instruments.map((item, i) => {
              const q = quoteMap.get(item.finnhub);
              return (
                <motion.div key={item.symbol} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                  className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-grotesk font-bold text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.symbol}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-foreground">{q && q.price ? formatPrice(q.price) : "—"}</span>
                      {q && q.price && (
                        <span className={`text-xs font-semibold ${q.percentChange >= 0 ? "text-green" : "text-red"}`}>
                          {formatChange(q.percentChange)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs bg-purple-400/10 text-purple-400 px-2 py-1 rounded font-semibold">{item.type}</span>
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