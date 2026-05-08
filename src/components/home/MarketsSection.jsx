import { motion } from "framer-motion";
import { DollarSign, Bitcoin, BarChart2, TrendingUp } from "lucide-react";

const markets = [
  {
    icon: DollarSign,
    title: "Forex",
    tag: "Currency Pairs",
    desc: "Major, minor, and exotic currency pairs traded with precision timing and technical expertise. EUR/USD, GBP/USD, USD/JPY and more.",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/20",
  },
  {
    icon: Bitcoin,
    title: "Crypto",
    tag: "Digital Assets",
    desc: "Navigate the volatile crypto markets with confidence. Bitcoin, Ethereum, and altcoin signals built for high-growth opportunities.",
    pairs: ["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD"],
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: BarChart2,
    title: "Stocks",
    tag: "Equities",
    desc: "Blue-chip and growth equities across US and global markets. S&P 500 components, tech stocks, and sector-specific plays.",
    pairs: ["AAPL", "NVDA", "TSLA", "MSFT"],
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: TrendingUp,
    title: "Futures",
    tag: "Derivatives",
    desc: "ES (S&P 500 Futures), NQ (Nasdaq), crude oil, and gold futures trading with institutional-level entry and exit strategies.",
    pairs: ["ES1!", "NQ1!", "GC1!", "CL1!"],
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
];

export default function MarketsSection() {
  return (
    <section id="markets" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">What We Trade</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
            Multi-Market <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Diversified across four major asset classes — giving you exposure to the world's most liquid and profitable markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market, i) => (
            <motion.div
              key={market.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-card border ${market.border} rounded-lg p-6 hover:border-primary/40 transition-all group`}
            >
              <div className={`w-10 h-10 ${market.bg} rounded-lg flex items-center justify-center mb-5`}>
                <market.icon className={`w-5 h-5 ${market.color}`} />
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{market.tag}</div>
              <h3 className="font-grotesk text-xl font-bold text-foreground mb-3">{market.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{market.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {market.pairs.map((p) => (
                  <span key={p} className={`text-xs px-2 py-0.5 ${market.bg} ${market.color} rounded font-mono font-medium`}>{p}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}