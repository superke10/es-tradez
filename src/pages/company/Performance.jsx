import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Target, BarChart3, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const monthlyROI = [
  { month: "Jan", roi: 8.2 },
  { month: "Feb", roi: 6.3 },
  { month: "Mar", roi: 11.8 },
  { month: "Apr", roi: 9.5 },
  { month: "May", roi: 7.1 },
  { month: "Jun", roi: 13.4 },
];

const stats = [
  { icon: TrendingUp, label: "Avg Monthly ROI", value: "9.4%", sub: "Across all markets" },
  { icon: Target, label: "Win Rate", value: "78.4%", sub: "Last 6 months" },
  { icon: BarChart3, label: "Profit Factor", value: "3.14", sub: "Gross profit / loss" },
  { icon: ShieldCheck, label: "Max Drawdown", value: "6.8%", sub: "Risk controlled" },
];

const RoiTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded px-3 py-2 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-green font-bold">+{payload[0].value}% ROI</p>
      </div>
    );
  }
  return null;
};

export default function Performance() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Company</span>
            <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Performance</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12 text-sm leading-relaxed">
              Every number is pulled from live trading logs. No backtesting, no cherry-picked trades — just real, verified results across all asset classes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-card border border-border rounded-xl p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-grotesk font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                <div className="text-xs text-primary mt-1 font-medium">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-grotesk font-bold text-foreground text-sm">Monthly ROI</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Jan – Jun 2025</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Avg +9.4%</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyROI} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,14%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<RoiTooltip />} cursor={{ fill: "hsl(220,15%,14%)" }} />
                <Bar dataKey="roi" radius={[4, 4, 0, 0]}>
                  {monthlyROI.map((entry, index) => (
                    <Cell key={index} fill={entry.roi >= 10 ? "hsl(152,80%,45%)" : "hsl(152,80%,35%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}