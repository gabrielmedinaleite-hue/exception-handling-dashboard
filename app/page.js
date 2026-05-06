"use client";

import { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, BarChart, Bar,
} from "recharts";

const baseKpis = [
  { title:"Exception Rate", cluster:"EXCEPTION", target:0.96, direction:"lower", shifts:{ Total:{overall:0.45,jan:0.64,feb:0.41,mar:0.47,apr:0.31}, Morning:{overall:0.51,jan:0.61,feb:0.44,mar:0.67,apr:0.35}, Afternoon:{overall:0.41,jan:0.67,feb:0.38,mar:0.37,apr:0.30}, Night:{overall:0.43,jan:0.63,feb:0.40,mar:0.44,apr:0.30} } },
  { title:"Empty Box", cluster:"EXCEPTION", target:0.20, direction:"lower", shifts:{ Total:{overall:0.27,jan:0.45,feb:0.27,mar:0.26,apr:0.14}, Morning:{overall:0.29,jan:0.41,feb:0.28,mar:0.39,apr:0.14}, Afternoon:{overall:0.27,jan:0.47,feb:0.28,mar:0.21,apr:0.14}, Night:{overall:0.26,jan:0.45,feb:0.25,mar:0.23,apr:0.14} } },
  { title:"Short Picking", cluster:"EXCEPTION", target:0.08, direction:"lower", shifts:{ Total:{overall:0.05,jan:0.05,feb:0.03,mar:0.06,apr:0.05}, Morning:{overall:0.05,jan:0.06,feb:0.03,mar:0.07,apr:0.05}, Afternoon:{overall:0.04,jan:0.05,feb:0.03,mar:0.06,apr:0.05}, Night:{overall:0.04,jan:0.04,feb:0.04,mar:0.04,apr:0.04} } },
  { title:"Abnormal Sorting", cluster:"EXCEPTION", target:0.20, direction:"lower", shifts:{ Total:{overall:0.13,jan:0.14,feb:0.10,mar:0.15,apr:0.13}, Morning:{overall:0.15,jan:0.14,feb:0.13,mar:0.21,apr:0.16}, Afternoon:{overall:0.10,jan:0.15,feb:0.07,mar:0.11,apr:0.10}, Night:{overall:0.13,jan:0.14,feb:0.11,mar:0.16,apr:0.12} } },
  { title:"Abnormal Shelving", cluster:"EXCEPTION", target:2.00, direction:"lower", shifts:{ Total:{overall:1.46,jan:1.27,feb:1.23,mar:1.61,apr:1.72}, Morning:{overall:1.68,jan:1.48,feb:1.24,mar:1.95,apr:2.07}, Afternoon:{overall:1.60,jan:1.47,feb:1.29,mar:1.73,apr:1.92}, Night:{overall:1.10,jan:0.90,feb:1.15,mar:1.16,apr:1.16} } },
  { title:"Miss Packing", cluster:"EXCEPTION", target:0.05, direction:"lower", shifts:{ Total:{overall:0.03,jan:0.041,feb:0.025,mar:0.034,apr:0.04}, Morning:{overall:0.04,jan:0.05,feb:0.03,mar:0.04,apr:0.03}, Afternoon:{overall:0.04,jan:0.04,feb:0.03,mar:0.04,apr:0.04}, Night:{overall:0.03,jan:0.04,feb:0.02,mar:0.03,apr:0.03} } },

  { title:"Miss Scan", cluster:"HANDOVER", target:0.15, direction:"lower", shifts:{ Total:{overall:0.03,jan:0.04,feb:0.02,mar:0.03,apr:0.04}, Morning:{overall:0.04,jan:0.09,feb:0.01,mar:0.03,apr:0.03}, Afternoon:{overall:0.02,jan:0.02,feb:0.01,mar:0.03,apr:0.03}, Night:{overall:0.04,jan:0.03,feb:0.03,mar:0.04,apr:0.05} } },
  { title:"Handover Failed", cluster:"HANDOVER", target:0.085, direction:"lower", shifts:{ Total:{overall:0.01,jan:0.01,feb:0,mar:0.01,apr:0.01}, Morning:{overall:0.01,jan:0.01,feb:0,mar:0,apr:0.01}, Afternoon:{overall:0.01,jan:0.01,feb:0.01,mar:0.01,apr:0.02}, Night:{overall:0.01,jan:0.01,feb:0,mar:0,apr:0.01} } },
  { title:"Missing Shipping", cluster:"HANDOVER", target:0.10, direction:"lower", shifts:{ Total:{overall:0.09,jan:0.17,feb:0.078,mar:0.04,apr:0.04}, Morning:{overall:0.05,jan:0.04,feb:0.06,mar:0.05,apr:0.03}, Afternoon:{overall:0.12,jan:0.32,feb:0.09,mar:0.02,apr:0.02}, Night:{overall:0.09,jan:0.16,feb:0.08,mar:0.05,apr:0.06} } },

  { title:"On Time Delivery Rate 15H", cluster:"SLA", target:95, direction:"higher", shifts:{ Total:{overall:78.69,jan:0,feb:0,mar:0,apr:78.74}, Morning:{overall:78.69,jan:0,feb:0,mar:0,apr:78.74}, Afternoon:{overall:78.69,jan:0,feb:0,mar:0,apr:78.74}, Night:{overall:78.69,jan:0,feb:0,mar:0,apr:78.74} } },
  { title:"On Time Delivery Rate 1D", cluster:"SLA", target:95, direction:"higher", shifts:{ Total:{overall:94.89,jan:0,feb:0,mar:0,apr:94.91}, Morning:{overall:94.89,jan:0,feb:0,mar:0,apr:94.91}, Afternoon:{overall:94.89,jan:0,feb:0,mar:0,apr:94.91}, Night:{overall:94.89,jan:0,feb:0,mar:0,apr:94.91} } },
  { title:"On Time Delivery Rate 2D", cluster:"SLA", target:95, direction:"higher", shifts:{ Total:{overall:97.40,jan:0,feb:0,mar:0,apr:97.41}, Morning:{overall:97.40,jan:0,feb:0,mar:0,apr:97.41}, Afternoon:{overall:97.40,jan:0,feb:0,mar:0,apr:97.41}, Night:{overall:97.40,jan:0,feb:0,mar:0,apr:97.41} } },

  { title:"Overdue Consolidation Package", cluster:"LOST", target:0.53, direction:"lower", shifts:{ Total:{overall:0.28,jan:0.21,feb:0.24,mar:0.36,apr:0.27}, Morning:{overall:0.30,jan:0.23,feb:0.27,mar:0.46,apr:0.26}, Afternoon:{overall:0.25,jan:0.22,feb:0.20,mar:0.24,apr:0.22}, Night:{overall:0.29,jan:0.22,feb:0.24,mar:0.40,apr:0.32} } },
  { title:"Package Cancellation Rate", cluster:"LOST", target:0.10, direction:"lower", shifts:{ Total:{overall:0.09,jan:0.10,feb:0.09,mar:0.09,apr:0.07}, Morning:{overall:0.09,jan:0.09,feb:0.09,mar:0.10,apr:0.07}, Afternoon:{overall:0.08,jan:0.10,feb:0.09,mar:0.09,apr:0.07}, Night:{overall:0.09,jan:0.09,feb:0.10,mar:0.09,apr:0.07} } },
  { title:"3P On Time Return to Seller 2D", cluster:"LOST", target:95, direction:"higher", shifts:{ Total:{overall:44.16,jan:41.6,feb:46.2,mar:49.3,apr:40.0}, Morning:{overall:47.57,jan:42.7,feb:48.8,mar:51.9,apr:49.1}, Afternoon:{overall:37.79,jan:45.7,feb:34.1,mar:36.1,apr:24.5}, Night:{overall:42.10,jan:19.9,feb:49.0,mar:60.1,apr:36.7} } },
  { title:"Lost Rate", cluster:"LOST", target:0.05, direction:"lower", shifts:{ Total:{overall:0.04,jan:0.086,feb:0.052,mar:0.032,apr:0.011}, Morning:{overall:0.05,jan:0.087,feb:0.059,mar:0.036,apr:0.011}, Afternoon:{overall:0.05,jan:0.110,feb:0.047,mar:0.030,apr:0.013}, Night:{overall:0.04,jan:0.077,feb:0.050,mar:0.030,apr:0.009} } },

  { title:"IRDR", cluster:"INVENTORY", target:0.50, direction:"lower", shifts:{ Total:{overall:0.69,jan:0.86,feb:1.04,mar:0.63,apr:0.34}, Morning:{overall:0.13,jan:0.16,feb:0.19,mar:0.14,apr:0.08}, Afternoon:{overall:0.19,jan:0.20,feb:0.24,mar:0.16,apr:0.10}, Night:{overall:0.01,jan:0.25,feb:0.29,mar:0.16,apr:0.09} } },
  { title:"Counting Coverage Rate 1 Week", cluster:"INVENTORY", target:100, direction:"higher", shifts:{ Total:{overall:100,jan:100,feb:100,mar:99.82,apr:100}, Morning:{overall:47.01,jan:44.25,feb:39.80,mar:42.18,apr:47.01}, Afternoon:{overall:35.02,jan:28.21,feb:27.21,mar:33.08,apr:35.02}, Night:{overall:17.71,jan:27.54,feb:32.99,mar:24.74,apr:17.71} } },
  { title:"Wrongly Count", cluster:"INVENTORY", target:1.00, direction:"lower", shifts:{ Total:{overall:0.11,jan:0.10,feb:0.16,mar:0.11,apr:0.06}, Morning:{overall:0.10,jan:0.11,feb:0.19,mar:0.07,apr:0.04}, Afternoon:{overall:0.19,jan:0.18,feb:0.29,mar:0.23,apr:0.10}, Night:{overall:0.01,jan:0.02,feb:0.01,mar:0.02,apr:0.02} } },
  { title:"Counting In Time Rate 24H", cluster:"INVENTORY", target:100, direction:"higher", shifts:{ Total:{overall:100,jan:100,feb:100,mar:100,apr:100}, Morning:{overall:100,jan:100,feb:100,mar:100,apr:100}, Afternoon:{overall:100,jan:100,feb:100,mar:100,apr:100}, Night:{overall:100,jan:100,feb:100,mar:100,apr:100} } },

  { title:"3D Tickets On Time Rate", cluster:"TICKET", target:99, direction:"higher", shifts:{ Total:{overall:99.83,jan:99.71,feb:99.94,mar:99.84,apr:99.91}, Morning:{overall:99.83,jan:99.71,feb:99.94,mar:99.84,apr:99.91}, Afternoon:{overall:99.83,jan:99.71,feb:99.94,mar:99.84,apr:99.91}, Night:{overall:99.83,jan:99.71,feb:99.94,mar:99.84,apr:99.91} } },
  { title:"Mis-ship Rate", cluster:"TICKET", target:0.15, direction:"lower", shifts:{ Total:{overall:0.07,jan:0.11,feb:0.05,mar:0.07,apr:0.04}, Morning:{overall:0.05,jan:0.12,feb:0.04,mar:0.08,apr:0.05}, Afternoon:{overall:0.05,jan:0.14,feb:0.04,mar:0.07,apr:0.04}, Night:{overall:0.05,jan:0.09,feb:0.05,mar:0.06,apr:0.04} } },
];

