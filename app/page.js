"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const baseKpis = [
  {
    title: "Capital Loss Rate",
    cluster: "LOST",
    area: "Loss",
    target: 0.095,
    direction: "lower",
    shifts: {
      Total: { jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001 },
      Morning: { jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001 },
      Afternoon: { jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001 },
      Night: { jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001 },
    },
  },
  {
    title: "Exception Rate",
    cluster: "EXCEPTION",
    area: "Receiving",
    target: 0.96,
    direction: "lower",
    shifts: {
      Total: { jan: 0.64, feb: 0.41, mar: 0.47, apr: 0.31, value: 0.31 },
      Morning: { jan: 0.61, feb: 0.44, mar: 0.67, apr: 0.35, value: 0.35 },
      Afternoon: { jan: 0.67, feb: 0.38, mar: 0.37, apr: 0.30, value: 0.30 },
      Night: { jan: 0.63, feb: 0.40, mar: 0.44, apr: 0.30, value: 0.30 },
    },
  },
  {
    title: "Empty Box",
    cluster: "EXCEPTION",
    area: "Receiving",
    target: 0.20,
    direction: "lower",
    shifts: {
      Total: { jan: 0.45, feb: 0.27, mar: 0.26, apr: 0.14, value: 0.14 },
      Morning: { jan: 0.41, feb: 0.28, mar: 0.39, apr: 0.14, value: 0.14 },
      Afternoon: { jan: 0.47, feb: 0.28, mar: 0.21, apr: 0.14, value: 0.14 },
      Night: { jan: 0.45, feb: 0.25, mar: 0.23, apr: 0.14, value: 0.14 },
    },
  },
  {
    title: "Short Picking",
    cluster: "EXCEPTION",
    area: "Picking",
    target: 0.08,
    direction: "lower",
    shifts: {
      Total: { jan: 0.05, feb: 0.03, mar: 0.06, apr: 0.05, value: 0.05 },
      Morning: { jan: 0.06, feb: 0.03, mar: 0.07, apr: 0.05, value: 0.05 },
      Afternoon: { jan: 0.05, feb: 0.03, mar: 0.06, apr: 0.05, value: 0.05 },
      Night: { jan: 0.04, feb: 0.04, mar: 0.04, apr: 0.04, value: 0.04 },
    },
  },
  {
    title: "Abnormal Sorting",
    cluster: "EXCEPTION",
    area: "Receiving",
    target: 0.20,
    direction: "lower",
    shifts: {
      Total: { jan: 0.14, feb: 0.10, mar: 0.15, apr: 0.13, value: 0.13 },
      Morning: { jan: 0.14, feb: 0.13, mar: 0.21, apr: 0.16, value: 0.16 },
      Afternoon: { jan: 0.15, feb: 0.07, mar: 0.11, apr: 0.10, value: 0.10 },
      Night: { jan: 0.14, feb: 0.11, mar: 0.16, apr: 0.12, value: 0.12 },
    },
  },
  {
    title: "Abnormal Shelving",
    cluster: "EXCEPTION",
    area: "Packing",
    target: 2.0,
    direction: "lower",
    shifts: {
      Total: { jan: 1.27, feb: 1.23, mar: 1.61, apr: 1.72, value: 1.72 },
      Morning: { jan: 1.48, feb: 1.24, mar: 1.95, apr: 2.07, value: 2.07 },
      Afternoon: { jan: 1.47, feb: 1.29, mar: 1.73, apr: 1.92, value: 1.92 },
      Night: { jan: 0.9, feb: 1.15, mar: 1.16, apr: 1.16, value: 1.16 },
    },
  },
  {
    title: "Miss Packing",
    cluster: "EXCEPTION",
    area: "Packing",
    target: 0.05,
    direction: "lower",
    shifts: {
      Total: { jan: 0.041, feb: 0.025, mar: 0.034, apr: 0.04, value: 0.04 },
      Morning: { jan: 0.05, feb: 0.03, mar: 0.04, apr: 0.03, value: 0.03 },
      Afternoon: { jan: 0.04, feb: 0.03, mar: 0.04, apr: 0.04, value: 0.04 },
      Night: { jan: 0.04, feb: 0.02, mar: 0.03, apr: 0.03, value: 0.03 },
    },
  },

  {
    title: "Miss Scan",
    cluster: "HANDOVER",
    area: "Handover",
    target: 0.15,
    direction: "lower",
    shifts: {
      Total: { jan: 0.04, feb: 0.02, mar: 0.03, apr: 0.04, value: 0.04 },
      Morning: { jan: 0.09, feb: 0.01, mar: 0.03, apr: 0.03, value: 0.03 },
      Afternoon: { jan: 0.02, feb: 0.01, mar: 0.03, apr: 0.03, value: 0.03 },
      Night: { jan: 0.03, feb: 0.03, mar: 0.04, apr: 0.05, value: 0.05 },
    },
  },
  {
    title: "Handover Failed",
    cluster: "HANDOVER",
    area: "Handover",
    target: 0.085,
    direction: "lower",
    shifts: {
      Total: { jan: 0.01, feb: 0.0, mar: 0.01, apr: 0.01, value: 0.01 },
      Morning: { jan: 0.01, feb: 0.0, mar: 0.0, apr: 0.01, value: 0.01 },
      Afternoon: { jan: 0.01, feb: 0.01, mar: 0.01, apr: 0.02, value: 0.02 },
      Night: { jan: 0.01, feb: 0.0, mar: 0.0, apr: 0.01, value: 0.01 },
    },
  },
  {
    title: "Missing Shipping",
    cluster: "HANDOVER",
    area: "Handover",
    target: 0.1,
    direction: "lower",
    shifts: {
      Total: { jan: 0.17, feb: 0.078, mar: 0.04, apr: 0.04, value: 0.04 },
      Morning: { jan: 0.04, feb: 0.06, mar: 0.05, apr: 0.03, value: 0.03 },
      Afternoon: { jan: 0.32, feb: 0.09, mar: 0.02, apr: 0.02, value: 0.02 },
      Night: { jan: 0.16, feb: 0.08, mar: 0.05, apr: 0.06, value: 0.06 },
    },
  },

  {
    title: "Overdue Consolidation Package",
    cluster: "LOST",
    area: "Shipping",
    target: 0.53,
    direction: "lower",
    shifts: {
      Total: { jan: 0.21, feb: 0.24, mar: 0.36, apr: 0.27, value: 0.27 },
      Morning: { jan: 0.23, feb: 0.27, mar: 0.46, apr: 0.26, value: 0.26 },
      Afternoon: { jan: 0.22, feb: 0.2, mar: 0.24, apr: 0.22, value: 0.22 },
      Night: { jan: 0.22, feb: 0.24, mar: 0.4, apr: 0.32, value: 0.32 },
    },
  },
  {
    title: "Package Cancellation Rate",
    cluster: "LOST",
    area: "Cancellation",
    target: 0.1,
    direction: "lower",
    shifts: {
      Total: { jan: 0.1, feb: 0.09, mar: 0.09, apr: 0.07, value: 0.07 },
      Morning: { jan: 0.09, feb: 0.09, mar: 0.1, apr: 0.07, value: 0.07 },
      Afternoon: { jan: 0.1, feb: 0.09, mar: 0.09, apr: 0.07, value: 0.07 },
      Night: { jan: 0.09, feb: 0.1, mar: 0.09, apr: 0.07, value: 0.07 },
    },
  },
  {
    title: "3P On Time Return to Seller 2D",
    cluster: "LOST",
    area: "Return",
    target: 95,
    direction: "higher",
    shifts: {
      Total: { jan: 41.6, feb: 46.2, mar: 49.3, apr: 40.0, value: 40.0 },
      Morning: { jan: 42.7, feb: 48.8, mar: 51.9, apr: 49.1, value: 49.1 },
      Afternoon: { jan: 45.7, feb: 34.1, mar: 36.1, apr: 24.5, value: 24.5 },
      Night: { jan: 19.9, feb: 49.0, mar: 60.1, apr: 36.7, value: 36.7 },
    },
  },
  {
    title: "Lost Rate",
    cluster: "LOST",
    area: "Shipping",
    target: 0.05,
    direction: "lower",
    shifts: {
      Total: { jan: 0.086, feb: 0.052, mar: 0.032, apr: 0.011, value: 0.011 },
      Morning: { jan: 0.087, feb: 0.059, mar: 0.036, apr: 0.011, value: 0.011 },
      Afternoon: { jan: 0.11, feb: 0.047, mar: 0.03, apr: 0.013, value: 0.013 },
      Night: { jan: 0.077, feb: 0.05, mar: 0.03, apr: 0.009, value: 0.009 },
    },
  },

  {
    title: "IRDR",
    cluster: "INVENTORY",
    area: "Inventory",
    target: 0.5,
    direction: "lower",
    shifts: {
      Total: { jan: 0.86, feb: 1.04, mar: 0.63, apr: 0.34, value: 0.34 },
      Morning: { jan: 0.16, feb: 0.19, mar: 0.14, apr: 0.08, value: 0.08 },
      Afternoon: { jan: 0.2, feb: 0.24, mar: 0.16, apr: 0.1, value: 0.1 },
      Night: { jan: 0.25, feb: 0.29, mar: 0.16, apr: 0.09, value: 0.09 },
    },
  },
  {
    title: "Counting Coverage Rate 1 Week",
    cluster: "INVENTORY",
    area: "Inventory",
    target: 100,
    direction: "higher",
    shifts: {
      Total: { jan: 100, feb: 100, mar: 99.82, apr: 100, value: 100 },
      Morning: { jan: 44.25, feb: 39.8, mar: 42.18, apr: 47.01, value: 47.01 },
      Afternoon: { jan: 28.21, feb: 27.21, mar: 33.08, apr: 35.02, value: 35.02 },
      Night: { jan: 27.54, feb: 32.99, mar: 24.74, apr: 17.71, value: 17.71 },
    },
  },
  {
    title: "Wrongly Count",
    cluster: "INVENTORY",
    area: "Inventory",
    target: 1,
    direction: "lower",
    shifts: {
      Total: { jan: 0.1, feb: 0.16, mar: 0.11, apr: 0.06, value: 0.06 },
      Morning: { jan: 0.11, feb: 0.19, mar: 0.07, apr: 0.04, value: 0.04 },
      Afternoon: { jan: 0.18, feb: 0.29, mar: 0.23, apr: 0.1, value: 0.1 },
      Night: { jan: 0.02, feb: 0.01, mar: 0.02, apr: 0.02, value: 0.02 },
    },
  },
  {
    title: "Counting In Time Rate 24H",
    cluster: "INVENTORY",
    area: "Inventory",
    target: 100,
    direction: "higher",
    shifts: {
      Total: { jan: 100, feb: 100, mar: 100, apr: 100, value: 100 },
      Morning: { jan: 100, feb: 100, mar: 100, apr: 100, value: 100 },
      Afternoon: { jan: 100, feb: 100, mar: 100, apr: 100, value: 100 },
      Night: { jan: 100, feb: 100, mar: 100, apr: 100, value: 100 },
    },
  },

  {
    title: "3D Tickets On Time Rate",
    cluster: "TICKET",
    area: "Tickets",
    target: 99,
    direction: "higher",
    shifts: {
      Total: { jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91 },
      Morning: { jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91 },
      Afternoon: { jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91 },
      Night: { jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91 },
    },
  },
  {
    title: "Mis-ship Rate",
    cluster: "TICKET",
    area: "Shipping",
    target: 0.15,
    direction: "lower",
    shifts: {
      Total: { jan: 0.11, feb: 0.05, mar: 0.07, apr: 0.04, value: 0.04 },
      Morning: { jan: 0.12, feb: 0.04, mar: 0.08, apr: 0.05, value: 0.05 },
      Afternoon: { jan: 0.14, feb: 0.04, mar: 0.07, apr: 0.04, value: 0.04 },
      Night: { jan: 0.09, feb: 0.05, mar: 0.06, apr: 0.04, value: 0.04 },
    },
  },
];

