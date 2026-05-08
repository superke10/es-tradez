import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react";

const signals = [
  {
    pair: "EUR/USD",
    type: "BUY",
    entry: "1.0812",
    tp1: "1.0865",
    tp2: "1.0910",
    sl: "1.0780",
    rr: "2.1:1",
    status: "Active",
    time: "2h ago",
    pnl: "+47 pips",
    up: true,
  },
  {
    pair: "BTC/USD",
    type: "BUY",
    entry: "66,800",
    tp1: "68,500",
    tp2: "71,000",
    sl: "65,200",
    rr: "2.6:1",
    status: "Closed ✓",
    time: "1d ago",
    pnl: "+$1,700",
    up: true,
  },
  {
    pair: "NAS 100",
    type: "SELL",
    entry: "18,850",
    tp1: "18,640",
    tp2: "18,430",
    sl: "18,960",
    rr: "1.9:1",
    status: "Closed ✓",
    time: "2d ago",
    pnl: "+210 pts",
    up: false,
  },
  {
    pair: "GBP/USD",
    type: "BUY",
    entry: "1.2598",
    tp1: "1.2660",
    tp2: "1.2720",
    sl: "1.2555",
    rr: "2.3:1",
    status: "Active",
    time: "4h ago",
    pnl: "+32 pips",
    up: true,
  },
  {
    pair: "GOLD",
    type: "BUY",
    entry: "2,298",
    tp1: "2,340",
    tp2: "2,380",
    sl: "2,268",
    rr: "2.8:1",
    status: "Closed ✓",
    time: "3d ago",
    pnl: "+$42",
    up: true,
  },
  {
    pair: "ETH/USD",
    type: "SELL",
    entry: "3,380",
    tp1: "3,280",
    tp2: "3,180",
    sl: "3,440",
    rr: "1.7:1",
    status: "Closed ✓",
    time: "4d ago",
    pnl: "+$100",
    up: false,
  },
];

export default function SignalsSection() {
  return (
    <section id="signals" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Recent Trades</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live Trading <span className="text-primary">Signals</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real signals. Real results. Every trade is logged with full transparency — entry, targets, stop loss, and outcome.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((sig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-foreground text-sm">{sig.pair}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${sig.up ? "bg-green/10 text-green" : "bg-red/10 text-red"}`}>
                    {sig.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {sig.status.includes("Active") ? (
                    <span className="flex items-center gap-1 text-xs text-green">
                      <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3" />
                      Closed
                    </span>
                  )}
                </div>
              </div>

              {/* Price grid */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                <div>
                  <div className="text-muted-foreground mb-0.5">Entry</div>
                  <div className="font-mono font-semibold text-foreground">{sig.entry}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-0.5">TP1</div>
                  <div className="font-mono font-semibold text-green">{sig.tp1}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-0.5">TP2</div>
                  <div className="font-mono font-semibold text-green">{sig.tp2}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-0.5">Stop Loss</div>
                  <div className="font-mono font-semibold text-red">{sig.sl}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-0.5">R:R</div>
                  <div className="font-mono font-semibold text-foreground">{sig.rr}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-0.5">P&L</div>
                  <div className={`font-mono font-bold ${sig.up ? "text-green" : "text-red"}`}>{sig.pnl}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {sig.time}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary text-sm font-semibold rounded hover:bg-primary/10 transition-all"
          >
            Get Full Signal Access
          </a>
        </div>
      </div>
    </section>
  );
}