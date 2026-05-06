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

/* =========================
   KPI DATA COMPLETA
========================= */

const kpis = [
  { title: "Capital Loss Rate", area: "Loss", target: 0.095, jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001, unit: "%", direction: "lower" },
  { title: "Operation Difference Rate", area: "Operation", target: 0.27, jan: 0.06, feb: 0.05, mar: 0.05, apr: 0.06, value: 0.06, unit: "%", direction: "lower" },
  { title: "Exception Rate", area: "Receiving", target: 0.96, jan: 0.64, feb: 0.41, mar: 0.47, apr: 0.31, value: 0.31, unit: "%", direction: "lower" },
  { title: "Empty Box", area: "Receiving", target: 0.20, jan: 0.45, feb: 0.27, mar: 0.26, apr: 0.14, value: 0.14, unit: "%", direction: "lower" },
  { title: "Short Picking", area: "Picking", target: 0.08, jan: 0.05, feb: 0.03, mar: 0.06, apr: 0.05, value: 0.05, unit: "%", direction: "lower" },
  { title: "Abnormal Sorting", area: "Receiving", target: 0.20, jan: 0.14, feb: 0.10, mar: 0.15, apr: 0.13, value: 0.13, unit: "%", direction: "lower" },
  { title: "Abnormal Shelving", area: "Packing", target: 2.00, jan: 1.27, feb: 1.23, mar: 1.61, apr: 1.72, value: 1.72, unit: "%", direction: "lower" },
  { title: "Miss Scan", area: "Handover", target: 0.15, jan: 0.04, feb: 0.02, mar: 0.03, apr: 0.04, value: 0.04, unit: "%", direction: "lower" },
  { title: "Handover Failed", area: "Handover", target: 0.085, jan: 0.01, feb: 0.00, mar: 0.01, apr: 0.01, value: 0.01, unit: "%", direction: "lower" },
  { title: "Missing Shipping", area: "Handover", target: 0.10, jan: 0.17, feb: 0.078, mar: 0.04, apr: 0.04, value: 0.04, unit: "%", direction: "lower" },
  { title: "3D Tickets On Time Rate", area: "Tickets", target: 99.00, jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91, unit: "%", direction: "higher" },
  { title: "Mis-ship Rate", area: "Shipping", target: 0.15, jan: 0.11, feb: 0.05, mar: 0.07, apr: 0.04, value: 0.04, unit: "%", direction: "lower" },
  { title: "Miss Packing", area: "Packing", target: 0.05, jan: 0.041, feb: 0.025, mar: 0.034, apr: 0.04, value: 0.04, unit: "%", direction: "lower" },
  { title: "Lost Rate", area: "Shipping", target: 0.05, jan: 0.086, feb: 0.052, mar: 0.032, apr: 0.011, value: 0.011, unit: "%", direction: "lower" },
  { title: "Package Cancellation Rate", area: "Cancellation", target: 0.10, jan: 0.10, feb: 0.09, mar: 0.09, apr: 0.07, value: 0.07, unit: "%", direction: "lower" },
  { title: "On Time Delivery Rate 15H", area: "Delivery", target: 95.00, jan: 0, feb: 0, mar: 0, apr: 78.74, value: 78.74, unit: "%", direction: "higher" },
  { title: "On Time Delivery Rate 1D", area: "Delivery", target: 95.00, jan: 0, feb: 0, mar: 0, apr: 94.91, value: 94.91, unit: "%", direction: "higher" },
  { title: "On Time Delivery Rate 2D", area: "Delivery", target: 95.00, jan: 0, feb: 0, mar: 0, apr: 97.41, value: 97.41, unit: "%", direction: "higher" },
  { title: "Overdue Consolidation Package", area: "Shipping", target: 0.53, jan: 0.21, feb: 0.24, mar: 0.36, apr: 0.27, value: 0.27, unit: "%", direction: "lower" },
  { title: "3P On Time Return to Seller 2D", area: "Return", target: 95.00, jan: 41.6, feb: 46.2, mar: 49.3, apr: 40.0, value: 40.0, unit: "%", direction: "higher" },
  { title: "Counting In Time Rate 24H", area: "Inventory", target: 100.00, jan: 100, feb: 100, mar: 100, apr: 100, value: 100, unit: "%", direction: "higher" },
  { title: "Counting Coverage Rate 1 Week", area: "Inventory", target: 100.00, jan: 100, feb: 100, mar: 99.82, apr: 100, value: 100, unit: "%", direction: "higher" },
  { title: "IRDR", area: "Inventory", target: 0.50, jan: 0.86, feb: 1.04, mar: 0.63, apr: 0.34, value: 0.34, unit: "%", direction: "lower" },
  { title: "Não Rastreáveis", area: "Inventory", target: 0.13, jan: 0.24, feb: 0.32, mar: 0.17, apr: 0.07, value: 0.07, unit: "%", direction: "lower" },
  { title: "Wrongly Count", area: "Inventory", target: 1.00, jan: 0.10, feb: 0.16, mar: 0.11, apr: 0.06, value: 0.06, unit: "%", direction: "lower" },
];

/* =========================
   LOGIC
========================= */

function isOnTrack(kpi) {
  return kpi.direction === "lower" ? kpi.value <= kpi.target : kpi.value >= kpi.target;
}

function getStatus(kpi) {
  if (isOnTrack(kpi)) return "On Track";
  return "Attention";
}

function getColor(status) {
  if (status === "On Track") return "#22c55e";
  return "#f59e0b";
}

function fmt(value) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: value < 1 ? 3 : 2,
    maximumFractionDigits: value < 1 ? 3 : 2,
  })}%`;
}

/* =========================
   MAIN
========================= */

export default function Dashboard() {
  const onTrack = kpis.filter((k) => getStatus(k) === "On Track").length;
  const attention = kpis.length - onTrack;

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", padding: "40px", fontFamily: "Arial" }}>

      <header style={{ marginBottom: "40px" }}>
        <p style={{ color: "#fb923c", fontWeight: "bold" }}>SHEIN WHA · EXCEPTION HANDLING & INVENTORY</p>
        <h1 style={{ fontSize: "44px" }}>Executive Scorecard Dashboard</h1>
      </header>

      {/* TOP CARDS */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px", marginBottom: "40px" }}>
        <TopCard title="Total KPIs" value={kpis.length} color="#38bdf8" />
        <TopCard title="On Track" value={onTrack} color="#22c55e" />
        <TopCard title="Attention" value={attention} color="#f59e0b" />
      </section>

      {/* KPI CARDS */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" }}>
        {kpis.map((item) => (
          <KpiCard key={item.title} item={item} />
        ))}
      </section>

    </main>
  );
}

/* =========================
   COMPONENTS
========================= */

function TopCard({ title, value, color }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "24px", padding: "24px" }}>
      <p style={{ color: "#94a3b8" }}>{title}</p>
      <h2 style={{ fontSize: "38px", color }}>{value}</h2>
    </div>
  );
}

function KpiCard({ item }) {
  const status = getStatus(item);
  const color = getColor(status);

  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "24px", padding: "24px" }}>
      <p style={{ color: "#94a3b8" }}>{item.title}</p>
      <h2 style={{ fontSize: "34px" }}>{fmt(item.value)}</h2>
      <p style={{ color: "#64748b" }}>Target: {fmt(item.target)}</p>

      <span style={{ border: `1px solid ${color}`, color, padding: "6px 12px", borderRadius: "999px" }}>
        {status}
      </span>
    </div>
  );
}
