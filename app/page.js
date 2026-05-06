"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

import { useState } from "react";

const pastelBlue = "rgba(96,165,250,0.75)";
const pastelRed = "rgba(248,113,113,0.85)";

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
    },
    {
      title: "Empty Box",
      target: 0.2,
      overall: 0.27,
      jan: 0.45,
      feb: 0.27,
      mar: 0.26,
      apr: 0.14,
    },
    {
      title: "Short Picking",
      target: 0.08,
      overall: 0.05,
      jan: 0.05,
      feb: 0.03,
      mar: 0.06,
      apr: 0.05,
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
    },
    {
      title: "Handover Failed",
      target: 0.085,
      overall: 0.01,
      jan: 0.01,
      feb: 0,
      mar: 0.01,
      apr: 0.01,
    },
  ],

  LOST: [
    {
      title: "Lost",
      target: 0.05,
      overall: 0.04,
      jan: 0.086,
      feb: 0.052,
      mar: 0.032,
      apr: 0.01,
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
    },
    {
      title: "Counting Coverage",
      target: 100,
      overall: 100,
      jan: 100,
      feb: 100,
      mar: 99.82,
      apr: 100,
    },
    {
      title: "Wrongly Count",
      target: 1,
      overall: 0.11,
      jan: 0.1,
      feb: 0.16,
      mar: 0.11,
      apr: 0.06,
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
  };

  const allItems = Object.values(indicators).flat();

  const totalKpis = allItems.length;

  const onTrack = allItems.filter((item) => {
    const value = getValue(item);

    const lowerIsBetter =
      !item.title.includes("OTD") &&
      !item.title.includes("SLA") &&
      !item.title.includes("Coverage");

    return lowerIsBetter
      ? value <= item.target
      : value >= item.target;
  }).length;

  const attention = totalKpis - onTrack;

  const t = {
    title:
      language === "EN"
        ? "Executive Scorecard Dashboard"
        : "Dashboard Executivo",

    productivity:
      language === "EN"
        ? "Cycle Productivity"
        : "Produtividade Ciclo",

    totalKpis:
      language === "EN"
        ? "Total KPIs"
        : "Total KPIs",

    onTrack:
      language === "EN"
        ? "On Track"
        : "No alvo",

    attention:
      language === "EN"
        ? "Attention"
        : "Atenção",
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
        }}
      >
        <h2
          style={{
            color: "#fb923c",
            marginBottom: "28px",
          }}
        >
          EH Control Tower
        </h2>

        <button
          onClick={() => setSelectedView("scorecard")}
          style={sideButton(selectedView === "scorecard")}
        >
          📊 Scorecard
        </button>

        <button
          onClick={() => setSelectedView("productivity")}
          style={sideButton(selectedView === "productivity")}
        >
          📦 Produtividade
        </button>

        <div style={{ marginTop: "30px" }}>
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "10px",
              fontSize: "12px",
            }}
          >
            Language
          </p>

          <div style={{ display: "flex", gap: "8px" }}>
            {["EN", "PT"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  background:
                    language === lang
                      ? "#fb923c"
                      : "#0f172a",

                  color:
                    language === lang
                      ? "#020617"
                      : "#cbd5e1",

                  border:
                    language === lang
                      ? "1px solid #fb923c"
                      : "1px solid #1e293b",

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
          <p
            style={{
              color: "#fb923c",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            SHEIN WHA · EXCEPTION HANDLING
          </p>

          <h1
            style={{
              fontSize: "44px",
              marginBottom: "8px",
            }}
          >
            {selectedView === "scorecard"
              ? t.title
              : t.productivity}
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            {selectedShift} · {selectedMonth}
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
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {shiftOptions.map((shift) => (
              <button
                key={shift}
                onClick={() => setSelectedShift(shift)}
                style={filterButton(
                  selectedShift === shift,
                  "#fb923c"
                )}
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

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {monthOptions.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                style={filterButton(
                  selectedMonth === month,
                  "#38bdf8"
                )}
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
                gridTemplateColumns:
                  "repeat(3, 180px)",
                gap: "14px",
                marginBottom: "30px",
              }}
            >
              <TopCard
                title={t.totalKpis}
                value={totalKpis}
                color="#38bdf8"
              />

              <TopCard
                title={t.onTrack}
                value={onTrack}
                color="#22c55e"
              />

              <TopCard
                title={t.attention}
                value={attention}
                color="#f59e0b"
              />
            </section>

            {Object.entries(indicators).map(
              ([cluster, items]) => (
                <section
                  key={cluster}
                  style={clusterSection}
                >
                  <h2 style={clusterTitle}>
                    {cluster}
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(235px,1fr))",
                      gap: "18px",
                      marginTop: "20px",
                    }}
                  >
                    {items.map((item) => (
                      <KpiCard
                        key={item.title}
                        item={item}
                        value={getValue(item)}
                        onClick={() =>
                          setSelectedIndicator(item)
                        }
                      />
                    ))}
                  </div>
                </section>
              )
            )}

            <section style={panel}>
              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
              >
                Weekly Process Analysis
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <LineChart data={weeklyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="week"
                    stroke="#94a3b8"
                  />

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

            <ActionPlan />

          </>
        ) : (
          <>
            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 180px)",
                gap: "14px",
                marginBottom: "30px",
              }}
            >
              <TopCard
                title="Total Productivity"
                value="562"
                color="#38bdf8"
              />

              <TopCard
                title="Average Productivity"
                value="93.6"
                color="#22c55e"
              />

              <TopCard
                title="Active Checkers"
                value="6"
                color="#f59e0b"
              />
            </section>

            <section style={clusterSection}>
              <h2 style={clusterTitle}>
                INVENTORY
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(235px,1fr))",
                  gap: "18px",
                  marginTop: "20px",
                }}
              >
                {indicators.INVENTORY.map((item) => (
                  <KpiCard
                    key={item.title}
                    item={item}
                    value={getValue(item)}
                  />
                ))}
              </div>
            </section>

            <section style={panel}>
              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
              >
                Top Productivity
              </h2>

              <ResponsiveContainer
                width="100%"
                height={360}
              >
                <BarChart
                  data={inventoryProductivity}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    type="number"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    dataKey="checker"
                    type="category"
                    stroke="#94a3b8"
                    width={120}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="productivity"
                    fill={pastelBlue}
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section
              style={{
                ...panel,
                marginTop: "30px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
              >
                Weekly Productivity Process
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <AreaChart data={weeklyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="week"
                    stroke="#94a3b8"
                  />

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
        )}

        {selectedIndicator && (
          <Modal
            item={selectedIndicator}
            onClose={() =>
              setSelectedIndicator(null)
            }
          />
        )}
      </section>
    </main>
  );
}

