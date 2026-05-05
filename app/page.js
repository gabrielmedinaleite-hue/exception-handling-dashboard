"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";

const kpis = [
  {
    title: "Exception Rate",
    area: "Receiving",
    target: 0.96,
    jan: 0.64,
    feb: 0.41,
    mar: 0.47,
    apr: 0.31,
    value: 0.31,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Empty Box",
    area: "Receiving",
    target: 0.20,
    jan: 0.45,
    feb: 0.27,
    mar: 0.26,
    apr: 0.14,
    value: 0.14,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Short Picking",
    area: "Picking",
    target: 0.08,
    jan: 0.05,
    feb: 0.03,
    mar: 0.06,
    apr: 0.05,
    value: 0.05,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Abnormal Sorting",
    area: "Receiving",
    target: 0.20,
    jan: 0.14,
    feb: 0.10,
    mar: 0.15,
    apr: 0.13,
    value: 0.13,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Abnormal Shelving",
    area: "Packing",
    target: 2.00,
    jan: 1.27,
    feb: 1.23,
    mar: 1.61,
    apr: 1.72,
    value: 1.72,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Mis-ship Rate",
    area: "Shipping",
    target: 0.15,
    jan: 0.11,
    feb: 0.05,
    mar: 0.07,
    apr: 0.04,
    value: 0.04,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Miss Packing",
    area: "Packing",
    target: 0.05,
    jan: 0.041,
    feb: 0.025,
    mar: 0.034,
    apr: 0.04,
    value: 0.04,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Lost Rate",
    area: "Shipping",
    target: 0.05,
    jan: 0.086,
    feb: 0.052,
    mar: 0.032,
    apr: 0.011,
    value: 0.011,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Return to Seller",
    area: "Return",
    target: 95,
    jan: 41.6,
    feb: 46.2,
    mar: 49.3,
    apr: 40.0,
    value: 40.0,
    unit: "%",
    direction: "higher",
  },
  {
    title: "IRDR",
    area: "Inventory",
    target: 0.50,
    jan: 0.86,
    feb: 1.04,
    mar: 0.63,
    apr: 0.34,
    value: 0.34,
    unit: "%",
    direction: "lower",
  },
  {
    title: "Wrongly Count",
    area: "Inventory",
    target: 1.00,
    jan: 0.10,
    feb: 0.16,
    mar: 0.11,
    apr: 0.06,
    value: 0.06,
    unit: "%",
    direction: "lower",
  },
];

function isOnTrack(kpi) {
  return kpi.direction === "lower" ? kpi.value <= kpi.target : kpi.value >= kpi.target;
}

function getStatus(kpi) {
  if (isOnTrack(kpi)) return "On Track";

  const gap =
    kpi.direction === "lower"
      ? ((kpi.value - kpi.target) / kpi.target) * 100
      : ((kpi.target - kpi.value) / kpi.target) * 100;

  if (gap > 30) return "Critical";
  return "Attention";
}

function getColor(status) {
  if (status === "On Track") return "#22c55e";
  if (status === "Attention") return "#f59e0b";
  return "#ef4444";
}

