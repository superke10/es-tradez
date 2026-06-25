import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BarChart2, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useMarketQuotes, formatPrice, formatChange } from "@/hooks/useMarketQuotes";

const stocks = [
  { name: "Apple", symbol: "AAPL", finnhub: "AAPL", sector: "Technology" },
  { name: "Tesla", symbol: "TSLA", finnhub: "TSLA", sector: "EV / Auto" },
  { name: "NVIDIA", symbol: "NVDA", finnhub: "NVDA", sector: "Semiconductors" },
  { name: "Amazon", symbol: "AMZN", finnhub: "AMZN", sector: "E-Commerce" },
  { name: "Microsoft", symbol: "MSFT", finnhub: "MSFT", sector: "Technology" },
  { name: "S&P 500", symbol: "SPX", finnhub: "SPY", sector: "Index" },
];

export default function Stocks() {
  const { data: quotes } = useMarketQuotes(stocks.map((s) => s.finnhub));
  const quoteMap = new Map((quotes || []).map((q) => [q.symbol, q]));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Markets</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Stocks <span className="text-primary">&amp; Equities</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              From blue-chip giants to high-growth tech — we provide actionable equity signals with fundamental and technical confluence, targeting both short and medium-term moves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {[
              { icon: BarChart2, label: "NYSE & NASDAQ", desc: "US equities and major indices" },
              { icon: TrendingUp, label: "Swing & Day Trades", desc: "Both timeframes covered" },
              { icon: Award, label: "Earnings Plays", desc: "Pre/post earnings setups" },
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
            {stocks.map((s, i) => {
              const q = quoteMap.get(s.finnhub);
              return (
                <motion.div key={s.symbol} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                  className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-grotesk font-bold text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.symbol}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-foreground">{q && q.price ? formatPrice(q.price) : "—"}</span>
                      {q && q.price && (
                        <span className={`text-xs font-semibold ${q.percentChange >= 0 ? "text-green" : "text-red"}`}>
                          {formatChange(q.percentChange)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded font-semibold">{s.sector}</span>
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