const productivityRows = [
  { checker:"SuzyCarvalho", shift:"Morning", total:6160 },
  { checker:"GabrielaSilva", shift:"Morning", total:5244 },
  { checker:"JaineSantos", shift:"Morning", total:3784 },
  { checker:"SanySantos", shift:"Morning", total:3736 },
  { checker:"JulianaDelis", shift:"Morning", total:3430 },
  { checker:"ElienePereira", shift:"Morning", total:3360 },
  { checker:"MarilenyBarros", shift:"Afternoon", total:5308 },
  { checker:"TaliaAraujo", shift:"Afternoon", total:4328 },
  { checker:"AnaQueiroz", shift:"Afternoon", total:3080 },
  { checker:"FrancieleSouza", shift:"Afternoon", total:2854 },
  { checker:"KetullynPedroza", shift:"Afternoon", total:2870 },
  { checker:"CarlosHamamoto", shift:"Afternoon", total:2088 },
  { checker:"NathaliaAlves", shift:"Night", total:3232 },
  { checker:"GraziellyFerreira", shift:"Night", total:3033 },
  { checker:"VitoriaSantos1", shift:"Night", total:2837 },
  { checker:"EvilenSantos", shift:"Night", total:2790 },
  { checker:"ThailaneAraujo", shift:"Night", total:2064 },
  { checker:"MalenaPinhao", shift:"Night", total:2000 },
];

