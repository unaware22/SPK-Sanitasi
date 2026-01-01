import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle
} from "recharts";

/****************************
 * 1. CONFIG & DATA
 ****************************/

// Definisi Detail Kriteria untuk Tabel Informasi
const criteriaInfo = [
  { code: "C1", key: "sanitasi", label: "Sanitasi Layak", weight: 0.20, type: "Benefit", reason: "Infrastruktur dasar utama pencegahan penyakit." },
  { code: "C2", key: "air", label: "Air Minum Layak", weight: 0.20, type: "Benefit", reason: "Kebutuhan vital untuk kehidupan higienis." },
  { code: "C3", key: "diare", label: "Prevalensi Diare", weight: 0.20, type: "Cost", reason: "Indikator dampak kesehatan jangka pendek (akut)." },
  { code: "C4", key: "stunting", label: "Prevalensi Stunting", weight: 0.20, type: "Cost", reason: "Indikator dampak kesehatan jangka panjang (kronis)." },
  { code: "C5", key: "iklh", label: "Indeks Lingkungan (IKLH)", weight: 0.10, type: "Benefit", reason: "Indikator makro kualitas ekosistem daerah." },
  { code: "C6", key: "kepadatan", label: "Kepadatan Penduduk", weight: 0.10, type: "Cost", reason: "Faktor risiko yang mempercepat penularan wabah." },
];

