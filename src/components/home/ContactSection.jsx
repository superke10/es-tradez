import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Mail, Instagram, Twitter } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: form.email,
      subject: `New enquiry from ${form.name} — es-tradez`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    });
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Get In Touch</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to <span className="text-primary">Trade Smarter?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join the es-tradez community and start receiving professional-grade signals across all major markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="font-grotesk text-xl font-bold text-foreground mb-5">What You Get</h3>
              <ul className="space-y-3 text-sm text-muted-foreground mb-10">
                {[
                  "Real-time trading signals across 4 markets",
                  "Full trade breakdown: entry, TP, SL, R:R",
                  "Live chart analysis and trade rationale",
                  "Risk management guidance",
                  "Access to the private trading community",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Connect</h4>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: MessageSquare, label: "Telegram" },
                  { icon: Mail, label: "Email" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-9 h-9 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {sent ? (
              <div className="h-full bg-card border border-primary/20 rounded-lg flex flex-col items-center justify-center gap-4 p-10 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-grotesk font-bold text-foreground text-lg">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">We'll be in touch with you shortly.</p>
                <button onClick={() => setSent(false)} className="text-xs text-primary underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us about your trading goals..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}