function KpiCard({
  item,
  value,
  onClick,
}) {
  const lowerIsBetter =
    !item.title.includes("OTD") &&
    !item.title.includes("SLA") &&
    !item.title.includes("Coverage");

  const onTrack = lowerIsBetter
    ? value <= item.target
    : value >= item.target;

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
      <p
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {item.title}
      </p>

      <h2
        style={{
          fontSize: "32px",
          margin: "0 0 8px 0",
        }}
      >
        {formatPercent(value)}
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "12px",
        }}
      >
        Target: {formatPercent(item.target)}
      </p>

      <StatusBadge
        status={
          onTrack
            ? "On Track"
            : "Ongoing"
        }
      />
    </div>
  );
}

function TopCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "16px",
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          marginBottom: "6px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize: "28px",
          color,
          margin: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function ActionPlan() {
  const rows = [
    {
      action: "RTS monitoring routine",
      owner: "Exception Team",
      status: "On Track",
    },
    {
      action: "System lock",
      owner: "WMS",
      status: "Ongoing",
    },
    {
      action: "Loss investigation",
      owner: "LP",
      status: "Delayed",
    },
  ];

  return (
    <section
      style={{
        ...panel,
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "8px",
        }}
      >
        Action Plan
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr
            style={{
              color: "#94a3b8",
              textAlign: "left",
            }}
          >
            <th style={th}>Action</th>
            <th style={th}>Owner</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.action}
              style={{
                borderTop:
                  "1px solid #1e293b",
              }}
            >
              <td style={td}>
                {row.action}
              </td>

              <td style={td}>
                {row.owner}
              </td>

              <td style={td}>
                <StatusBadge
                  status={row.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function StatusBadge({
  status,
}) {
  let color = "#f59e0b";

  if (status === "On Track")
    color = "#22c55e";

  if (status === "Delayed")
    color = "#ef4444";

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
      }}
    >
      {status}
    </span>
  );
}

function Modal({
  item,
  onClose,
}) {
  const data = [
    {
      month: "Jan",
      value: item.jan,
      target: item.target,
    },
    {
      month: "Feb",
      value: item.feb,
      target: item.target,
    },
    {
      month: "Mar",
      value: item.mar,
      target: item.target,
    },
    {
      month: "Apr",
      value: item.apr,
      target: item.target,
    },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "900px",
          background: "#0f172a",
          border:
            "1px solid #1e293b",
          borderRadius: "24px",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "22px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "28px",
                margin: 0,
              }}
            >
              {item.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#020617",
              color: "#cbd5e1",
              border:
                "1px solid #334155",
              borderRadius: "999px",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

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
                formatter={
                  formatPercent
                }
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
    border: active
      ? "1px solid #fb923c"
      : "1px solid #1e293b",

    background: active
      ? "rgba(251,146,60,0.16)"
      : "#0f172a",

    color: active
      ? "#fb923c"
      : "#cbd5e1",

    fontWeight: "bold",
    cursor: "pointer",
  };
}

function filterButton(
  active,
  color
) {
  return {
    background: active
      ? color
      : "#0f172a",

    color: active
      ? "#020617"
      : "#cbd5e1",

    border: active
      ? `1px solid ${color}`
      : "1px solid #1e293b",

    borderRadius: "999px",
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  };
}

function formatPercent(value) {
  return `${Number(
    value
  ).toLocaleString("pt-BR", {
    minimumFractionDigits:
      Number(value) < 1 ? 3 : 2,

    maximumFractionDigits:
      Number(value) < 1 ? 3 : 2,
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
};

const panel = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: "8px",
  padding: "22px",
};

const th = {
  padding: "14px",
  borderBottom:
    "1px solid #334155",
};

const td = {
  padding: "14px",
  color: "#cbd5e1",
};
