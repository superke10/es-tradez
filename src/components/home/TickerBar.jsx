import { TrendingUp, TrendingDown } from "lucide-react";

const tickers = [
  { symbol: "EUR/USD", price: "1.0845", change: "+0.12%", up: true },
  { symbol: "BTC/USD", price: "68,420", change: "+2.34%", up: true },
  { symbol: "S&P 500", price: "5,312", change: "-0.08%", up: false },
  { symbol: "GBP/USD", price: "1.2640", change: "+0.21%", up: true },
  { symbol: "ETH/USD", price: "3,241", change: "+1.87%", up: true },
  { symbol: "GOLD", price: "2,334", change: "+0.45%", up: true },
  { symbol: "USD/JPY", price: "154.32", change: "-0.18%", up: false },
  { symbol: "NAS 100", price: "18,720", change: "+0.63%", up: true },
  { symbol: "OIL (WTI)", price: "78.45", change: "-0.92%", up: false },
  { symbol: "DOW", price: "39,150", change: "+0.11%", up: true },
];

export default function TickerBar() {
  const doubled = [...tickers, ...tickers];

  return (
    <div className="bg-card border-b border-border overflow-hidden mt-16">
      <div className="flex ticker-track whitespace-nowrap py-2.5">
        {doubled.map((t, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-6 border-r border-border/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.symbol}</span>
            <span className="text-xs font-bold text-foreground">{t.price}</span>
            <span className={`text-xs font-semibold flex items-center gap-0.5 ${t.up ? "text-green" : "text-red"}`}>
              {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}