function fmt(value) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: value < 1 ? 3 : 2,
    maximumFractionDigits: value < 1 ? 3 : 2,
  })}%`;
}

const monthlyOverview = [
  {
    month: "Jan",
    exception: 0.64,
    exceptionTarget: 0.96,
    irdr: 0.86,
    irdrTarget: 0.5,
    lost: 0.086,
    lostTarget: 0.05,
  },
  {
    month: "Fev",
    exception: 0.41,
    exceptionTarget: 0.96,
    irdr: 1.04,
    irdrTarget: 0.5,
    lost: 0.052,
    lostTarget: 0.05,
  },
  {
    month: "Mar",
    exception: 0.47,
    exceptionTarget: 0.96,
    irdr: 0.63,
    irdrTarget: 0.5,
    lost: 0.032,
    lostTarget: 0.05,
  },
  {
    month: "Abr",
    exception: 0.31,
    exceptionTarget: 0.96,
    irdr: 0.34,
    irdrTarget: 0.5,
    lost: 0.011,
    lostTarget: 0.05,
  },
];

const statusData = [
  {
    name: "On Track",
    value: kpis.filter((kpi) => getStatus(kpi) === "On Track").length,
  },
  {
    name: "Attention",
    value: kpis.filter((kpi) => getStatus(kpi) === "Attention").length,
  },
  {
    name: "Critical",
    value: kpis.filter((kpi) => getStatus(kpi) === "Critical").length,
  },
];

const riskRanking = kpis
  .map((kpi) => {
    const gap =
      kpi.direction === "lower"
        ? ((kpi.value - kpi.target) / kpi.target) * 100
        : ((kpi.target - kpi.value) / kpi.target) * 100;

    return {
      name: kpi.title,
      gap: Math.max(0, Number(gap.toFixed(1))),
    };
  })
  .filter((item) => item.gap > 0)
  .sort((a, b) => b.gap - a.gap);

export default function Dashboard() {
  const onTrack = statusData[0].value;
  const attention = statusData[1].value;
  const critical = statusData[2].value;

  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <header style={{ marginBottom: "40px" }}>
        <p style={{ color: "#fb923c", fontWeight: "bold", letterSpacing: "1px" }}>
          SHEIN WHA · EXCEPTION HANDLING & INVENTORY
        </p>

        <h1 style={{ fontSize: "44px", marginBottom: "8px" }}>
          Executive Scorecard Dashboard
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "18px" }}>
          Monthly performance view · January to April · Target vs Actual
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <TopCard title="Total KPIs" value={kpis.length} color="#38bdf8" />
        <TopCard title="On Track" value={onTrack} color="#22c55e" />
        <TopCard title="Attention" value={attention} color="#f59e0b" />
        <TopCard title="Critical" value={critical} color="#ef4444" />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {kpis.slice(0, 8).map((item) => (
          <KpiCard key={item.title} item={item} />
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <ChartCard title="Exception Rate · Monthly Trend vs Target">
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={monthlyOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="exception" name="Exception Rate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Line dataKey="exceptionTarget" name="Target" stroke="#22c55e" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="KPI Health Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={115}
                paddingAngle={5}
              >
                <Cell fill="#22c55e" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <ChartCard title="IRDR · Monthly Trend vs Target">
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={monthlyOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="irdr" name="IRDR" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Line dataKey="irdrTarget" name="Target" stroke="#22c55e" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Lost Rate · Monthly Trend vs Target">
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={monthlyOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="lost" name="Lost Rate" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Line dataKey="lostTarget" name="Target" stroke="#22c55e" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <ChartCard title="Risk Ranking · Gap vs Target">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={riskRanking} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={130} />
              <Tooltip />
              <Bar dataKey="gap" name="Gap %" fill="#f97316" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Return to Seller · Gauge">
          <Gauge value={40} target={95} label="RTS 2D SLA" />
        </ChartCard>
      </section>

      <section
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "24px",
          padding: "30px",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>
          Monthly Executive Table
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                <th style={th}>Area</th>
                <th style={th}>KPI</th>
                <th style={th}>Target</th>
                <th style={th}>Jan</th>
                <th style={th}>Fev</th>
                <th style={th}>Mar</th>
                <th style={th}>Abr</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {kpis.map((kpi) => {
                const status = getStatus(kpi);
                const color = getColor(status);

                return (
                  <tr key={kpi.title} style={{ borderTop: "1px solid #1e293b" }}>
                    <td style={td}>{kpi.area}</td>
                    <td style={td}>{kpi.title}</td>
                    <td style={td}>{fmt(kpi.target)}</td>
                    <td style={td}>{fmt(kpi.jan)}</td>
                    <td style={td}>{fmt(kpi.feb)}</td>
                    <td style={td}>{fmt(kpi.mar)}</td>
                    <td style={td}>{fmt(kpi.apr)}</td>
                    <td style={td}>
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: "999px",
                          border: `1px solid ${color}`,
                          color,
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "24px",
          padding: "30px",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
          Executive Insights
        </h2>

        <ul style={{ color: "#cbd5e1", lineHeight: "2", fontSize: "16px" }}>
          <li>Exception Rate shows strong improvement from January to April and remains below target.</li>
          <li>IRDR improved significantly in April, indicating better inventory accuracy control.</li>
          <li>Lost Rate shows the strongest improvement and is now below target.</li>
          <li>Return to Seller remains the biggest executive concern and should be monitored daily.</li>
          <li>Risk Ranking helps prioritize where leadership should focus weekly RCA routines.</li>
        </ul>
      </section>
    </main>
  );
}

function TopCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "24px",
        padding: "24px",
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: "12px" }}>{title}</p>
      <h2 style={{ fontSize: "38px", color }}>{value}</h2>
    </div>
  );
}

function KpiCard({ item }) {
  const status = getStatus(item);
  const color = getColor(status);

  const improvement =
    item.direction === "lower"
      ? item.jan - item.apr
      : item.apr - item.jan;

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "24px",
        padding: "24px",
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>{item.title}</p>

      <h2 style={{ fontSize: "34px", marginBottom: "8px" }}>{fmt(item.value)}</h2>

      <p style={{ color: "#64748b", marginBottom: "16px" }}>
        Target: {fmt(item.target)}
      </p>

      <span
        style={{
          padding: "8px 12px",
          borderRadius: "999px",
          border: `1px solid ${color}`,
          color,
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {status}
      </span>

      <p style={{ color: "#cbd5e1", marginTop: "18px", fontSize: "13px" }}>
        Jan → Abr: {fmt(item.jan)} → {fmt(item.apr)}
      </p>

      <p style={{ color: improvement >= 0 ? "#22c55e" : "#ef4444", fontSize: "13px" }}>
        Delta: {improvement >= 0 ? "+" : ""}
        {fmt(improvement)}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "24px",
        padding: "30px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>{title}</h2>
      {children}
    </div>
  );
}

function Gauge({ value, target, label }) {
  const percent = Math.min(100, (value / target) * 100);

  return (
    <div style={{ height: "320px", position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={[{ name: label, value: percent }]}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="value" fill="#ef4444" background />
        </RadialBarChart>
      </ResponsiveContainer>

      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "42px", marginBottom: "8px" }}>{fmt(value)}</h2>
        <p style={{ color: "#94a3b8" }}>Target: {fmt(target)}</p>
      </div>
    </div>
  );
}

const th = {
  padding: "14px",
  borderBottom: "1px solid #334155",
};

const td = {
  padding: "14px",
  color: "#cbd5e1",
};