const dataProvinsi = [
  { prov: "Aceh", sanitasi: 78.85, air: 89.74, diare: 4.2, stunting: 29.4, iklh: 78.53, kepadatan: 96 },
  { prov: "Sumatera Utara", sanitasi: 84.18, air: 92.19, diare: 4.7, stunting: 18.9, iklh: 72.80, kepadatan: 212 },
  { prov: "Sumatera Barat", sanitasi: 74.59, air: 85.59, diare: 3.9, stunting: 23.6, iklh: 75.85, kepadatan: 137 },
  { prov: "Riau", sanitasi: 84.58, air: 90.47, diare: 2.6, stunting: 13.6, iklh: 70.42, kepadatan: 74 },
  { prov: "Jambi", sanitasi: 83.04, air: 80.02, diare: 2.3, stunting: 13.5, iklh: 68.15, kepadatan: 75 },
  { prov: "Sumatera Selatan", sanitasi: 80.54, air: 87.19, diare: 3.1, stunting: 20.3, iklh: 70.20, kepadatan: 101 },
  { prov: "Bengkulu", sanitasi: 80.28, air: 73.08, diare: 3.5, stunting: 20.2, iklh: 72.10, kepadatan: 104 },
  { prov: "Lampung", sanitasi: 84.58, air: 82.78, diare: 2.8, stunting: 14.9, iklh: 69.91, kepadatan: 277 },
  { prov: "Kep. Bangka Belitung", sanitasi: 93.21, air: 81.64, diare: 2.3, stunting: 20.6, iklh: 71.62, kepadatan: 91 },
  { prov: "Kep. Riau", sanitasi: 91.10, air: 92.10, diare: 2.1, stunting: 16.8, iklh: 74.26, kepadatan: 260 },
  { prov: "DKI Jakarta", sanitasi: 93.50, air: 99.42, diare: 3.4, stunting: 17.6, iklh: 54.57, kepadatan: 16146 },
  { prov: "Jawa Barat", sanitasi: 74.88, air: 93.86, diare: 5.8, stunting: 21.7, iklh: 64.77, kepadatan: 1346 },
  { prov: "Jawa Tengah", sanitasi: 85.20, air: 93.76, diare: 3.6, stunting: 20.7, iklh: 68.59, kepadatan: 1093 },
  { prov: "DI Yogyakarta", sanitasi: 96.42, air: 96.69, diare: 3.2, stunting: 18.0, iklh: 66.29, kepadatan: 1178 },
  { prov: "Jawa Timur", sanitasi: 83.72, air: 96.01, diare: 3.8, stunting: 17.7, iklh: 69.59, kepadatan: 865 },
  { prov: "Banten", sanitasi: 86.41, air: 92.95, diare: 5.7, stunting: 24.0, iklh: 62.52, kepadatan: 1316 },
  { prov: "Bali", sanitasi: 95.70, air: 98.31, diare: 2.4, stunting: 7.2, iklh: 71.38, kepadatan: 788 },
  { prov: "Nusa Tenggara Barat", sanitasi: 85.11, air: 96.03, diare: 4.2, stunting: 24.6, iklh: 71.92, kepadatan: 283 },
  { prov: "Nusa Tenggara Timur", sanitasi: 75.67, air: 88.35, diare: 4.0, stunting: 37.9, iklh: 74.18, kepadatan: 120 },
  { prov: "Kalimantan Barat", sanitasi: 79.89, air: 82.08, diare: 3.4, stunting: 24.5, iklh: 73.73, kepadatan: 38 },
  { prov: "Kalimantan Tengah", sanitasi: 76.31, air: 77.72, diare: 2.7, stunting: 23.5, iklh: 75.17, kepadatan: 18 },
  { prov: "Kalimantan Selatan", sanitasi: 82.89, air: 76.29, diare: 3.2, stunting: 24.7, iklh: 73.50, kepadatan: 114 },
  { prov: "Kalimantan Timur", sanitasi: 91.21, air: 87.90, diare: 4.2, stunting: 22.9, iklh: 75.47, kepadatan: 31 },
  { prov: "Kalimantan Utara", sanitasi: 84.22, air: 90.19, diare: 2.2, stunting: 17.4, iklh: 80.77, kepadatan: 10 },
  { prov: "Sulawesi Utara", sanitasi: 85.91, air: 94.37, diare: 3.6, stunting: 21.3, iklh: 73.87, kepadatan: 185 },
  { prov: "Sulawesi Tengah", sanitasi: 75.80, air: 86.85, diare: 4.5, stunting: 27.2, iklh: 79.93, kepadatan: 50 },
  { prov: "Sulawesi Selatan", sanitasi: 93.69, air: 92.12, diare: 5.6, stunting: 27.4, iklh: 74.30, kepadatan: 207 },
  { prov: "Sulawesi Tenggara", sanitasi: 88.99, air: 94.80, diare: 3.4, stunting: 30.0, iklh: 78.41, kepadatan: 76 },
  { prov: "Gorontalo", sanitasi: 81.72, air: 96.00, diare: 4.3, stunting: 26.9, iklh: 79.52, kepadatan: 101 },
  { prov: "Sulawesi Barat", sanitasi: 80.73, air: 79.86, diare: 4.5, stunting: 30.3, iklh: 78.05, kepadatan: 89 },
  { prov: "Maluku", sanitasi: 78.17, air: 92.98, diare: 2.6, stunting: 28.4, iklh: 78.75, kepadatan: 42 },
  { prov: "Maluku Utara", sanitasi: 80.64, air: 89.01, diare: 2.9, stunting: 23.7, iklh: 80.36, kepadatan: 41 },
  { prov: "Papua Barat", sanitasi: 76.30, air: 81.57, diare: 3.1, stunting: 24.8, iklh: 83.31, kepadatan: 12 },
  { prov: "Papua", sanitasi: 43.00, air: 66.49, diare: 4.1, stunting: 28.6, iklh: 81.31, kepadatan: 14 }
];

// Mapping weights untuk perhitungan (diambil dari criteriaInfo)
const weights = criteriaInfo.reduce((acc, curr) => {
  acc[curr.key] = curr.weight;
  return acc;
}, {});

const costCriteria = criteriaInfo.filter(c => c.type === "Cost").map(c => c.key);

