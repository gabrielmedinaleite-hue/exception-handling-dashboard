"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useState } from "react";

const pastelBlue = "rgba(96,165,250,0.75)";
const pastelGreen = "rgba(74,222,128,0.75)";
const pastelOrange = "rgba(251,191,36,0.75)";
const pastelRed = "rgba(248,113,113,0.85)";
const pastelPurple = "rgba(192,132,252,0.75)";

const monthOptions = ["Overall", "Jan", "Feb", "Mar", "Apr"];
const shiftOptions = ["Total", "Morning", "Afternoon", "Night"];

const weeklyData = [
  { week: "W14", value: 0.34 },
  { week: "W15", value: 0.31 },
  { week: "W16", value: 0.32 },
  { week: "W17", value: 0.28 },
  { week: "W18", value: 0.31 },
];

const inventoryProductivity = [
  { checker: "Tatiana", productivity: 98 },
  { checker: "Laisla", productivity: 96 },
  { checker: "Klebio", productivity: 95 },
  { checker: "William", productivity: 93 },
  { checker: "Jason", productivity: 91 },
  { checker: "Luis", productivity: 89 },
];

const indicators = {
  EXCEPTION: [
    {
      title: "Exception Rate",
      target: 0.96,
      overall: 0.45,
      jan: 0.64,
      feb: 0.41,
      mar: 0.47,
      apr: 0.31,
      trend: [0.64, 0.41, 0.47, 0.31],
    },
    {
      title: "Empty Box",
      target: 0.2,
      overall: 0.27,
      jan: 0.45,
      feb: 0.27,
      mar: 0.26,
      apr: 0.14,
      trend: [0.45, 0.27, 0.26, 0.14],
    },
    {
      title: "Short Picking",
      target: 0.08,
      overall: 0.05,
      jan: 0.05,
      feb: 0.03,
      mar: 0.06,
      apr: 0.05,
      trend: [0.05, 0.03, 0.06, 0.05],
    },
    {
      title: "Abnormal Sorting",
      target: 0.2,
      overall: 0.13,
      jan: 0.14,
      feb: 0.1,
      mar: 0.15,
      apr: 0.13,
      trend: [0.14, 0.1, 0.15, 0.13],
    },
    {
      title: "Abnormal Shelving",
      target: 2,
      overall: 1.46,
      jan: 1.27,
      feb: 1.23,
      mar: 1.61,
      apr: 1.72,
      trend: [1.27, 1.23, 1.61, 1.72],
    },
    {
      title: "Miss Packing",
      target: 0.05,
      overall: 0.03,
      jan: 0.041,
      feb: 0.025,
      mar: 0.034,
      apr: 0.04,
      trend: [0.041, 0.025, 0.034, 0.04],
    },
  ],

  HANDOVER: [
    {
      title: "Miss Scan",
      target: 0.15,
      overall: 0.03,
      jan: 0.04,
      feb: 0.02,
      mar: 0.03,
      apr: 0.03,
      trend: [0.04, 0.02, 0.03, 0.03],
    },
    {
      title: "Handover Failed",
      target: 0.085,
      overall: 0.01,
      jan: 0.01,
      feb: 0,
      mar: 0.01,
      apr: 0.01,
      trend: [0.01, 0, 0.01, 0.01],
    },
    {
      title: "Missing Shipping",
      target: 0.15,
      overall: 0.09,
      jan: 0.17,
      feb: 0.078,
      mar: 0.04,
      apr: 0.05,
      trend: [0.17, 0.078, 0.04, 0.05],
    },
  ],

  LOST: [
    {
      title: "Overdue Consolidation",
      target: 0.53,
      overall: 0.28,
      jan: 0.21,
      feb: 0.24,
      mar: 0.36,
      apr: 0.27,
      trend: [0.21, 0.24, 0.36, 0.27],
    },
    {
      title: "Cancellation Rate",
      target: 0.1,
      overall: 0.09,
      jan: 0.1,
      feb: 0.09,
      mar: 0.09,
      apr: 0.07,
      trend: [0.1, 0.09, 0.09, 0.07],
    },
    {
      title: "Return to Seller",
      target: 95,
      overall: 44,
      jan: 41.6,
      feb: 46.2,
      mar: 49.3,
      apr: 40,
      trend: [41.6, 46.2, 49.3, 40],
    },
    {
      title: "Lost",
      target: 0.05,
      overall: 0.04,
      jan: 0.086,
      feb: 0.052,
      mar: 0.032,
      apr: 0.01,
      trend: [0.086, 0.052, 0.032, 0.01],
    },
  ],

  INVENTORY: [
    {
      title: "IRDR",
      target: 0.5,
      overall: 0.69,
      jan: 0.86,
      feb: 1.04,
      mar: 0.63,
      apr: 0.34,
      trend: [0.86, 1.04, 0.63, 0.34],
    },
    {
      title: "Counting Coverage",
      target: 100,
      overall: 100,
      jan: 100,
      feb: 100,
      mar: 99.82,
      apr: 100,
      trend: [100, 100, 99.82, 100],
    },
    {
      title: "Wrongly Count",
      target: 1,
      overall: 0.11,
      jan: 0.1,
      feb: 0.16,
      mar: 0.11,
      apr: 0.06,
      trend: [0.1, 0.16, 0.11, 0.06],
    },
  ],

  TICKET: [
    {
      title: "3D Ticket SLA",
      target: 99,
      overall: 99.83,
      jan: 99.71,
      feb: 99.94,
      mar: 99.84,
      apr: 99.91,
      trend: [99.71, 99.94, 99.84, 99.91],
    },
    {
      title: "Mis-ship Rate",
      target: 0.15,
      overall: 0.07,
      jan: 0.11,
      feb: 0.05,
      mar: 0.07,
      apr: 0.04,
      trend: [0.11, 0.05, 0.07, 0.04],
    },
  ],

  SLA: [
    {
      title: "OTD 15H",
      target: 95,
      overall: 78.69,
      jan: 78.69,
      feb: 64.42,
      mar: 82.06,
      apr: 91.16,
      trend: [78.69, 64.42, 82.06, 91.16],
    },
    {
      title: "OTD 1D",
      target: 95,
      overall: 94.89,
      jan: 94.89,
      feb: 91.71,
      mar: 90.24,
      apr: 94.78,
      trend: [94.89, 91.71, 90.24, 94.78],
    },
    {
      title: "OTD 2D",
      target: 95,
      overall: 97.4,
      jan: 97.4,
      feb: 96.9,
      mar: 94.89,
      apr: 95.13,
      trend: [97.4, 96.9, 94.89, 95.13],
    },
  ],
};

