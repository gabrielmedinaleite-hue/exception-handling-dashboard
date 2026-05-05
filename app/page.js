"use client";

export default function Page() {
  return (
    <main style={{
      background: "#020617",
      color: "white",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1>Exception Handling & Inventory</h1>
      <h2>Executive Scorecard</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginTop: "32px"
      }}>
        <Card title="Exception Rate" value="0.29%" status="On Track" />
        <Card title="IRDR" value="0.59%" status="Attention" />
        <Card title="Return to Seller" value="44.3%" status="Critical" />
        <Card title="Lost Rate" value="0.00%" status="On Track" />
      </div>
    </main>
  );
}

function Card({ title, value, status }) {
  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: "20px",
      padding: "24px"
    }}>
      <p style={{ color: "#94a3b8" }}>{title}</p>
      <h2>{value}</h2>
      <p>{status}</p>
    </div>
  );
}