const clusters = ["EXCEPTION", "HANDOVER", "LOST", "INVENTORY", "TICKET"];
const shifts = ["Total", "Morning", "Afternoon", "Night"];

function buildKpisByShift(shift) {
  return baseKpis.map((item) => ({
    title: item.title,
    cluster: item.cluster,
    area: item.area,
    target: item.target,
    direction: item.direction,
    ...item.shifts[shift],
  }));
}

function isOnTrack(kpi) {
  return kpi.direction === "lower" ? kpi.value <= kpi.target : kpi.value >= kpi.target;
}

function getStatus(kpi) {
  return isOnTrack(kpi) ? "On Track" : "Attention";
}

function getColor(status) {
  return status === "On Track" ? "#22c55e" : "#f59e0b";
}

function fmt(value) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: value < 1 ? 3 : 2,
    maximumFractionDigits: value < 1 ? 3 : 2,
  })}%`;
}

function deltaValue(item) {
  return item.direction === "lower" ? item.jan - item.apr : item.apr - item.jan;
}

export default function Dashboard() {
  const [selectedShift, setSelectedShift] = useState("Total");
  const [selectedKpi, setSelectedKpi] = useState(null);

  const kpis = buildKpisByShift(selectedShift);
  const onTrack = kpis.filter((k) => getStatus(k) === "On Track").length;
  const attention = kpis.length - onTrack;

  const attentionByShift = kpis
    .filter((kpi) => getStatus(kpi) === "Attention")
    .map((kpi) => ({
      kpi: kpi.title,
      target: kpi.target,
      current: kpi.value,
      jan: kpi.jan,
      apr: kpi.apr,
      direction: kpi.direction,
    }));

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", padding: "34px", fontFamily: "Arial" }}>
      <header style={{ marginBottom: "28px" }}>
        <p style={{ color: "#fb923c", fontWeight: "bold", letterSpacing: "1px" }}>
          SHEIN WHA · EXCEPTION HANDLING & INVENTORY
        </p>

        <h1 style={{ fontSize: "44px", marginBottom: "8px" }}>
          Executive Scorecard Dashboard
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "18px" }}>
          Monthly performance view · January to April · Target vs Actual · {selectedShift}
        </p>
      </header>

      <section style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {shifts.map((shift) => (
          <button
            key={shift}
            onClick={() => setSelectedShift(shift)}
            style={{
              background: selectedShift === shift ? "#fb923c" : "#0f172a",
              color: selectedShift === shift ? "#020617" : "#cbd5e1",
              border: selectedShift === shift ? "1px solid #fb923c" : "1px solid #1e293b",
              borderRadius: "999px",
              padding: "10px 18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {shift}
          </button>
        ))}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 180px)", gap: "14px", marginBottom: "30px" }}>
        <TopCard title="Total KPIs" value={kpis.length} color="#38bdf8" />
        <TopCard title="On Track" value={onTrack} color="#22c55e" />
        <TopCard title="Attention" value={attention} color="#f59e0b" />
      </section>

      {clusters.map((cluster) => {
        const clusterKpis = kpis.filter((item) => item.cluster === cluster);
        const clusterAttention = clusterKpis.filter((item) => getStatus(item) === "Attention").length;

        return (
          <section key={cluster} style={clusterSection}>
            <div style={clusterHeader}>
              <div>
                <h2 style={clusterTitle}>{cluster}</h2>
                <p style={clusterSubtitle}>
                  {clusterKpis.length} indicators · {clusterAttention} attention · {selectedShift}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))", gap: "18px" }}>
              {clusterKpis.map((item) => (
                <KpiCard key={item.title} item={item} onClick={() => setSelectedKpi(item)} />
              ))}
            </div>
          </section>
        );
      })}

      <section style={{ ...panel, marginBottom: "30px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Attention Indicators · {selectedShift} Deep Dive
        </h2>

        <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
          Indicadores fora da meta na visão selecionada.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                <th style={th}>KPI</th>
                <th style={th}>Target</th>
                <th style={th}>Jan</th>
                <th style={th}>Apr</th>
                <th style={th}>Current</th>
                <th style={th}>Main Insight</th>
              </tr>
            </thead>

            <tbody>
              {attentionByShift.map((row) => (
                <tr key={row.kpi} style={{ borderTop: "1px solid #1e293b" }}>
                  <td style={td}>{row.kpi}</td>
                  <td style={td}>{fmt(row.target)}</td>
                  <td style={td}>{fmt(row.jan)}</td>
                  <td style={td}>{fmt(row.apr)}</td>
                  <td style={td}>
                    <ShiftPill value={row.current} target={row.target} direction={row.direction} />
                  </td>
                  <td style={{ ...td, color: "#cbd5e1" }}>
                    {row.direction === "higher"
                      ? "Abaixo da meta. Necessário plano de recuperação do SLA."
                      : "Acima da meta. Necessário RCA por processo e owner."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedKpi && (
        <div
          onClick={() => setSelectedKpi(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(900px, 100%)",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "24px",
              padding: "30px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "start", marginBottom: "24px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "28px" }}>
                  {selectedKpi.title} · Monthly Evolution
                </h2>
                <p style={{ color: "#94a3b8", marginTop: "8px" }}>
                  {selectedShift} · Target vs Actual
                </p>
              </div>

              <button
                onClick={() => setSelectedKpi(null)}
                style={{
                  background: "#020617",
                  color: "#cbd5e1",
                  border: "1px solid #334155",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={[
                  { month: "Jan", value: selectedKpi.jan, target: selectedKpi.target },
                  { month: "Fev", value: selectedKpi.feb, target: selectedKpi.target },
                  { month: "Mar", value: selectedKpi.mar, target: selectedKpi.target },
                  { month: "Abr", value: selectedKpi.apr, target: selectedKpi.target },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="value" name="Actual" stroke="#38bdf8" strokeWidth={4} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </main>
  );
}

function TopCard({ title, value, color }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "14px 16px", minHeight: "84px" }}>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "6px" }}>{title}</p>
      <h2 style={{ fontSize: "28px", color, margin: 0 }}>{value}</h2>
    </div>
  );
}

function KpiCard({ item, onClick }) {
  const status = getStatus(item);
  const color = getColor(status);
  const delta = deltaValue(item);
  const deltaGood = delta >= 0;

  return (
    <div
      onClick={onClick}
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "22px",
        padding: "22px",
        cursor: "pointer",
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>{item.title}</p>

      <h2 style={{ fontSize: "32px", margin: "0 0 8px 0" }}>
        {fmt(item.value)}
      </h2>

      <p style={{ color: "#64748b", marginBottom: "12px" }}>
        Target: {fmt(item.target)}
      </p>

      <span style={{ border: `1px solid ${color}`, color, padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "bold" }}>
        {status}
      </span>

      <p style={{ color: "#cbd5e1", marginTop: "18px", fontSize: "13px" }}>
        Jan → Abr: {fmt(item.jan)} → {fmt(item.apr)}
      </p>

      <p style={{ color: deltaGood ? "#22c55e" : "#ef4444", fontSize: "13px", marginTop: "6px" }}>
        Delta: {deltaGood ? "+" : ""}
        {fmt(delta)}
      </p>
    </div>
  );
}

function ShiftPill({ value, target, direction }) {
  const ok = direction === "lower" ? value <= target : value >= target;
  const color = ok ? "#22c55e" : "#f59e0b";

  return (
    <span style={{ display: "inline-block", minWidth: "86px", textAlign: "center", border: `1px solid ${color}`, color, borderRadius: "999px", padding: "7px 10px", fontWeight: "bold", fontSize: "12px" }}>
      {fmt(value)}
    </span>
  );
}

const clusterSection = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "26px",
  padding: "24px",
  marginBottom: "30px",
};

const clusterHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const clusterTitle = {
  fontSize: "26px",
  margin: 0,
  color: "#e5e7eb",
  letterSpacing: "1px",
};

const clusterSubtitle = {
  color: "#94a3b8",
  marginTop: "6px",
};

const panel = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "8px",
  padding: "22px",
};

const th = {
  padding: "14px",
  borderBottom: "1px solid #334155",
};

const td = {
  padding: "14px",
  color: "#cbd5e1",
};