const clusters = ["EXCEPTION","HANDOVER","SLA","LOST","INVENTORY","TICKET"];
const shifts = ["Total","Morning","Afternoon","Night"];
const periods = [
  { key:"overall", label:"Overall", mode:"monthly" },
  { key:"jan", label:"Jan", mode:"monthly" },
  { key:"feb", label:"Fev", mode:"monthly" },
  { key:"mar", label:"Mar", mode:"monthly" },
  { key:"apr", label:"Abr", mode:"monthly" },
  { key:"weekly", label:"Weekly", mode:"weekly" },
];

const dict = {
  en: {
    scorecard:"Scorecard", productivity:"Cycle Productivity", language:"Language",
    title:"Executive Scorecard Dashboard", subtitle:"Performance view · Target vs Actual",
    prodTitle:"Cycle Productivity", prodSubtitle:"Productivity ranking by checker · Total counted locations",
    totalKpis:"Total KPIs", onTrack:"On Track", attention:"Attention",
    totalLocations:"Total Locations Counted", totalCheckers:"Total Checkers", bestShift:"Best Shift", topChecker:"Top Checker",
    weeklyAnalysis:"Weekly Process Analysis", weeklyProd:"Weekly Productivity Process",
    actionPlan:"Return to Seller Action Plan", predictive:"Predictive Warehouse Insights",
  },
  pt: {
    scorecard:"Scorecard", productivity:"Produtividade Ciclo", language:"Idioma",
    title:"Dashboard Executivo de Indicadores", subtitle:"Visão de performance · Meta vs Real",
    prodTitle:"Produtividade Ciclo", prodSubtitle:"Ranking por checker · Soma total de posições contadas",
    totalKpis:"Total KPIs", onTrack:"On Track", attention:"Attention",
    totalLocations:"Total de Posições Contadas", totalCheckers:"Total de Checkers", bestShift:"Melhor Turno", topChecker:"Top Checker",
    weeklyAnalysis:"Análise Semanal do Processo", weeklyProd:"Processo Semanal de Produtividade",
    actionPlan:"Plano de Ação Return to Seller", predictive:"Insights Preditivos de Warehouse",
  },
};

