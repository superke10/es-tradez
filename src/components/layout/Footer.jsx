export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                  <path d="M22 8 C22 8 26 8 26 13 C26 18 18 18 18 23 C18 28 22 28 22 28" stroke="hsl(152 80% 45%)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.35" />
                  <path d="M10 8 C10 8 6 8 6 13 C6 18 14 18 14 23 C14 28 10 28 10 28" stroke="hsl(152 80% 45%)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.35" />
                  <path d="M16 26 L16 10" stroke="hsl(152 80% 45%)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 16 L16 8 L22 16" stroke="hsl(152 80% 45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <polygon points="16,7 23,17 9,17" fill="hsl(152 80% 45%)" opacity="0.9" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-grotesk font-bold text-base tracking-tight">
                  <span className="text-foreground">es-</span><span className="text-primary">tradez</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-0.5">Trade · Invest · Grow</span>
              </div>
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