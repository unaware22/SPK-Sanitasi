
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

/****************************
 * DATA PROVINSI (CONTOH)
 * Ganti/extend sampai 38 provinsi
 ****************************/
const dataProvinsi = [
  { prov: "DKI Jakarta", sanitasi: 99.96, air: 99.96, diare: 22.5, stunting: 14.8, iklh: 68.3, kepadatan: 16100 },
  { prov: "Jawa Barat", sanitasi: 87.2, air: 90.1, diare: 31.2, stunting: 21.7, iklh: 66.5, kepadatan: 1400 },
  { prov: "Jawa Timur", sanitasi: 88.9, air: 91.3, diare: 29.4, stunting: 19.2, iklh: 67.1, kepadatan: 870 },
  { prov: "NTT", sanitasi: 63.5, air: 72.4, diare: 45.6, stunting: 35.3, iklh: 64.2, kepadatan: 110 },
  { prov: "Papua", sanitasi: 41.8, air: 58.7, diare: 49.1, stunting: 32.1, iklh: 69.4, kepadatan: 10 }
];

/****************************
 * BOBOT KRITERIA
 ****************************/
const weights = {
  sanitasi: 0.2,
  air: 0.2,
  diare: 0.2,
  stunting: 0.2,
  iklh: 0.1,
  kepadatan: 0.1
};

// cost = makin kecil makin baik
const costCriteria = ["diare", "stunting", "kepadatan"];

/****************************
 * FUNGSI SAW
 ****************************/
function calculateSAW(data) {
  const max = {}, min = {};
  Object.keys(weights).forEach(k => {
    max[k] = Math.max(...data.map(d => d[k]));
    min[k] = Math.min(...data.map(d => d[k]));
  });

  const steps = data.map(d => {
    let score = 0;
    const detail = {};
    Object.keys(weights).forEach(k => {
      let norm = costCriteria.includes(k)
        ? min[k] / d[k]
        : d[k] / max[k];
      const weighted = norm * weights[k];
      detail[k] = { norm, weighted };
      score += weighted;
    });
    return { prov: d.prov, score: Number(score.toFixed(4)), detail };
  });

  return steps.sort((a, b) => b.score - a.score);
}

/****************************
 * FUNGSI SMART
 ****************************/
function calculateSMART(data) {
  const max = {}, min = {};
  Object.keys(weights).forEach(k => {
    max[k] = Math.max(...data.map(d => d[k]));
    min[k] = Math.min(...data.map(d => d[k]));
  });

  const steps = data.map(d => {
    let score = 0;
    const detail = {};
    Object.keys(weights).forEach(k => {
      let util = costCriteria.includes(k)
        ? (max[k] - d[k]) / (max[k] - min[k])
        : (d[k] - min[k]) / (max[k] - min[k]);
      const weighted = util * weights[k];
      detail[k] = { util, weighted };
      score += weighted;
    });
    return { prov: d.prov, score: Number(score.toFixed(4)), detail };
  });

  return steps.sort((a, b) => b.score - a.score);
}

/****************************
 * APP UTAMA
 ****************************/
export default function App() {
  const [show, setShow] = useState(false);
  const saw = calculateSAW(dataProvinsi);
  const smart = calculateSMART(dataProvinsi);

  const chartData = saw.map((s, i) => ({
    prov: s.prov,
    SAW: s.score,
    SMART: smart.find(x => x.prov === s.prov)?.score
  }));

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">SPK Prioritas Sanitasi Nasional (SAW & SMART)</h1>

      <button onClick={() => setShow(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
        HITUNG & TAMPILKAN HASIL
      </button>

      {show && (
        <>
          {/* TABEL DATA */}
          <h2 className="mt-6 font-semibold">Data Alternatif (Provinsi)</h2>
          <table className="border mt-2 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(dataProvinsi[0]).map(h => (
                  <th key={h} className="border p-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataProvinsi.map(p => (
                <tr key={p.prov}>
                  {Object.values(p).map((v, i) => (
                    <td key={i} className="border p-2">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* RANKING */}
          <h2 className="mt-6 font-semibold">Hasil Perangkingan</h2>
          <table className="border mt-2 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Provinsi</th>
                <th className="border p-2">SAW</th>
                <th className="border p-2">SMART</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((d, i) => (
                <tr key={d.prov}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{d.prov}</td>
                  <td className="border p-2">{d.SAW}</td>
                  <td className="border p-2">{d.SMART}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* GRAFIK */}
          <h2 className="mt-6 font-semibold">Perbandingan Metode</h2>
          <BarChart width={600} height={300} data={chartData}>
            <XAxis dataKey="prov" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SAW" />
            <Bar dataKey="SMART" />
          </BarChart>

          {/* ANALISIS */}
          <div className="mt-4 text-sm">
            <b>Analisis:</b> SAW lebih sensitif terhadap nilai ekstrem pada kriteria cost,
            sedangkan SMART lebih stabil karena menggunakan fungsi utilitas.
            Perbedaan peringkat terlihat jelas pada provinsi dengan kepadatan dan sanitasi yang kontras.
          </div>
        </>
      )}
    </div>
  );
}
