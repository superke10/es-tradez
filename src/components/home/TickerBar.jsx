import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketQuotes, formatPrice, formatChange } from "@/hooks/useMarketQuotes";

const tickerSymbols = [
  { symbol: "EUR/USD", finnhub: "OANDA:EUR_USD" },
  { symbol: "BTC/USD", finnhub: "BINANCE:BTCUSDT" },
  { symbol: "S&P 500", finnhub: "SPY" },
  { symbol: "GBP/USD", finnhub: "OANDA:GBP_USD" },
  { symbol: "ETH/USD", finnhub: "BINANCE:ETHUSDT" },
  { symbol: "GOLD", finnhub: "GLD" },
  { symbol: "USD/JPY", finnhub: "OANDA:USD_JPY" },
  { symbol: "NAS 100", finnhub: "QQQ" },
  { symbol: "OIL (WTI)", finnhub: "USO" },
  { symbol: "DOW", finnhub: "DIA" },
];

export default function TickerBar() {
  const { data: quotes } = useMarketQuotes(tickerSymbols.map((t) => t.finnhub));
  const quoteMap = new Map((quotes || []).map((q) => [q.symbol, q]));

  const items = tickerSymbols.map((t) => {
    const q = quoteMap.get(t.finnhub);
    if (!q || !q.price) return { symbol: t.symbol, price: "—", change: "—", up: true };
    const pct = q.percentChange || 0;
    return {
      symbol: t.symbol,
      price: formatPrice(q.price),
      change: formatChange(pct),
      up: pct >= 0,
    };
  });

  const doubled = [...items, ...items];

  return (
    <div className="bg-card border-b border-border overflow-hidden">
      <div className="flex ticker-track whitespace-nowrap py-2.5">
        {doubled.map((t, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-6 border-r border-border/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.symbol}</span>
            <span className="text-xs font-bold text-foreground">{t.price}</span>
            {t.change !== "—" && (
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${t.up ? "text-green" : "text-red"}`}>
                {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {t.change}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}