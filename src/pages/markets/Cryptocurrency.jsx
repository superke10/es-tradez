import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMarketQuotes, formatPrice, formatChange } from "@/hooks/useMarketQuotes";

const coins = [
  { name: "Bitcoin", symbol: "BTC/USD", finnhub: "BINANCE:BTCUSDT", type: "Store of Value" },
  { name: "Ethereum", symbol: "ETH/USD", finnhub: "BINANCE:ETHUSDT", type: "Smart Contracts" },
  { name: "Solana", symbol: "SOL/USD", finnhub: "BINANCE:SOLUSDT", type: "High-Speed Chain" },
  { name: "BNB", symbol: "BNB/USD", finnhub: "BINANCE:BNBUSDT", type: "Exchange Token" },
  { name: "Ripple", symbol: "XRP/USD", finnhub: "BINANCE:XRPUSDT", type: "Payments" },
  { name: "Cardano", symbol: "ADA/USD", finnhub: "BINANCE:ADAUSDT", type: "DeFi Platform" },
];

export default function Cryptocurrency() {
  const { data: quotes } = useMarketQuotes(coins.map((c) => c.finnhub));
  const quoteMap = new Map((quotes || []).map((q) => [q.symbol, q]));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Markets</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Crypto <span className="text-primary">Trading</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              Volatile, fast-moving, and full of opportunity. Our crypto signals are built for the 24/7 digital asset market — precision entries, disciplined exits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Zap, label: "24/7 Markets", desc: "Never closes — always opportunity" },
              { icon: TrendingUp, label: "High Volatility", desc: "Bigger swings, bigger returns" },
              { icon: ShieldCheck, label: "Risk Managed", desc: "Strict SL on every signal" },
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
            <h2 className="font-grotesk font-bold text-foreground text-lg">Covered Assets</h2>
            <span className="flex items-center gap-1.5 text-xs text-green font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Live
            </span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {coins.map((c, i) => {
              const q = quoteMap.get(c.finnhub);
              return (
                <motion.div key={c.symbol} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                  className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-grotesk font-bold text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.symbol}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-foreground">{q && q.price ? formatPrice(q.price) : "—"}</span>
                      {q && q.price && (
                        <span className={`text-xs font-semibold ${q.percentChange >= 0 ? "text-green" : "text-red"}`}>
                          {formatChange(q.percentChange)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded font-semibold">{c.type}</span>
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