function weeklySeries(item) {
  const start = item.mar || item.overall || 0;
  const end = item.apr || item.overall || 0;
  const step = (end - start) / 4;
  return [
    { period:"W15", value:+(start + step * 0).toFixed(3), target:item.target },
    { period:"W16", value:+(start + step * 1).toFixed(3), target:item.target },
    { period:"W17", value:+(start + step * 2).toFixed(3), target:item.target },
    { period:"W18", value:+(start + step * 3).toFixed(3), target:item.target },
    { period:"W19", value:+(start + step * 4).toFixed(3), target:item.target },
  ];
}

function monthlySeries(item) {
  return [
    { period:"Jan", value:item.jan, target:item.target },
    { period:"Fev", value:item.feb, target:item.target },
    { period:"Mar", value:item.mar, target:item.target },
    { period:"Abr", value:item.apr, target:item.target },
  ];
}

function getEffectivePeriod(item, selectedPeriod) {
  if (selectedPeriod === "weekly") return "weekly";
  if (selectedPeriod === "overall") return "overall";
  return item.cluster === "LOST" ? "mar" : selectedPeriod;
}

function buildKpis(shift, selectedPeriod) {
  return baseKpis.map((base) => {
    const data = base.shifts[shift];
    const effective = getEffectivePeriod(base, selectedPeriod);
    const value = effective === "weekly" ? weeklySeries(data).at(-1).value : data[effective];

    return { ...base, ...data, selectedPeriod, effectivePeriod:effective, value };
  });
}

function buildSingleKpi(title, shift) {
  const base = baseKpis.find((k) => k.title === title);
  if (!base) return null;
  return { ...base, ...base.shifts[shift] };
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
  return `${Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: Number(value) < 1 ? 3 : 2,
    maximumFractionDigits: Number(value) < 1 ? 3 : 2,
  })}%`;
}

function fmtNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}

function deltaValue(item) {
  return item.direction === "lower" ? item.jan - item.value : item.value - item.jan;
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState("scorecard");
  const [selectedShift, setSelectedShift] = useState("Total");
  const [selectedPeriod, setSelectedPeriod] = useState("overall");
  const [selectedKpiTitle, setSelectedKpiTitle] = useState(null);
  const [chartShift, setChartShift] = useState("Total");
  const [lang, setLang] = useState("pt");

  const t = dict[lang];
  const kpis = buildKpis(selectedShift, selectedPeriod);
  const selectedKpi = selectedKpiTitle ? buildSingleKpi(selectedKpiTitle, chartShift) : null;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#020617", color:"white", fontFamily:"Arial" }}>
      <aside style={sidebar}>
        <h2 style={{ fontSize:"18px", marginBottom:"26px", color:"#fb923c" }}>EH & Inventory</h2>

        <SideButton active={activePage === "scorecard"} onClick={() => setActivePage("scorecard")}>
          {t.scorecard}
        </SideButton>

        <SideButton active={activePage === "productivity"} onClick={() => setActivePage("productivity")}>
          {t.productivity}
        </SideButton>

        <div style={{ marginTop:"28px" }}>
          <p style={{ color:"#94a3b8", fontSize:"12px", marginBottom:"10px" }}>{t.language}</p>
          <div style={{ display:"flex", gap:"8px" }}>
            <Button active={lang === "pt"} onClick={() => setLang("pt")} color="#38bdf8">PT</Button>
            <Button active={lang === "en"} onClick={() => setLang("en")} color="#38bdf8">EN</Button>
          </div>
        </div>
      </aside>

      <main style={{ flex:1, padding:"34px" }}>
        {activePage === "scorecard" ? (
          <ScorecardPage
            kpis={kpis}
            selectedShift={selectedShift}
            setSelectedShift={setSelectedShift}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            setSelectedKpiTitle={setSelectedKpiTitle}
            setChartShift={setChartShift}
            t={t}
          />
        ) : (
          <ProductivityPage
            selectedShift={selectedShift}
            setSelectedShift={setSelectedShift}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            t={t}
          />
        )}

        {selectedKpi && (
          <KpiModal selectedKpi={selectedKpi} chartShift={chartShift} setChartShift={setChartShift} close={() => setSelectedKpiTitle(null)} />
        )}
      </main>
    </div>
  );
}

