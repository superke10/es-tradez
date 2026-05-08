import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const growthData = [
  { month: "Jan", return: 8.2 },
  { month: "Feb", return: 14.5 },
  { month: "Mar", return: 11.8 },
  { month: "Apr", return: 20.3 },
  { month: "May", return: 17.1 },
  { month: "Jun", return: 25.6 },
  { month: "Jul", return: 22.4 },
  { month: "Aug", return: 30.1 },
  { month: "Sep", return: 28.7 },
  { month: "Oct", return: 38.2 },
  { month: "Nov", return: 42.5 },
  { month: "Dec", return: 51.3 },
];

const monthlyData = [
  { month: "Jan", win: 8, loss: 2 },
  { month: "Feb", win: 11, loss: 3 },
  { month: "Mar", win: 9, loss: 2 },
  { month: "Apr", win: 13, loss: 3 },
  { month: "May", win: 10, loss: 2 },
  { month: "Jun", win: 15, loss: 4 },
];

const metrics = [
  { label: "Annual Return", value: "+51.3%", sub: "Year-to-date 2025" },
  { label: "Win Rate", value: "78.4%", sub: "Last 6 months" },
  { label: "Avg R:R Ratio", value: "2.3:1", sub: "Risk to reward" },
  { label: "Max Drawdown", value: "6.8%", sub: "Controlled risk" },
  { label: "Profit Factor", value: "3.14", sub: "Gross profit / loss" },
  { label: "Total Signals", value: "2,400+", sub: "All-time" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded px-3 py-2 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-green font-bold">+{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Track Record</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-foreground mb-4">
            Verified <span className="text-primary">Performance</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every result is logged, every signal is tracked. Consistent growth driven by disciplined risk management.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-card border border-border rounded-lg p-4 text-center"
            >
              <div className="text-xl font-grotesk font-bold text-primary mb-1">{m.value}</div>
              <div className="text-xs font-semibold text-foreground mb-0.5">{m.label}</div>
              <div className="text-xs text-muted-foreground">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-grotesk font-bold text-foreground">Cumulative Returns 2025</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Portfolio growth across all markets</p>
            </div>
            <span className="text-2xl font-grotesk font-bold text-green">+51.3%</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 80%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152, 80%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 14%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `+${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="return"
                stroke="hsl(152, 80%, 45%)"
                strokeWidth={2.5}
                fill="url(#greenGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}