import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-grotesk font-bold text-base">
                es-<span className="text-primary">tradez</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional trading across Forex, Crypto, Stocks, and Futures — powered by data-driven precision.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Markets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Forex", "Cryptocurrency", "Stocks & Equities", "Futures & Options"].map((m) => (
                <li key={m} className="hover:text-primary transition-colors cursor-pointer">{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["About Us", "Trading Signals", "Performance", "Contact"].map((item) => (
                <li key={item} className="hover:text-primary transition-colors cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 es-tradez. All rights reserved.</p>
          <p className="text-center">Trading involves significant risk. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </footer>
  );
}