/****************************
 * 2. COMPONENTS (CUSTOM UI)
 ****************************/

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-xl">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-indigo-600 font-medium">
            SAW: <span className="font-mono text-slate-600">{payload[0]?.value}</span>
          </p>
          <p className="text-sm text-fuchsia-600 font-medium">
            SMART: <span className="font-mono text-slate-600">{payload[1]?.value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ type, text }) => {
  const styles = type === 'Cost' 
    ? "bg-rose-50 text-rose-600 border-rose-100" 
    : "bg-emerald-50 text-emerald-600 border-emerald-100";
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles}`}>
      {text}
    </span>
  );
};

/****************************
 * 3. MAIN COMPONENT
 ****************************/
export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState(null);
  const [finalRanking, setFinalRanking] = useState([]);
  
  // STATE BARU: Untuk melacak metode sorting yang aktif
  const [sortBy, setSortBy] = useState('SAW'); // Default 'SAW'

  const handleCalculate = () => {
    // 1. Min/Max Global
    const max = {}, min = {};
    Object.keys(weights).forEach(k => {
      max[k] = Math.max(...dataProvinsi.map(d => d[k]));
      min[k] = Math.min(...dataProvinsi.map(d => d[k]));
    });

    // 2. LOGIKA SAW
    const sawResult = dataProvinsi.map(d => {
      let score = 0;
      const detail = {};
      
      Object.keys(weights).forEach(k => {
        const isCost = costCriteria.includes(k);
        const val = d[k];
        let norm = 0;
        let formulaTrace = ""; 

        if (isCost) {
          norm = min[k] / val;
          formulaTrace = `${min[k]} / ${val}`;
        } else {
          norm = val / max[k];
          formulaTrace = `${val} / ${max[k]}`;
        }

        const weighted = norm * weights[k];
        score += weighted;

        detail[k] = { 
          type: isCost ? 'Cost' : 'Benefit',
          raw: val,
          formulaNorm: formulaTrace,
          resNorm: norm.toFixed(4),
          formulaWeight: `${norm.toFixed(4)} × ${weights[k]}`,
          resWeight: weighted.toFixed(4)
        };
      });
      return { prov: d.prov, score: Number(score.toFixed(4)), detail };
    });

    // 3. LOGIKA SMART
    const smartResult = dataProvinsi.map(d => {
      let score = 0;
      const detail = {};
      
      Object.keys(weights).forEach(k => {
        const isCost = costCriteria.includes(k);
        const val = d[k];
        const range = max[k] - min[k]; 
        let util = 0;
        let formulaTrace = "";

        if (isCost) {
          util = (max[k] - val) / range;
          formulaTrace = `(${max[k]} - ${val}) / ${range.toFixed(2)}`;
        } else {
          util = (val - min[k]) / range;
          formulaTrace = `(${val} - ${min[k]}) / ${range.toFixed(2)}`;
        }

        const weighted = util * weights[k];
        score += weighted;

        detail[k] = { 
          type: isCost ? 'Cost' : 'Benefit',
          raw: val,
          formulaUtil: formulaTrace,
          resUtil: util.toFixed(4),
          formulaWeight: `${util.toFixed(4)} × ${weights[k]}`,
          resWeight: weighted.toFixed(4)
        };
      });
      return { prov: d.prov, score: Number(score.toFixed(4)), detail };
    });

    // 4. Combine & Initial Sort (Default by SAW)
    const combined = sawResult.map(s => {
      const sItem = smartResult.find(x => x.prov === s.prov);
      return {
        prov: s.prov,
        SAW: s.score,
        SMART: sItem?.score || 0,
        detailSAW: s.detail,
        detailSMART: sItem?.detail
      };
    }).sort((a, b) => b.SAW - a.SAW); // Default sort SAW saat pertama kali hitung

    setCalculationSteps({ max, min, saw: sawResult, smart: smartResult });
    setFinalRanking(combined);
    setShowResult(true);
    setSortBy('SAW'); // Reset sort to default
  };

  // FUNGSI BARU: Menangani Perubahan Sort
  const handleSortChange = (method) => {
    setSortBy(method);
    const sortedData = [...finalRanking].sort((a, b) => b[method] - a[method]);
    setFinalRanking(sortedData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 selection:bg-indigo-100">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              SPK
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Sanitasi Nasional</h1>
              <p className="text-xs text-slate-500 font-medium">Comparative Analysis: SAW vs SMART</p>
            </div>
          </div>
          
          {!showResult ? (
            <button
              onClick={handleCalculate}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-lg shadow-slate-200 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>🚀 Mulai Perhitungan</span>
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            >
              ↺ Reset Data
            </button>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* --- SECTION 1: KRITERIA & BOBOT --- */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Kriteria & Bobot
            </h2>
            <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm font-medium">
              Total Bobot: 1.0 (100%)
            </div>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Kode</th>
                    <th className="px-6 py-3 font-semibold">Kriteria</th>
                    <th className="px-6 py-3 font-semibold">Atribut</th>
                    <th className="px-6 py-3 font-semibold">Bobot</th>
                    <th className="px-6 py-3 font-semibold">Alasan / Justifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criteriaInfo.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3 font-mono text-slate-500 font-bold">{c.code}</td>
                      <td className="px-6 py-3 font-medium text-slate-700">{c.label}</td>
                      <td className="px-6 py-3">
                        <Badge type={c.type} text={c.type} />
                      </td>
                      <td className="px-6 py-3 font-mono font-bold text-slate-600">{c.weight}</td>
                      <td className="px-6 py-3 text-slate-500 italic text-xs">{c.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* --- SECTION 2: DATASET --- */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Dataset Awal
            </h2>
            <div className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {dataProvinsi.length} Entitas Provinsi
            </div>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Provinsi</th>
                    {criteriaInfo.map(h => (
                      <th key={h.key} className="px-6 py-4 font-semibold text-center">
                        <div className="flex flex-col items-center gap-1">
                          {h.key}
                          <Badge type={h.type} text={h.type} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataProvinsi.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{p.prov}</td>
                      {criteriaInfo.map((h, i) => (
                        <td key={i} className="px-6 py-4 text-center text-slate-600 font-mono">
                          {p[h.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {showResult && calculationSteps && (
          <>
            {/* --- SECTION 3: COMPARISON CHART & TABLE --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* RANKING TABLE */}
              <Card className="lg:col-span-1 h-fit flex flex-col">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <div>
                    <h3 className="font-bold text-slate-700">🏆 Hasil Perangkingan</h3>
                    <p className="text-xs text-slate-500 mt-1">Pilih metode sorting di bawah ini:</p>
                  </div>
                  
                  {/* FEATURE ADDED: SORTING TOGGLE */}
                  <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button 
                      onClick={() => handleSortChange('SAW')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        sortBy === 'SAW' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Berdasarkan SAW
                    </button>
                    <button 
                      onClick={() => handleSortChange('SMART')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        sortBy === 'SMART' 
                        ? 'bg-white text-fuchsia-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Berdasarkan SMART
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left w-12">#</th>
                        <th className="px-4 py-3 text-left">Provinsi</th>
                        <th className={`px-4 py-3 text-right ${sortBy === 'SAW' ? 'bg-indigo-50 text-indigo-700' : ''}`}>SAW</th>
                        <th className={`px-4 py-3 text-right ${sortBy === 'SMART' ? 'bg-fuchsia-50 text-fuchsia-700' : ''}`}>SMART</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {finalRanking.map((item, idx) => (
                        <tr key={item.prov} className={`hover:bg-slate-50/50 transition-colors ${idx === 0 ? 'bg-yellow-50/30' : ''}`}>
                          <td className="px-4 py-3 font-bold text-slate-400">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-slate-700">
                            {item.prov}
                            {idx === 0 && <span className="ml-2 text-xs">👑</span>}
                          </td>
                          <td className={`px-4 py-3 text-right font-mono font-bold ${sortBy === 'SAW' ? 'text-indigo-700' : 'text-slate-400'}`}>
                            {item.SAW}
                          </td>
                          <td className={`px-4 py-3 text-right font-mono font-bold ${sortBy === 'SMART' ? 'text-fuchsia-700' : 'text-slate-400'}`}>
                            {item.SMART}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* CHART VISUALIZATION */}
              <Card className="lg:col-span-2 flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-700">Visualisasi Perbandingan</h3>
                    <p className="text-xs text-slate-500 mt-1">Data diurutkan berdasarkan metode: <span className="font-bold uppercase text-slate-700">{sortBy}</span></p>
                  </div>
                  <div className="flex gap-2 text-xs font-medium">
                    <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div> SAW
                    </div>
                    <div className="flex items-center gap-1 bg-fuchsia-50 text-fuchsia-700 px-2 py-1 rounded">
                      <div className="w-2 h-2 rounded-full bg-fuchsia-500"></div> SMART
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={finalRanking} barGap={0}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="prov" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 10}} 
                        dy={10}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 12}} 
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9', opacity: 0.5}} />
                      <Bar 
                        dataKey="SAW" 
                        fill="#6366f1" 
                        radius={[4, 4, 0, 0]} 
                        // Jika sorted by SAW, highlight bar ini
                        fillOpacity={sortBy === 'SAW' ? 1 : 0.4}
                      />
                      <Bar 
                        dataKey="SMART" 
                        fill="#d946ef" 
                        radius={[4, 4, 0, 0]} 
                         // Jika sorted by SMART, highlight bar ini
                        fillOpacity={sortBy === 'SMART' ? 1 : 0.4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* --- SECTION 4: DETAILED CALCULATION LOG --- */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-slate-400 rounded-full"></span>
                Rincian Langkah Perhitungan (Step-by-Step)
              </h2>
              <p className="text-sm text-slate-500 mb-6 bg-slate-100 p-3 rounded-lg border border-slate-200">
                ℹ️ Catatan: Urutan tampilan di bawah ini tetap mengikuti urutan abjad/awal data, bukan hasil ranking, agar lebih mudah mengecek rumus per provinsi.
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* 1. SAW DETAILS */}
                <div className="space-y-4">
                  <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-200">
                    <h3 className="font-bold text-lg">Perhitungan Metode SAW</h3>
                    <div className="mt-3 bg-indigo-500/40 p-3 rounded-lg text-xs font-mono border border-indigo-400/30 space-y-1">
                      <p>Benefit: R = Nilai / Max</p>
                      <p>Cost: R = Min / Nilai</p>
                      <p>Score = Σ (Nilai Hasil Bobot)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {calculationSteps.saw.map((s) => (
                      <Card key={s.prov} className="p-0 border-indigo-100 flex flex-col">
                        <div className="px-4 py-3 bg-indigo-50/50 border-b border-indigo-100 flex justify-between items-center">
                          <span className="font-bold text-indigo-900">{s.prov}</span>
                          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                            Score Akhir: {s.score}
                          </span>
                        </div>
                        
                        <div className="p-4 grid gap-4 flex-grow">
                          {Object.entries(s.detail).map(([k, v]) => (
                            <div key={k} className="text-xs grid grid-cols-12 gap-2 items-center border-b border-dashed border-slate-200 pb-2 last:border-0 last:pb-0">
                              <div className="col-span-3 font-semibold text-slate-600 capitalize">{k}</div>
                              <div className="col-span-9 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-400 w-8">Norm</span>
                                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                    {v.formulaNorm}
                                  </code>
                                  <span className="text-slate-400">=</span>
                                  <span className="font-bold text-indigo-600 font-mono">{v.resNorm}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-400 w-8">Bobot</span>
                                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                    {v.formulaWeight}
                                  </code>
                                  <span className="text-slate-400">=</span>
                                  <span className="font-bold text-slate-800 font-mono">{v.resWeight}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 2. SMART DETAILS */}
                <div className="space-y-4">
                  <div className="bg-fuchsia-600 text-white p-5 rounded-2xl shadow-lg shadow-fuchsia-200">
                    <h3 className="font-bold text-lg">Perhitungan Metode SMART</h3>
                    <div className="mt-3 bg-fuchsia-500/40 p-3 rounded-lg text-xs font-mono border border-fuchsia-400/30 space-y-1">
                      <p>Utility: U = (Nilai - Min) / (Max - Min)</p>
                      <p className="opacity-80 italic">*Untuk Cost, posisi pembilang dibalik</p>
                      <p>Score = Σ (Nilai Hasil Bobot)</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {calculationSteps.smart.map((s) => (
                      <Card key={s.prov} className="p-0 border-fuchsia-100 flex flex-col">
                        <div className="px-4 py-3 bg-fuchsia-50/50 border-b border-fuchsia-100 flex justify-between items-center">
                          <span className="font-bold text-fuchsia-900">{s.prov}</span>
                          <span className="bg-fuchsia-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                            Score Akhir: {s.score}
                          </span>
                        </div>

                        <div className="p-4 grid gap-4 flex-grow">
                          {Object.entries(s.detail).map(([k, v]) => (
                            <div key={k} className="text-xs grid grid-cols-12 gap-2 items-center border-b border-dashed border-slate-200 pb-2 last:border-0 last:pb-0">
                              <div className="col-span-3 font-semibold text-slate-600 capitalize">{k}</div>
                              <div className="col-span-9 flex flex-col gap-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-400 w-8">Util</span>
                                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono text-[10px]">
                                    {v.formulaUtil}
                                  </code>
                                  <span className="text-slate-400">=</span>
                                  <span className="font-bold text-fuchsia-600 font-mono">{v.resUtil}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase tracking-wider text-slate-400 w-8">Bobot</span>
                                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                    {v.formulaWeight}
                                  </code>
                                  <span className="text-slate-400">=</span>
                                  <span className="font-bold text-slate-800 font-mono">{v.resWeight}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}