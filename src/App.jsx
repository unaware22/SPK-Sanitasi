import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/****************************
 * 1. DATA INITIAL (DEFAULT)
 ****************************/

const initialCriteria = [
  { id: 1, code: "C1", key: "sanitasi", label: "Sanitasi Layak", weight: 0.20, type: "Cost", reason: "Infrastruktur dasar utama pencegahan penyakit." },
  { id: 2, code: "C2", key: "air", label: "Air Minum Layak", weight: 0.20, type: "Cost", reason: "Kebutuhan vital untuk kehidupan higienis." },
  { id: 3, code: "C3", key: "diare", label: "Prevalensi Diare", weight: 0.20, type: "Benefit", reason: "Indikator dampak kesehatan jangka pendek." },
  { id: 4, code: "C4", key: "stunting", label: "Prevalensi Stunting", weight: 0.20, type: "Benefit", reason: "Indikator dampak kesehatan jangka panjang." },
  { id: 5, code: "C5", key: "iklh", label: "Indeks Lingkungan", weight: 0.10, type: "Cost", reason: "Indikator makro kualitas ekosistem daerah." },
  { id: 6, code: "C6", key: "kepadatan", label: "Kepadatan Penduduk", weight: 0.10, type: "Benefit", reason: "Faktor risiko yang mempercepat penularan." },
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
  // --- STATE MANAGEMENT ---
  const [criteria, setCriteria] = useState(initialCriteria);
  const [showResult, setShowResult] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState(null);
  const [finalRanking, setFinalRanking] = useState([]);
  const [sortBy, setSortBy] = useState('SAW');

  // --- HANDLER: UBAH BOBOT ---
  const handleWeightChange = (id, newVal) => {
    const val = newVal === "" ? 0 : parseFloat(newVal);
    setCriteria(prevCriteria => 
      prevCriteria.map(c => 
        c.id === id ? { ...c, weight: val } : c
      )
    );
    if (showResult) setShowResult(false);
  };

  const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);
  const isWeightValid = Math.abs(totalWeight - 1.0) < 0.001;

  // --- LOGIC: PERHITUNGAN ---
  const handleCalculate = () => {
    const currentWeights = {};
    const costCriteria = [];
    
    criteria.forEach(c => {
      currentWeights[c.key] = c.weight;
      if (c.type === "Cost") costCriteria.push(c.key);
    });

    // Min/Max Global
    const max = {}, min = {};
    Object.keys(currentWeights).forEach(k => {
      max[k] = Math.max(...dataProvinsi.map(d => d[k]));
      min[k] = Math.min(...dataProvinsi.map(d => d[k]));
    });

    // LOGIKA SAW
    const sawResult = dataProvinsi.map(d => {
      let score = 0;
      const detail = {};
      
      Object.keys(currentWeights).forEach(k => {
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

        const weighted = norm * currentWeights[k];
        score += weighted;

        detail[k] = { 
          type: isCost ? 'Cost' : 'Benefit',
          raw: val,
          formulaNorm: formulaTrace,
          resNorm: norm.toFixed(4),
          formulaWeight: `${norm.toFixed(4)} × ${currentWeights[k]}`,
          resWeight: weighted.toFixed(4)
        };
      });
      return { prov: d.prov, score: Number(score.toFixed(4)), detail };
    });

    // LOGIKA SMART
    const smartResult = dataProvinsi.map(d => {
      let score = 0;
      const detail = {};
      
      Object.keys(currentWeights).forEach(k => {
        const isCost = costCriteria.includes(k);
        const val = d[k];
        const range = max[k] - min[k]; 
        let util = 0;
        let formulaTrace = "";

        const safeRange = range === 0 ? 1 : range;

        if (isCost) {
          util = (max[k] - val) / safeRange;
          formulaTrace = `(${max[k]} - ${val}) / ${safeRange.toFixed(2)}`;
        } else {
          util = (val - min[k]) / safeRange;
          formulaTrace = `(${val} - ${min[k]}) / ${safeRange.toFixed(2)}`;
        }

        const weighted = util * currentWeights[k];
        score += weighted;

        detail[k] = { 
          type: isCost ? 'Cost' : 'Benefit',
          raw: val,
          formulaUtil: formulaTrace,
          resUtil: util.toFixed(4),
          formulaWeight: `${util.toFixed(4)} × ${currentWeights[k]}`,
          resWeight: weighted.toFixed(4)
        };
      });
      return { prov: d.prov, score: Number(score.toFixed(4)), detail };
    });

    const combined = sawResult.map(s => {
      const sItem = smartResult.find(x => x.prov === s.prov);
      return {
        prov: s.prov,
        SAW: s.score,
        SMART: sItem?.score || 0,
        detailSAW: s.detail,
        detailSMART: sItem?.detail
      };
    }).sort((a, b) => b.SAW - a.SAW);

    setCalculationSteps({ max, min, saw: sawResult, smart: smartResult });
    setFinalRanking(combined);
    setShowResult(true);
    setSortBy('SAW'); 
  };

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
              <p className="text-xs text-slate-500 font-medium">Perbandingan SAW dan SMART</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${
                isWeightValid 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
               <span>Σ Bobot: {totalWeight.toFixed(2)}</span>
               {!isWeightValid && <span title="Total bobot idealnya 1.0">⚠️</span>}
            </div>

            <button
              onClick={handleCalculate}
              // PERUBAHAN DISINI: Disabled jika Result muncul ATAU bobot tidak valid
              disabled={showResult || !isWeightValid} 
              className={`px-6 py-2.5 font-medium rounded-xl shadow-lg transition-all transform flex items-center gap-2
                ${showResult || !isWeightValid
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                  : "bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5 active:scale-95 shadow-slate-200"
                }`}
            >
              <span>🚀 Mulai Perhitungan</span>
            </button>
            
            {showResult && (
               <button
               onClick={() => setShowResult(false)}
               className="px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors border border-slate-200 rounded-lg hover:bg-slate-50"
             >
               ↺ Reset & Edit
             </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* --- SECTION 1: KRITERIA & INPUT BOBOT --- */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Input Bobot Kriteria
            </h2>
            <div className="text-xs text-slate-500 italic">
              *Silakan ubah nilai bobot di bawah ini sebelum menghitung
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
                    <th className="px-6 py-3 font-semibold w-32">Input Bobot</th>
                    <th className="px-6 py-3 font-semibold">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criteria.map((c, idx) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3 font-mono text-slate-500 font-bold">{c.code}</td>
                      <td className="px-6 py-3 font-medium text-slate-700">{c.label}</td>
                      <td className="px-6 py-3">
                        <Badge type={c.type} text={c.type} />
                      </td>
                      <td className="px-6 py-3">
                        <div className="relative">
                          <input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            max="1"
                            value={c.weight}
                            onChange={(e) => handleWeightChange(c.id, e.target.value)}
                            className={`w-full px-3 py-1.5 border rounded-lg font-mono font-bold text-center focus:outline-none focus:ring-2 transition-all
                              ${c.weight === 0 ? "text-slate-300 border-slate-200" : "text-emerald-700 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-200"}`}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-500 italic text-xs">{c.reason}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={3} className="px-6 py-3 text-right text-slate-600 uppercase text-xs tracking-wider">Total Bobot:</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-mono 
                        ${isWeightValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600 animate-pulse"}`}>
                        {totalWeight.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-400">Target: 1.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* --- SECTION 2: DATASET (READ ONLY) --- */}
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
                    {criteria.map(h => (
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
                      {criteria.map((h, i) => (
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

        {/* --- HASIL PERHITUNGAN --- */}
        {showResult && calculationSteps && (
          <>
            {/* --- SECTION 3: COMPARISON CHART & TABLE --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
              
              {/* RANKING TABLE */}
              <Card className="lg:col-span-1 h-fit flex flex-col">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <div>
                    <h3 className="font-bold text-slate-700">🏆 Hasil Perangkingan</h3>
                    <p className="text-xs text-slate-500 mt-1">Menggunakan bobot yang Anda input.</p>
                  </div>
                  
                  <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button 
                      onClick={() => handleSortChange('SAW')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        sortBy === 'SAW' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      SAW Rank
                    </button>
                    <button 
                      onClick={() => handleSortChange('SMART')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        sortBy === 'SMART' 
                        ? 'bg-white text-fuchsia-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      SMART Rank
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left w-12 bg-slate-50">#</th>
                        <th className="px-4 py-3 text-left bg-slate-50">Provinsi</th>
                        <th className={`px-4 py-3 text-right ${sortBy === 'SAW' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50'}`}>SAW</th>
                        <th className={`px-4 py-3 text-right ${sortBy === 'SMART' ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-slate-50'}`}>SMART</th>
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
                    <h3 className="font-bold text-slate-700">Visualisasi Grafik</h3>
                    <p className="text-xs text-slate-500 mt-1">Data diurutkan berdasarkan: <span className="font-bold uppercase text-slate-700">{sortBy}</span></p>
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
                <div className="p-6 flex-1 min-h-[400px]">
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
                        height={80}
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
                        fillOpacity={sortBy === 'SAW' ? 1 : 0.3}
                        animationDuration={1000}
                      />
                      <Bar 
                        dataKey="SMART" 
                        fill="#d946ef" 
                        radius={[4, 4, 0, 0]} 
                        fillOpacity={sortBy === 'SMART' ? 1 : 0.3}
                        animationDuration={1000}
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
                Rincian Langkah Perhitungan (Traceability)
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* 1. SAW DETAILS */}
                <div className="space-y-4">
                  <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-200">
                    <h3 className="font-bold text-lg">Metode SAW</h3>
                    <p className="text-xs text-indigo-200 mt-1">Benefit: R = Nilai / Max <br /> Cost: R = Min / Nilai <br /> Skor Akhir = Σ (Bobot x R)</p>
                  </div>
                  <div className="space-y-4">
                    {calculationSteps.saw.map((s) => (
                      <Card key={s.prov} className="p-0 border-indigo-100 flex flex-col">
                        {/* --- MODIFIKASI: Skor ada di pojok kanan atas (Biru) --- */}
                        <div className="px-4 py-3 bg-indigo-50/50 border-b border-indigo-100 flex justify-between items-center">
                          <span className="font-bold text-indigo-900">{s.prov}</span>
                          <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-mono font-bold shadow-sm">
                            {s.score}
                          </span>
                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className="p-4 grid gap-3">
                          {Object.entries(s.detail).map(([k, v]) => (
                            <div key={k} className="text-xs grid grid-cols-12 gap-2 items-center border-b border-dashed border-slate-100 pb-2">
                              <div className="col-span-2 font-semibold text-slate-600 capitalize">{k}</div>
                              <div className="col-span-10 flex flex-col gap-1">
                                <div className="flex gap-2">
                                  <span className="text-slate-400 w-6">Norm:</span>
                                  <code className="bg-slate-100 px-1 rounded text-slate-600">{v.formulaNorm} = <strong>{v.resNorm}</strong></code>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-slate-400 w-6">W:</span>
                                  <code className="bg-slate-100 px-1 rounded text-slate-600">{v.formulaWeight} = <strong className="text-indigo-600">{v.resWeight}</strong></code>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                          <div className="text-[10px] text-slate-400 mb-1">Pembuktian (Σ Bobot):</div>
                          <div className="font-mono text-xs text-slate-600 break-words leading-relaxed bg-white p-2 border border-slate-100 rounded">
                              {Object.values(s.detail).map(d => d.resWeight).join(" + ")} = <strong>{s.score}</strong>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 2. SMART DETAILS */}
                <div className="space-y-4">
                  <div className="bg-fuchsia-600 text-white p-5 rounded-2xl shadow-lg shadow-fuchsia-200">
                    <h3 className="font-bold text-lg">Metode SMART</h3>
                    <p className="text-xs text-fuchsia-200 mt-1">Benefit: U = (Nilai - Min) / (Max - Min) <br /> Cost: U = (Max - Nilai) / (Max - Min) <br /> Skor Akhir = Σ (Bobot x U)</p>
                  </div>
                  <div className="space-y-4">
                    {calculationSteps.smart.map((s) => (
                      <Card key={s.prov} className="p-0 border-fuchsia-100 flex flex-col">
                        {/* --- MODIFIKASI: Skor ada di pojok kanan atas (Pink) --- */}
                        <div className="px-4 py-3 bg-fuchsia-50/50 border-b border-fuchsia-100 flex justify-between items-center">
                          <span className="font-bold text-fuchsia-900">{s.prov}</span>
                          <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-lg text-sm font-mono font-bold shadow-sm">
                            {s.score}
                          </span>
                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className="p-4 grid gap-3">
                          {Object.entries(s.detail).map(([k, v]) => (
                            <div key={k} className="text-xs grid grid-cols-12 gap-2 items-center border-b border-dashed border-slate-100 pb-2">
                              <div className="col-span-2 font-semibold text-slate-600 capitalize">{k}</div>
                              <div className="col-span-10 flex flex-col gap-1">
                                <div className="flex gap-2">
                                  <span className="text-slate-400 w-6">Util:</span>
                                  <code className="bg-slate-100 px-1 rounded text-slate-600 text-[10px]">{v.formulaUtil} = <strong>{v.resUtil}</strong></code>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-slate-400 w-6">W:</span>
                                  <code className="bg-slate-100 px-1 rounded text-slate-600">{v.formulaWeight} = <strong className="text-fuchsia-600">{v.resWeight}</strong></code>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                          <div className="text-[10px] text-slate-400 mb-1">Pembuktian (Σ Bobot):</div>
                          <div className="font-mono text-xs text-slate-600 break-words leading-relaxed bg-white p-2 border border-slate-100 rounded">
                              {Object.values(s.detail).map(d => d.resWeight).join(" + ")} = <strong>{s.score}</strong>
                          </div>
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