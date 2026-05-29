import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Target, ShieldCheck, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Precision", desc: "Every signal is backed by multi-timeframe analysis and strict entry criteria." },
  { icon: ShieldCheck, title: "Risk First", desc: "Capital preservation is our priority. Every trade includes a defined stop-loss." },
  { icon: Users, title: "Community", desc: "We grow together. Transparency and accountability are at the core of what we do." },
  { icon: Award, title: "Track Record", desc: "Our results are verifiable. No hypothetical trades — only live, logged performance." },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Company</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">es-tradez</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-6 text-sm leading-relaxed">
              es-tradez was founded by professional traders with a simple mission: make institutional-grade trading intelligence accessible to every serious trader.
            </p>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              We operate across Forex, Crypto, Stocks, and Futures — delivering verified signals, in-depth analysis, and a community of like-minded traders who hold each other accountable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-card border border-border rounded-xl p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-grotesk font-bold text-foreground mb-1">{v.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="font-grotesk text-2xl font-bold text-foreground mb-3">Ready to trade smarter?</h2>
            <p className="text-muted-foreground text-sm mb-6">Join traders who rely on es-tradez for consistent, data-driven results.</p>
            <a href="/#contact" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-all">
              Get Started Today
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}