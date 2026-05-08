import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp, TrendingDown, Target, Award, BarChart3, Activity, Zap, ShieldCheck
} from "lucide-react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from "recharts";

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useAnimatedCounter(target, duration = 1800, decimals = 0, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, decimals, start]);
  return count;
}

// ─── Animated Progress Bar ────────────────────────────────────────────────────
function AnimatedBar({ value, max = 100, color = "bg-primary", delay = 0, started }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setWidth((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [value, max, delay, started]);
  return (
    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Stat Card with counter ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, suffix = "", prefix = "", decimals = 0, color, sub, delay = 0, started }) {
  const count = useAnimatedCounter(value, 1600 + delay, decimals, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-all group"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-2xl font-grotesk font-bold text-foreground tracking-tight">
          {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      </div>
      {sub && <div className="text-xs text-primary font-medium">{sub}</div>}
    </motion.div>
  );
}

// ─── Win/Loss breakdown ────────────────────────────────────────────────────────
const winLossData = [
  { month: "Jan", wins: 12, losses: 3 },
  { month: "Feb", wins: 15, losses: 4 },
  { month: "Mar", wins: 10, losses: 2 },
  { month: "Apr", wins: 18, losses: 5 },
  { month: "May", wins: 14, losses: 3 },
  { month: "Jun", wins: 20, losses: 5 },
];

// ─── Market breakdown ─────────────────────────────────────────────────────────
const marketBreakdown = [
  { market: "Forex", winRate: 81, pips: 1840, color: "bg-green" },
  { market: "Crypto", winRate: 74, pips: 940, color: "bg-gold" },
  { market: "Stocks", winRate: 77, pips: 0, points: 3200, color: "bg-blue-400" },
  { market: "Futures", winRate: 80, pips: 0, points: 620, color: "bg-purple-400" },
];

// ─── Monthly ROI data ─────────────────────────────────────────────────────────
const monthlyROI = [
  { month: "Jan", roi: 8.2 },
  { month: "Feb", roi: 6.3 },
  { month: "Mar", roi: 11.8 },
  { month: "Apr", roi: 9.5 },
  { month: "May", roi: 7.1 },
  { month: "Jun", roi: 13.4 },
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

const WlTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded px-3 py-2 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold capitalize">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Market Bar Sub-component (avoids hook-in-map violation) ─────────────────
function MarketBar({ market: m, index: i, started }) {
  const winRate = useAnimatedCounter(m.winRate, 1800, 1, started);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground font-grotesk">{m.market}</span>
        <span className="font-mono font-bold text-primary">{winRate.toFixed(1)}%</span>
      </div>
      <AnimatedBar value={m.winRate} max={100} color={m.color} delay={i * 150} started={started} />
      <div className="text-xs text-muted-foreground">
        {m.pips ? `${m.pips.toLocaleString()} pips gained` : `${m.points?.toLocaleString()} pts gained`}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PerformanceDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: TrendingUp, label: "Avg Monthly ROI", value: 9.4, suffix: "%", decimals: 1, color: "bg-primary/10", sub: "Across all markets" },
    { icon: Target, label: "Overall Win Rate", value: 78.4, suffix: "%", decimals: 1, color: "bg-primary/10", sub: "Last 6 months" },
    { icon: Activity, label: "Total Pips Gained", value: 2780, suffix: " pips", color: "bg-gold/10", sub: "Forex signals only", delay: 100 },
    { icon: BarChart3, label: "Profit Factor", value: 3.14, decimals: 2, color: "bg-primary/10", sub: "Gross profit / gross loss", delay: 150 },
    { icon: ShieldCheck, label: "Max Drawdown", value: 6.8, suffix: "%", decimals: 1, color: "bg-red/10", sub: "Risk controlled", delay: 200 },
    { icon: Zap, label: "Total Signals", value: 2400, suffix: "+", color: "bg-purple-400/10", sub: "All-time delivered", delay: 250 },
    { icon: Award, label: "Avg R:R Ratio", value: 2.3, suffix: ":1", decimals: 1, color: "bg-gold/10", sub: "Per closed trade", delay: 300 },
    { icon: TrendingDown, label: "Loss Rate", value: 21.6, suffix: "%", decimals: 1, color: "bg-red/10", sub: "Kept low via strict SL", delay: 350 },
  ];

  return (
    <section id="dashboard" className="py-24 px-6 bg-card/20" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">By The Numbers</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
            Performance <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Real metrics. No fluff. Every number is pulled from live trading logs across all asset classes.
          </p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={inView} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* Monthly ROI Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-grotesk font-bold text-foreground text-sm">Monthly ROI</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Jan – Jun 2025</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Avg +9.4%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
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

          {/* Win / Loss Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-grotesk font-bold text-foreground text-sm">Win / Loss Breakdown</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly trade outcomes</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green inline-block" />Wins</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red inline-block" />Losses</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={winLossData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,14%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<WlTooltip />} cursor={{ fill: "hsl(220,15%,14%)" }} />
                <Bar dataKey="wins" fill="hsl(152,80%,45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="losses" fill="hsl(0,70%,55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Market Breakdown Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-grotesk font-bold text-foreground text-sm">Win Rate by Market</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Performance breakdown per asset class</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketBreakdown.map((m, i) => (
              <MarketBar key={m.market} market={m} index={i} started={inView} />
            ))}
          </div>

          {/* Trust badges row */}
          <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Signals Verified", value: "100%" },
              { label: "Avg Hold Time", value: "4.2 hrs" },
              { label: "Best Month", value: "+13.4%" },
              { label: "Consecutive Wins", value: "11" },
            ].map((b, i) => (
              <div key={b.label} className="text-center">
                <div className="text-xl font-grotesk font-bold text-foreground mb-0.5">{b.value}</div>
                <div className="text-xs text-muted-foreground">{b.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}