export default function Page() {
  const [selectedShift, setSelectedShift] = useState("Total");
  const [selectedMonth, setSelectedMonth] = useState("Overall");
  const [selectedView, setSelectedView] = useState("scorecard");
  const [language, setLanguage] = useState("EN");
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const getValue = (item) => {
    if (selectedMonth === "Jan") return item.jan;
    if (selectedMonth === "Feb") return item.feb;
    if (selectedMonth === "Mar") return item.mar;
    if (selectedMonth === "Apr") return item.apr;
    return item.overall;
      const allItems = Object.values(indicators).flat();
  const totalKpis = allItems.length;

  const onTrack = allItems.filter((item) => getValue(item) <= item.target || item.title.includes("OTD") || item.title.includes("SLA") || item.title.includes("Coverage")).length;
  const attention = totalKpis - onTrack;

  const t = {
    title: language === "EN" ? "Executive Scorecard Dashboard" : "Dashboard Executivo de Indicadores",
    subtitle: language === "EN" ? "Monthly and weekly performance view" : "Visão mensal e semanal de performance",
    productivity: language === "EN" ? "Cycle Productivity" : "Produtividade Ciclo",
    scorecard: language === "EN" ? "Scorecard" : "Scorecard",
    totalKpis: language === "EN" ? "Total KPIs" : "Total de KPIs",
    onTrack: language === "EN" ? "On Track" : "No alvo",
    attention: language === "EN" ? "Attention" : "Atenção",
    weekly: language === "EN" ? "Weekly Process Analysis" : "Análise Semanal do Processo",
    insights: language === "EN" ? "Executive Insights" : "Insights Executivos",
  };

  return (
    <main
      style={{
        display: "flex",
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <aside
        style={{
          width: "230px",
          background: "#020617",
          borderRight: "1px solid #1e293b",
          padding: "28px 20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h2 style={{ color: "#fb923c", fontSize: "18px", marginBottom: "28px" }}>
          EH Control Tower
        </h2>

        <button
          onClick={() => setSelectedView("scorecard")}
          style={sideButton(selectedView === "scorecard")}
        >
          📊 {t.scorecard}
        </button>

        <button
          onClick={() => setSelectedView("productivity")}
          style={sideButton(selectedView === "productivity")}
        >
          📦 {t.productivity}
        </button>

        <div style={{ marginTop: "30px" }}>
          <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "10px" }}>
            Language
          </p>

          <div style={{ display: "flex", gap: "8px" }}>
            {["EN", "PT"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  background: language === lang ? "#fb923c" : "#0f172a",
                  color: language === lang ? "#020617" : "#cbd5e1",
                  border: language === lang ? "1px solid #fb923c" : "1px solid #1e293b",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section style={{ flex: 1, padding: "34px" }}>
        <header style={{ marginBottom: "28px" }}>
          <p style={{ color: "#fb923c", fontWeight: "bold", letterSpacing: "1px" }}>
            SHEIN WHA · EXCEPTION HANDLING & INVENTORY
          </p>

          <h1 style={{ fontSize: "44px", marginBottom: "8px" }}>
            {selectedView === "scorecard" ? t.title : t.productivity}
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "18px" }}>
            {t.subtitle} · {selectedShift} · {selectedMonth}
          </p>
        </header>

        <div
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {shiftOptions.map((shift) => (
              <button
                key={shift}
                onClick={() => setSelectedShift(shift)}
                style={filterButton(selectedShift === shift, "#fb923c")}
              >
                {shift}
              </button>
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              background: "#334155",
            }}
          />

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {monthOptions.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                style={filterButton(selectedMonth === month, "#38bdf8")}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {selectedView === "scorecard" ? (
          <>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 180px)",
                gap: "14px",
                marginBottom: "30px",
              }}
            >
              <TopCard title={t.totalKpis} value={totalKpis} color="#38bdf8" />
              <TopCard title={t.onTrack} value={onTrack} color="#22c55e" />
              <TopCard title={t.attention} value={attention} color="#f59e0b" />
            </section>

            {Object.entries(indicators).map(([cluster, items]) => (
              <section key={cluster} style={clusterSection}>
                <h2 style={clusterTitle}>{cluster}</h2>
                <p style={clusterSubtitle}>
                  {items.length} indicators · {selectedShift} · {selectedMonth}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))",
                    gap: "18px",
                    marginTop: "20px",
                  }}
                >
                  {items.map((item) => (
                    <KpiCard
                      key={item.title}
                      item={item}
                      value={getValue(item)}
                      onClick={() => setSelectedIndicator(item)}
                    />
                  ))}
                </div>
              </section>
            ))}

            <section style={panel}>
              <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
                {t.weekly}
              </h2>

              <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
                {language === "EN"
                  ? "Weekly process behavior to identify acceleration, deterioration and operational instability."
                  : "Comportamento semanal do processo para identificar aceleração, deterioração e instabilidade operacional."}
              </p>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#38bdf8"
                    strokeWidth={4}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <ActionPlan language={language} />

            <section style={{ ...panel, marginTop: "30px" }}>
              <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
                {t.insights}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: "18px",
                  marginTop: "22px",
                }}
              >
                <InsightCard
                  title={language === "EN" ? "KPI Interference" : "Interferência entre KPIs"}
                  text={
                    language === "EN"
                      ? "SLA deterioration usually increases overdue consolidation, which later increases cancellation and lost risk."
                      : "A deterioração do SLA tende a aumentar overdue consolidation, que depois aumenta risco de cancelamento e lost."
                  }
                />
                <InsightCard
                  title={language === "EN" ? "Warehouse Specialist View" : "Visão Especialista de Warehouse"}
                  text={
                    language === "EN"
                      ? "Exception indicators are upstream drivers. When receiving, picking or packing quality deteriorates, shipping and customer-facing KPIs are impacted downstream."
                      : "Indicadores de exception são drivers upstream. Quando recebimento, picking ou packing deterioram, shipping e KPIs voltados ao cliente são impactados downstream."
                  }
                />
                <InsightCard
                  title="Prediction Data Base"
                  text={
                    language === "EN"
                      ? "The prediction should combine weekly trend, monthly target gap and cross-KPI interference to anticipate the next operational bottleneck."
                      : "A previsão deve combinar tendência semanal, gap mensal contra a meta e interferência entre KPIs para antecipar o próximo gargalo operacional."
                  }
                />
              </div>
            </section>
          </>
        ) : (
          <ProductivityView
            selectedShift={selectedShift}
            selectedMonth={selectedMonth}
            language={language}
          />
        )}

        {selectedIndicator && (
          <Modal
            item={selectedIndicator}
            onClose={() => setSelectedIndicator(null)}
            language={language}
          />
        )}
      </section>
    </main>
  );
}

