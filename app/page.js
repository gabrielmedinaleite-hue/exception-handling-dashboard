"use client";

const kpis = [
  {
    title: "Exception Rate",
    value: "0.29%",
    status: "On Track",
    color: "#22c55e",
  },
  {
    title: "IRDR",
    value: "0.59%",
    status: "Attention",
    color: "#f59e0b",
  },
  {
    title: "Return to Seller",
    value: "44.3%",
    status: "Critical",
    color: "#ef4444",
  },
  {
    title: "Lost Rate",
    value: "0.00%",
    status: "Excellent",
    color: "#3b82f6",
  },
  {
    title: "Mis-ship Rate",
    value: "0.04%",
    status: "On Track",
    color: "#22c55e",
  },
  {
    title: "Miss Packing",
    value: "0.03%",
    status: "Stable",
    color: "#8b5cf6",
  },
];

export default function Dashboard() {
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
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Exception Handling & Inventory
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
          Executive Scorecard Dashboard · SHEIN WHA
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "20px",
        }}
      >
        {kpis.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "24px",
              padding: "28px",
              transition: "0.2s",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: item.color,
                marginBottom: "20px",
              }}
            />

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "12px",
                fontSize: "15px",
              }}
            >
              {item.title}
            </p>

            <h2
              style={{
                fontSize: "38px",
                marginBottom: "12px",
              }}
            >
              {item.value}
            </h2>

            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#111827",
                border: `1px solid ${item.color}`,
                color: item.color,
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "50px",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "24px",
          padding: "30px",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "28px",
          }}
        >
          Executive Summary
        </h2>

        <ul
          style={{
            color: "#cbd5e1",
            lineHeight: "2",
            fontSize: "16px",
          }}
        >
          <li>Reduction of Lost Rate from 0.086% to 0.000%</li>
          <li>Strong stabilization of Mis-ship Rate below target</li>
          <li>IRDR significantly improved during Q2</li>
          <li>Return to Seller remains the main operational risk</li>
          <li>Daily RCA routines implemented across all shifts</li>
        </ul>
      </div>
    </main>
  );
}
