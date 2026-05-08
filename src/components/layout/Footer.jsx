export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <img
                src="https://media.base44.com/images/public/69fe61eeb38f0943e5b65ce4/6c9d1d6cd_IMG_57F797E8-10B7-47D9-B41B-21B414EFBA0B.jpg"
                alt="es-tradez"
                className="h-12 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
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