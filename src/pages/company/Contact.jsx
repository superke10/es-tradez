import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: form.email,
      subject: `New enquiry from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Company</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
              Have a question about membership, signals, or our performance? Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl p-10 text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-grotesk text-xl font-bold text-foreground mb-2">Message Sent!</h2>
              <p className="text-muted-foreground text-sm">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-8 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="How can we help you?" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-all disabled:opacity-60">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}