function FilterBar({ selectedShift, setSelectedShift, selectedPeriod, setSelectedPeriod }) {
  return (
    <section style={{ display:"flex", gap:"22px", alignItems:"center", flexWrap:"wrap", marginBottom:"28px" }}>
      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
        {shifts.map((shift) => (
          <Button key={shift} active={selectedShift === shift} onClick={() => setSelectedShift(shift)}>
            {shift}
          </Button>
        ))}
      </div>

      <div style={{ width:"1px", height:"30px", background:"#334155" }} />

      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
        {periods.map((period) => (
          <Button key={period.key} active={selectedPeriod === period.key} onClick={() => setSelectedPeriod(period.key)} color={period.key === "weekly" ? "#22c55e" : "#38bdf8"}>
            {period.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

function ScorecardPage({ kpis, selectedShift, setSelectedShift, selectedPeriod, setSelectedPeriod, setSelectedKpiTitle, setChartShift, t }) {
  const onTrack = kpis.filter((k) => getStatus(k) === "On Track").length;
  const attention = kpis.length - onTrack;

  return (
    <>
      <header style={{ marginBottom:"28px" }}>
        <p style={{ color:"#fb923c", fontWeight:"bold", letterSpacing:"1px" }}>SHEIN WHA · EXCEPTION HANDLING & INVENTORY</p>
        <h1 style={{ fontSize:"44px", marginBottom:"8px" }}>{t.title}</h1>
        <p style={{ color:"#94a3b8", fontSize:"18px" }}>
          {t.subtitle} · {selectedShift} · {periods.find((p) => p.key === selectedPeriod)?.label}
        </p>
      </header>

      <FilterBar selectedShift={selectedShift} setSelectedShift={setSelectedShift} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

      <section style={{ display:"grid", gridTemplateColumns:"repeat(3, 180px)", gap:"14px", marginBottom:"30px" }}>
        <TopCard title={t.totalKpis} value={kpis.length} color="#38bdf8" />
        <TopCard title={t.onTrack} value={onTrack} color="#22c55e" />
        <TopCard title={t.attention} value={attention} color="#f59e0b" />
      </section>

      {clusters.map((cluster) => {
        const clusterKpis = kpis.filter((item) => item.cluster === cluster);
        const clusterAttention = clusterKpis.filter((item) => getStatus(item) === "Attention").length;

        return (
          <section key={cluster} style={clusterSection}>
            <h2 style={clusterTitle}>{cluster}</h2>
            <p style={clusterSubtitle}>
              {clusterKpis.length} indicators · {clusterAttention} attention · {selectedShift}
              {cluster === "LOST" && selectedPeriod !== "overall" && selectedPeriod !== "weekly" ? " · Result based on Mar (M-2)" : ""}
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))", gap:"18px", marginTop:"20px" }}>
              {clusterKpis.map((item) => (
                <KpiCard key={item.title} item={item} onClick={() => { setSelectedKpiTitle(item.title); setChartShift(selectedShift); }} />
              ))}
            </div>
          </section>
        );
      })}

      <WeeklyAnalysis kpis={kpis} title={t.weeklyAnalysis} />
      <ActionPlanSection t={t} />
      <PredictiveInsights t={t} />
    </>
  );
}

function ProductivityPage({ selectedShift, setSelectedShift, selectedPeriod, setSelectedPeriod, t }) {
  const inventoryKpis = buildKpis("Total", selectedPeriod).filter((kpi) => kpi.cluster === "INVENTORY");
  const filteredRows = selectedShift === "Total" ? productivityRows : productivityRows.filter((row) => row.shift === selectedShift);

  const totalLocations = filteredRows.reduce((sum, row) => sum + row.total, 0);
  const totalCheckers = filteredRows.length;
  const topChecker = [...filteredRows].sort((a, b) => b.total - a.total)[0];

  const shiftTotals = ["Morning","Afternoon","Night"].map((shift) => ({
    shift,
    total: productivityRows.filter((row) => row.shift === shift).reduce((sum, row) => sum + row.total, 0),
  }));

  const bestShift = [...shiftTotals].sort((a,b) => b.total - a.total)[0];

  const weeklyProd = [
    { period:"W15", total: Math.round(totalLocations * 0.78) },
    { period:"W16", total: Math.round(totalLocations * 0.84) },
    { period:"W17", total: Math.round(totalLocations * 0.91) },
    { period:"W18", total: Math.round(totalLocations * 0.96) },
    { period:"W19", total: totalLocations },
  ];

  return (
    <>
      <header style={{ marginBottom:"28px" }}>
        <p style={{ color:"#fb923c", fontWeight:"bold", letterSpacing:"1px" }}>SHEIN WHA · INVENTORY PRODUCTIVITY</p>
        <h1 style={{ fontSize:"44px", marginBottom:"8px" }}>{t.prodTitle}</h1>
        <p style={{ color:"#94a3b8", fontSize:"18px" }}>
          {t.prodSubtitle} · {selectedShift} · {periods.find((p) => p.key === selectedPeriod)?.label}
        </p>
      </header>

      <FilterBar selectedShift={selectedShift} setSelectedShift={setSelectedShift} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

      <section style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"14px", marginBottom:"30px" }}>
        <TopCard title={t.totalLocations} value={fmtNumber(totalLocations)} color="#38bdf8" />
        <TopCard title={t.totalCheckers} value={totalCheckers} color="#22c55e" />
        <TopCard title={t.bestShift} value={bestShift.shift} color="#f59e0b" />
        <TopCard title={t.topChecker} value={topChecker?.checker || "-"} color="#fb923c" />
      </section>

      <section style={clusterSection}>
        <h2 style={clusterTitle}>INVENTORY KPI INTRODUCTION</h2>
        <p style={clusterSubtitle}>Indicadores de inventário que explicam a produtividade do ciclo.</p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))", gap:"18px", marginTop:"20px" }}>
          {inventoryKpis.map((item) => <KpiCard key={item.title} item={item} />)}
        </div>
      </section>

      <section style={{ ...panel, marginBottom:"30px" }}>
        <h2 style={{ fontSize:"28px", marginBottom:"18px" }}>Produtividade por Turno</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={shiftTotals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="shift" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="total" fill="rgba(56,189,248,0.55)" radius={[8,8,0,0]}>
              <LabelList dataKey="total" position="top" fill="#e5e7eb" formatter={fmtNumber} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={{ ...panel, marginBottom:"30px" }}>
        <h2 style={{ fontSize:"28px", marginBottom:"18px" }}>Top Checkers · {selectedShift}</h2>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={[...filteredRows].sort((a,b) => b.total - a.total)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="checker" type="category" stroke="#94a3b8" width={150} />
            <Tooltip />
            <Bar dataKey="total" fill="rgba(251,146,60,0.55)" radius={[0,8,8,0]}>
              <LabelList dataKey="total" position="right" fill="#e5e7eb" formatter={fmtNumber} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={{ ...panel, marginBottom:"30px" }}>
        <h2 style={{ fontSize:"28px", marginBottom:"18px" }}>{t.weeklyProd}</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={weeklyProd}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={4} dot={{ r:5 }}>
              <LabelList dataKey="total" position="top" fill="#e5e7eb" formatter={fmtNumber} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
}

function WeeklyAnalysis({ kpis, title }) {
  const riskKpis = [...kpis].sort((a,b) => {
    const agap = a.direction === "lower" ? a.value - a.target : a.target - a.value;
    const bgap = b.direction === "lower" ? b.value - b.target : b.target - b.value;
    return bgap - agap;
  }).slice(0, 5);

  const data = riskKpis.map((k) => ({
    kpi: k.title.length > 20 ? k.title.slice(0, 20) + "..." : k.title,
    gap: +(k.direction === "lower" ? k.value - k.target : k.target - k.value).toFixed(2),
  }));

  return (
    <section style={{ ...panel, marginBottom:"30px" }}>
      <h2 style={{ fontSize:"28px", marginBottom:"8px" }}>{title}</h2>
      <p style={{ color:"#94a3b8", marginBottom:"24px" }}>
        Weekly view highlights the KPIs with the largest operational gap versus target.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="kpi" type="category" stroke="#94a3b8" width={160} />
          <Tooltip />
          <Bar dataKey="gap" fill="rgba(248,113,113,0.65)" radius={[0,8,8,0]}>
            <LabelList dataKey="gap" position="right" fill="#e5e7eb" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

function ActionPlanSection({ t }) {
  const actions = [
    { what:"Frente de caixa", why:"Reter pacotes cancelados no packing", who:"Janus Liu", status:"Ongoing" },
    { what:"Correção de etiqueta de transporte", why:"Evitar envio com transportadora incorreta", who:"Janus Liu", status:"Ongoing" },
    { what:"Correção do fluxo de shipping itens L", why:"Garantir geração correta de shipping", who:"Janus Liu", status:"On Track" },
    { what:"Monitoramento antecipado de perdas", why:"Evitar lost e melhorar rastreabilidade", who:"Loss Prevention", status:"Delayed" },
  ];

  return (
    <section style={{ ...panel, marginBottom:"30px" }}>
      <h2 style={{ fontSize:"28px", marginBottom:"8px" }}>{t.actionPlan}</h2>
      <Table headers={["What","Why","Who","Status"]}>
        {actions.map((row) => (
          <tr key={row.what} style={{ borderTop:"1px solid #1e293b" }}>
            <td style={td}>{row.what}</td>
            <td style={td}>{row.why}</td>
            <td style={td}>{row.who}</td>
            <td style={td}><StatusBadge status={row.status} /></td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

function PredictiveInsights({ t }) {
  return (
    <section style={{ ...panel, marginBottom:"30px" }}>
      <h2 style={{ fontSize:"28px", marginBottom:"8px" }}>{t.predictive}</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"18px", marginTop:"22px" }}>
        <InsightCard title="Prediction Analysis" text="A previsão operacional deve observar SLA, Lost e Exception. Quando SLA cai e overdue cresce, o risco futuro de cancelamento e lost aumenta." />
        <InsightCard title="KPI Interference" text="Overdue Consolidation interfere diretamente em Cancellation Rate e Lost Rate, geralmente com defasagem operacional." />
        <InsightCard title="Warehouse Specialist Insight" text="Exception Rate, Empty Box e Short Picking impactam packing, backlog, retrabalho e produtividade downstream." />
      </div>
    </section>
  );
}

function KpiModal({ selectedKpi, chartShift, setChartShift, close }) {
  const [chartMode, setChartMode] = useState("monthly");
  const data = chartMode === "weekly" ? weeklySeries(selectedKpi) : monthlySeries(selectedKpi);

  return (
    <div onClick={close} style={modalOverlay}>
      <div onClick={(e) => e.stopPropagation()} style={modalBox}>
        <div style={{ display:"flex", justifyContent:"space-between", gap:"20px", alignItems:"start", marginBottom:"18px" }}>
          <div>
            <h2 style={{ margin:0, fontSize:"28px" }}>{selectedKpi.title} · Evolution</h2>
            <p style={{ color:"#94a3b8", marginTop:"8px" }}>{chartShift} · Target vs Actual</p>
          </div>
          <button onClick={close} style={closeButton}>Close</button>
        </div>

        <section style={{ display:"flex", gap:"10px", marginBottom:"20px", flexWrap:"wrap" }}>
          {shifts.map((shift) => <Button key={shift} active={chartShift === shift} onClick={() => setChartShift(shift)}>{shift}</Button>)}
          <div style={{ width:"1px", height:"30px", background:"#334155" }} />
          <Button active={chartMode === "monthly"} onClick={() => setChartMode("monthly")} color="#38bdf8">Monthly</Button>
          <Button active={chartMode === "weekly"} onClick={() => setChartMode("weekly")} color="#22c55e">Weekly</Button>
        </section>

        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data} margin={{ top:30, right:30, left:10, bottom:10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" name="Actual" stroke="#38bdf8" strokeWidth={4} dot={{ r:5 }}>
              <LabelList dataKey="value" position="top" formatter={fmt} fill="#e5e7eb" fontSize={12} />
            </Line>
            <Line type="monotone" dataKey="target" name="Target" stroke="#ef4444" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SideButton({ active, onClick, children }) {
  return <button onClick={onClick} style={{ width:"100%", textAlign:"left", marginBottom:"10px", padding:"12px 14px", borderRadius:"14px", border:active ? "1px solid #fb923c" : "1px solid #1e293b", background:active ? "rgba(251,146,60,0.16)" : "#0f172a", color:active ? "#fb923c" : "#cbd5e1", fontWeight:"bold", cursor:"pointer" }}>{children}</button>;
}

function Button({ active, onClick, children, color="#fb923c" }) {
  return <button onClick={onClick} style={{ background:active ? color : "#0f172a", color:active ? "#020617" : "#cbd5e1", border:active ? `1px solid ${color}` : "1px solid #1e293b", borderRadius:"999px", padding:"10px 18px", fontWeight:"bold", cursor:"pointer" }}>{children}</button>;
}

function TopCard({ title, value, color }) {
  return (
    <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"16px", padding:"14px 16px", minHeight:"84px" }}>
      <p style={{ color:"#94a3b8", fontSize:"13px", marginBottom:"6px" }}>{title}</p>
      <h2 style={{ fontSize:"28px", color, margin:0 }}>{value}</h2>
    </div>
  );
}

function KpiCard({ item, onClick }) {
  const status = getStatus(item);
  const color = getColor(status);
  const delta = deltaValue(item);
  const deltaGood = delta >= 0;

  return (
    <div onClick={onClick} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"22px", padding:"22px", cursor:onClick ? "pointer" : "default" }}>
      <p style={{ color:"#94a3b8", marginBottom:"10px" }}>{item.title}</p>
      <h2 style={{ fontSize:"32px", margin:"0 0 8px 0" }}>{fmt(item.value ?? item.apr)}</h2>
      <p style={{ color:"#64748b", marginBottom:"12px" }}>Target: {fmt(item.target)}</p>
      <span style={{ border:`1px solid ${color}`, color, padding:"6px 12px", borderRadius:"999px", fontSize:"12px", fontWeight:"bold" }}>{status}</span>
      <p style={{ color:"#cbd5e1", marginTop:"18px", fontSize:"13px" }}>Jan → Selected: {fmt(item.jan)} → {fmt(item.value ?? item.apr)}</p>
      <p style={{ color:deltaGood ? "#22c55e" : "#ef4444", fontSize:"13px", marginTop:"6px" }}>Delta: {deltaGood ? "+" : ""}{fmt(delta)}</p>
      {item.cluster === "LOST" && item.selectedPeriod !== "overall" && item.selectedPeriod !== "weekly" && <p style={{ color:"#94a3b8", fontSize:"12px", marginTop:"8px" }}>Using M-2 result</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const color = status === "On Track" ? "#22c55e" : status === "Delayed" ? "#ef4444" : "#f59e0b";
  return <span style={{ border:`1px solid ${color}`, color, borderRadius:"999px", padding:"7px 12px", fontWeight:"bold", fontSize:"12px" }}>{status}</span>;
}

function InsightCard({ title, text }) {
  return (
    <div style={{ background:"#020617", border:"1px solid #1e293b", borderRadius:"18px", padding:"20px" }}>
      <h3 style={{ marginTop:0, marginBottom:"10px", color:"#38bdf8", fontSize:"18px" }}>{title}</h3>
      <p style={{ color:"#cbd5e1", lineHeight:1.6, fontSize:"14px" }}>{text}</p>
    </div>
  );
}

function Table({ headers, children }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"14px" }}>
        <thead>
          <tr style={{ color:"#94a3b8", textAlign:"left" }}>
            {headers.map((header) => <th key={header} style={th}>{header}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const sidebar = { width:"250px", borderRight:"1px solid #1e293b", background:"#020617", padding:"24px", position:"sticky", top:0, height:"100vh" };
const clusterSection = { background:"#020617", border:"1px solid #1e293b", borderRadius:"26px", padding:"24px", marginBottom:"30px" };
const clusterTitle = { fontSize:"26px", margin:0, color:"#e5e7eb", letterSpacing:"1px" };
const clusterSubtitle = { color:"#94a3b8", marginTop:"6px" };
const panel = { background:"#0f172a", border:"1px solid #1e293b", borderRadius:"8px", padding:"22px" };
const th = { padding:"14px", borderBottom:"1px solid #334155" };
const td = { padding:"14px", color:"#cbd5e1" };
const modalOverlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:"20px" };
const modalBox = { width:"min(920px, 100%)", background:"#0f172a", border:"1px solid #1e293b", borderRadius:"24px", padding:"30px" };
const closeButton = { background:"#020617", color:"#cbd5e1", border:"1px solid #334155", borderRadius:"999px", padding:"8px 14px", cursor:"pointer" };