function ProductivityView({ selectedShift, selectedMonth, language }) {
  const filteredProductivity =
    selectedShift === "Total"
      ? inventoryProductivity
      : inventoryProductivity.filter((_, index) => {
          if (selectedShift === "Morning") return index < 2;
          if (selectedShift === "Afternoon") return index >= 2 && index < 4;
          return index >= 4;
        });

  const totalProductivity = filteredProductivity.reduce(
    (sum, item) => sum + item.productivity,
    0
  );

  const avgProductivity =
    filteredProductivity.length > 0
      ? totalProductivity / filteredProductivity.length
      : 0;

  return (
    <>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "14px",
          marginBottom: "30px",
        }}
      >
        <TopCard
          title={language === "EN" ? "Total Productivity" : "Produtividade Total"}
          value={totalProductivity.toFixed(0)}
          color="#38bdf8"
        />
        <TopCard
          title={language === "EN" ? "Average Productivity" : "Produtividade Média"}
          value={avgProductivity.toFixed(1)}
          color="#22c55e"
        />
        <TopCard
          title={language === "EN" ? "Active Checkers" : "Checkers Ativos"}
          value={filteredProductivity.length}
          color="#f59e0b"
        />
      </section>

      <section style={clusterSection}>
        <h2 style={clusterTitle}>INVENTORY</h2>
        <p style={clusterSubtitle}>
          {language === "EN"
            ? "Inventory indicators supporting cycle productivity."
            : "Indicadores de inventário que suportam a produtividade do ciclo."}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          {indicators.INVENTORY.map((item) => (
            <KpiCard
              key={item.title}
              item={item}
              value={selectedMonth === "Overall" ? item.overall : item[selectedMonth.toLowerCase()]}
            />
          ))}
        </div>
      </section>

      <section style={panel}>
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
          {language === "EN" ? "Top Checkers Productivity" : "Top Produtividades por Checker"}
        </h2>

        <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
          {language === "EN"
            ? "Ranking based on total counted inventory cycle locations."
            : "Ranking baseado na soma total de posições contadas no ciclo de inventário."}
        </p>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={filteredProductivity}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="checker" type="category" stroke="#94a3b8" width={110} />
            <Tooltip />
            <Bar dataKey="productivity" fill={pastelBlue} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={{ ...panel, marginTop: "30px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
          {language === "EN" ? "Weekly Productivity Process" : "Processo Semanal de Produtividade"}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              fill="rgba(56,189,248,0.25)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </>
  );
}
function KpiCard({ item, value, onClick }) {
  const lowerIsBetter = !item.title.includes("OTD") && !item.title.includes("SLA") && !item.title.includes("Coverage");
  const onTrack = lowerIsBetter ? value <= item.target : value >= item.target;
  const color = onTrack ? "#22c55e" : "#f59e0b";

  return (
    <div
      onClick={onClick}
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "22px",
        padding: "22px",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>{item.title}</p>

      <h2 style={{ fontSize: "32px", margin: "0 0 8px 0" }}>
        {formatPercent(value)}
      </h2>

      <p style={{ color: "#64748b", marginBottom: "12px" }}>
        Target: {formatPercent(item.target)}
      </p>

      <StatusBadge status={onTrack ? "On Track" : "Ongoing"} />

      <p style={{ color: "#cbd5e1", marginTop: "18px", fontSize: "13px" }}>
        Jan → Selected: {formatPercent(item.jan)} → {formatPercent(value)}
      </p>
    </div>
  );
}

function TopCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "14px 16px",
        minHeight: "84px",
      }}
    >
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "6px" }}>
        {title}
      </p>
      <h2 style={{ fontSize: "28px", color, margin: 0 }}>{value}</h2>
    </div>
  );
}

function InsightCard({ title, text }) {
  return (
    <div
      style={{
        background: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "18px",
        padding: "20px",
      }}
    >
      <h3 style={{ marginTop: 0, color: "#38bdf8", fontSize: "18px" }}>
        {title}
      </h3>
      <p style={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: "14px" }}>
        {text}
      </p>
    </div>
  );
}

function ActionPlan({ language }) {
  const rows = [
    {
      action: "RTS monitoring routine",
      owner: "Exception Team",
      status: "On Track",
    },
    {
      action: "System lock for cancelled packages",
      owner: "System / WMS",
      status: "Ongoing",
    },
    {
      action: "Camera repositioning for loss investigation",
      owner: "Loss Prevention",
      status: "Delayed",
    },
  ];

  return (
    <section style={{ ...panel, marginTop: "30px" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
        {language === "EN" ? "Action Plan" : "Plano de Ação"}
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ color: "#94a3b8", textAlign: "left" }}>
            <th style={th}>Action</th>
            <th style={th}>Owner</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.action} style={{ borderTop: "1px solid #1e293b" }}>
              <td style={td}>{row.action}</td>
              <td style={td}>{row.owner}</td>
              <td style={td}>
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function StatusBadge({ status }) {
  let color = "#f59e0b";
  let label = status;

  if (status === "On Track") {
    color = "#22c55e";
    label = "On Track";
  }

  if (status === "Ongoing") {
    color = "#f59e0b";
    label = "Ongoing";
  }

  if (status === "Delayed") {
    color = "#ef4444";
    label = "Delayed";
  }

  return (
    <span
      style={{
        border: `1px solid ${color}`,
        color,
        background: `${color}22`,
        padding: "7px 12px",
        borderRadius: "999px",
        fontWeight: "bold",
        fontSize: "12px",
        display: "inline-block",
        minWidth: "82px",
        textAlign: "center",
      }}
    >
      {label}
    </span>
  );
}

function Modal({ item, onClose, language }) {
  const data = [
    { month: "Jan", value: item.jan, target: item.target },
    { month: "Feb", value: item.feb, target: item.target },
    { month: "Mar", value: item.mar, target: item.target },
    { month: "Apr", value: item.apr, target: item.target },
  ];

  return (
    <div
      onClick={onClose}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "22px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "28px", margin: 0 }}>{item.title}</h2>
            <p style={{ color: "#94a3b8" }}>
              {language === "EN" ? "Monthly evolution" : "Evolução mensal"}
            </p>
          </div>

          <button
            onClick={onClose}
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

        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={{ r: 5 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                formatter={formatPercent}
                fill="#e5e7eb"
                fontSize={12}
              />
            </Line>

            <Line
              type="monotone"
              dataKey="target"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function sideButton(active) {
  return {
    width: "100%",
    textAlign: "left",
    marginBottom: "10px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: active ? "1px solid #fb923c" : "1px solid #1e293b",
    background: active ? "rgba(251,146,60,0.16)" : "#0f172a",
    color: active ? "#fb923c" : "#cbd5e1",
    fontWeight: "bold",
    cursor: "pointer",
  };
}

function filterButton(active, color) {
  return {
    background: active ? color : "#0f172a",
    color: active ? "#020617" : "#cbd5e1",
    border: active ? `1px solid ${color}` : "1px solid #1e293b",
    borderRadius: "999px",
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  };
}

function formatPercent(value) {
  return `${Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: Number(value) < 1 ? 3 : 2,
    maximumFractionDigits: Number(value) < 1 ? 3 : 2,
  })}%`;
}

const clusterSection = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "26px",
  padding: "24px",
  marginBottom: "30px",
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
  };
