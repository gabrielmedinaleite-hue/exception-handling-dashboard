"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================
   DATA
========================= */

const monthlyData = [
  { month: "Jan", value: 0.64, target: 0.96 },
  { month: "Fev", value: 0.41, target: 0.96 },
  { month: "Mar", value: 0.47, target: 0.96 },
  { month: "Abr", value: 0.31, target: 0.96 },
];

const shiftData = [
  { shift: "T1", exception: 0.28, irdr: 0.32, lost: 0.01 },
  { shift: "T2", exception: 0.35, irdr: 0.45, lost: 0.02 },
  { shift: "T3", exception: 0.42, irdr: 0.61, lost: 0.03 },
];

const healthData = [
  { name: "On Track", value: 6 },
  { name: "Attention", value: 3 },
  { name: "Critical", value: 2 },
];

/* =========================
   HELPERS
========================= */

function fmt(v) {
  return `${v.toFixed(2)}%`;
}

/* =========================
   PAGE
========================= */

export default function Dashboard() {
  return (
    <main
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>
        Executive Scorecard
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
        Monthly + Shift Performance View
      </p>

      {/* ===================== */}
      {/* MONTHLY TREND */}
      {/* ===================== */}

      <Card title="Exception Rate · Monthly">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyData}>
            <CartesianGrid stroke="#1e293b" />

            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar dataKey="value" fill="rgba(59,130,246,0.4)">
              <LabelList dataKey="value" formatter={fmt} />
            </Bar>

            <Line
              dataKey="target"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* ===================== */}
      {/* SHIFT ANALYSIS */}
      {/* ===================== */}

      <Card title="Shift Performance Comparison">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={shiftData}>
            <CartesianGrid stroke="#1e293b" />
            <XAxis dataKey="shift" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Bar dataKey="exception" fill="rgba(59,130,246,0.4)">
              <LabelList dataKey="exception" formatter={fmt} />
            </Bar>

            <Bar dataKey="irdr" fill="rgba(139,92,246,0.4)">
              <LabelList dataKey="irdr" formatter={fmt} />
            </Bar>

            <Bar dataKey="lost" fill="rgba(244,63,94,0.4)">
              <LabelList dataKey="lost" formatter={fmt} />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* ===================== */}
      {/* KPI HEALTH */}
      {/* ===================== */}

      <Card title="KPI Health Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={healthData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
            >
              <Cell fill="rgba(34,197,94,0.5)" />
              <Cell fill="rgba(245,158,11,0.5)" />
              <Cell fill="rgba(239,68,68,0.5)" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* ===================== */}
      {/* HEATMAP (MELHOR QUE RANKING) */}
      {/* ===================== */}

      <Card title="Shift Heatmap (KPI vs Performance)">
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Shift</th>
              <th>Exception</th>
              <th>IRDR</th>
              <th>Lost</th>
            </tr>
          </thead>

          <tbody>
            {shiftData.map((row) => (
              <tr key={row.shift}>
                <td>{row.shift}</td>

                <td style={heatColor(row.exception)}>
                  {fmt(row.exception)}
                </td>

                <td style={heatColor(row.irdr)}>
                  {fmt(row.irdr)}
                </td>

                <td style={heatColor(row.lost)}>
                  {fmt(row.lost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}

/* =========================
   COMPONENTS
========================= */

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>
      {children}
    </div>
  );
}

function heatColor(value) {
  let color = "rgba(34,197,94,0.2)";

  if (value > 0.4) color = "rgba(239,68,68,0.3)";
  else if (value > 0.2) color = "rgba(245,158,11,0.3)";

  return {
    background: color,
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
  };
}
