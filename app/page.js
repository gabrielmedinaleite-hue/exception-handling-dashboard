"use client";

const kpis = [
  { title: "Capital Loss Rate", cluster: "LOST", area: "Loss", target: 0.095, jan: 0.108, feb: 0.003, mar: 0.001, apr: 0.001, value: 0.001, direction: "lower" },
  { title: "Operation Difference Rate", cluster: "EXCEPTION", area: "Operation", target: 0.27, jan: 0.06, feb: 0.05, mar: 0.05, apr: 0.06, value: 0.06, direction: "lower" },
  { title: "Exception Rate", cluster: "EXCEPTION", area: "Receiving", target: 0.96, jan: 0.64, feb: 0.41, mar: 0.47, apr: 0.31, value: 0.31, direction: "lower" },
  { title: "Empty Box", cluster: "EXCEPTION", area: "Receiving", target: 0.20, jan: 0.45, feb: 0.27, mar: 0.26, apr: 0.14, value: 0.14, direction: "lower" },
  { title: "Short Picking", cluster: "EXCEPTION", area: "Picking", target: 0.08, jan: 0.05, feb: 0.03, mar: 0.06, apr: 0.05, value: 0.05, direction: "lower" },
  { title: "Abnormal Sorting", cluster: "EXCEPTION", area: "Receiving", target: 0.20, jan: 0.14, feb: 0.10, mar: 0.15, apr: 0.13, value: 0.13, direction: "lower" },
  { title: "Abnormal Shelving", cluster: "EXCEPTION", area: "Packing", target: 2.00, jan: 1.27, feb: 1.23, mar: 1.61, apr: 1.72, value: 1.72, direction: "lower" },
  { title: "Miss Packing", cluster: "EXCEPTION", area: "Packing", target: 0.05, jan: 0.041, feb: 0.025, mar: 0.034, apr: 0.04, value: 0.04, direction: "lower" },

  { title: "Miss Scan", cluster: "HANDOVER", area: "Handover", target: 0.15, jan: 0.04, feb: 0.02, mar: 0.03, apr: 0.04, value: 0.04, direction: "lower" },
  { title: "Handover Failed", cluster: "HANDOVER", area: "Handover", target: 0.085, jan: 0.01, feb: 0.00, mar: 0.01, apr: 0.01, value: 0.01, direction: "lower" },
  { title: "Missing Shipping", cluster: "HANDOVER", area: "Handover", target: 0.10, jan: 0.17, feb: 0.078, mar: 0.04, apr: 0.04, value: 0.04, direction: "lower" },

  { title: "Overdue Consolidation Package", cluster: "LOST", area: "Shipping", target: 0.53, jan: 0.21, feb: 0.24, mar: 0.36, apr: 0.27, value: 0.27, direction: "lower" },
  { title: "Package Cancellation Rate", cluster: "LOST", area: "Cancellation", target: 0.10, jan: 0.10, feb: 0.09, mar: 0.09, apr: 0.07, value: 0.07, direction: "lower" },
  { title: "3P On Time Return to Seller 2D", cluster: "LOST", area: "Return", target: 95.00, jan: 41.6, feb: 46.2, mar: 49.3, apr: 40.0, value: 40.0, direction: "higher" },
  { title: "Lost Rate", cluster: "LOST", area: "Shipping", target: 0.05, jan: 0.086, feb: 0.052, mar: 0.032, apr: 0.011, value: 0.011, direction: "lower" },

  { title: "IRDR", cluster: "INVENTORY", area: "Inventory", target: 0.50, jan: 0.86, feb: 1.04, mar: 0.63, apr: 0.34, value: 0.34, direction: "lower" },
  { title: "Counting Coverage Rate 1 Week", cluster: "INVENTORY", area: "Inventory", target: 100.00, jan: 100, feb: 100, mar: 99.82, apr: 100, value: 100, direction: "higher" },
  { title: "Wrongly Count", cluster: "INVENTORY", area: "Inventory", target: 1.00, jan: 0.10, feb: 0.16, mar: 0.11, apr: 0.06, value: 0.06, direction: "lower" },
  { title: "Counting In Time Rate 24H", cluster: "INVENTORY", area: "Inventory", target: 100.00, jan: 100, feb: 100, mar: 100, apr: 100, value: 100, direction: "higher" },

  { title: "3D Tickets On Time Rate", cluster: "TICKET", area: "Tickets", target: 99.00, jan: 99.71, feb: 99.94, mar: 99.84, apr: 99.91, value: 99.91, direction: "higher" },
  { title: "Mis-ship Rate", cluster: "TICKET", area: "Shipping", target: 0.15, jan: 0.11, feb: 0.05, mar: 0.07, apr: 0.04, value: 0.04, direction: "lower" },
];

const clusters = ["EXCEPTION", "HANDOVER", "LOST", "INVENTORY", "TICKET"];

const attentionByShift = [
  { kpi: "3P On Time Return to Seller 2D", target: 95, direction: "higher", morning: 49.1, afternoon: 24.5, night: 36.7, comment: "Principal risco operacional. Todos os turnos abaixo da meta, com maior gap no Afternoon." },
  { kpi: "On Time Delivery Rate 15H", target: 95, direction: "higher", morning: 78.74, afternoon: 78.74, night: 78.74, comment: "Indicador ainda em fase de estabilização, abaixo da meta de 95%." },
  { kpi: "On Time Delivery Rate 1D", target: 95, direction: "higher", morning: 94.91, afternoon: 94.91, night: 94.91, comment: "Muito próximo da meta. Pequena variação operacional pode virar On Track." },
];

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
  const onTrack = kpis.filter((k) => getStatus(k) === "On Track").length;
  const attention = kpis.length - onTrack;

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
          Monthly performance view · January to April · Target vs Actual
        </p>
      </header>

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
                  {clusterKpis.length} indicators · {clusterAttention} attention
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))", gap: "18px" }}>
              {clusterKpis.map((item) => (
                <KpiCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        );
      })}

      <section style={{ ...panel, marginBottom: "30px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
          Attention Indicators · Shift Deep Dive
        </h2>

        <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
          Análise detalhada dos indicadores fora da meta, separados por turno.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                <th style={th}>KPI</th>
                <th style={th}>Target</th>
                <th style={th}>Morning</th>
                <th style={th}>Afternoon</th>
                <th style={th}>Night</th>
                <th style={th}>Main Insight</th>
              </tr>
            </thead>

            <tbody>
              {attentionByShift.map((row) => (
                <tr key={row.kpi} style={{ borderTop: "1px solid #1e293b" }}>
                  <td style={td}>{row.kpi}</td>
                  <td style={td}>{fmt(row.target)}</td>
                  <td style={td}>
                    <ShiftPill value={row.morning} target={row.target} direction={row.direction} />
                  </td>
                  <td style={td}>
                    <ShiftPill value={row.afternoon} target={row.target} direction={row.direction} />
                  </td>
                  <td style={td}>
                    <ShiftPill value={row.night} target={row.target} direction={row.direction} />
                  </td>
                  <td style={{ ...td, color: "#cbd5e1" }}>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function TopCard({ title, value, color }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "14px 16px", minHeight: "84px" }}>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "6px" }}>
        {title}
      </p>
      <h2 style={{ fontSize: "28px", color, margin: 0 }}>{value}</h2>
    </div>
  );
}

function KpiCard({ item }) {
  const status = getStatus(item);
  const color = getColor(status);
  const delta = deltaValue(item);
  const deltaGood = delta >= 0;

  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "22px", padding: "22px" }}>
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
