import { useEffect, useState } from "react";
import { getMeta, getRange } from "./api/waveApi";
import { transformWaveData } from "./utils/transformWaveData";
import OceanChart from "./components/OceanChart";

export default function App() {
  const [meta, setMeta] = useState(null);
  const [sample, setSample] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("Visakhapatnam");

  // ---------------- LOAD FULL RANGE ----------------
  const loadSample = async () => {
    if (!meta) return;

    const start = meta.start.replace(" ", "T");
    const end = meta.end.replace(" ", "T");

    const raw = await getRange(start, end, location);
    setSample(transformWaveData(raw));
  };

  // ---------------- LOAD CUSTOM RANGE ----------------
  const loadCustomRange = async () => {
    if (!startDate || !endDate) return;

    const start = startDate + "T00:00:00";
    const end = endDate + "T23:59:59";

    const raw = await getRange(start, end, location);
    setSample(transformWaveData(raw));
  };

  // ---------------- FETCH META ----------------
  useEffect(() => {
    getMeta().then(data => {
      setMeta(data);
      setStartDate(data.start.split(" ")[0]);
      setEndDate(data.end.split(" ")[0]);
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 to-slate-200">

      {/* ================= HEADER ================= */}
      <div className="w-full bg-slate-900 text-white py-6 shadow-lg">
        <div className="w-full px-6 text-center">
          <h1 className="text-4xl font-bold tracking-wide">
            Wave Analysis Workstation
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Real-Time Ocean Monitoring Dashboard
          </p>
        </div>
      </div>

      {/* ================= CONTROL PANEL ================= */}
      <div className="w-full bg-white shadow-md border-b px-6 py-4 flex flex-wrap justify-between items-end gap-6">

        {/* Dataset Info */}
        {meta && (
          <div className="text-sm text-slate-600">
            <div><b>Dataset Start:</b> {meta.start}</div>
            <div><b>Dataset End:</b> {meta.end}</div>
            <div><b>Interval:</b> {meta.intervalMinutes} minutes</div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-end gap-4">

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-500">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-slate-300 rounded px-3 py-1 bg-white"
            >
              <option>Visakhapatnam</option>
              <option>Chennai</option>
              <option>Mumbai</option>
              <option>Goa</option>
              <option>Kochi</option>
              <option>Puri</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-500">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-slate-300 rounded px-3 py-1"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-500">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-slate-300 rounded px-3 py-1"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={loadCustomRange}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition"
          >
            Submit
          </button>

          <button
            onClick={loadSample}
            className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-md shadow-md transition"
          >
            Full Range
          </button>

        </div>
      </div>

      {/* ================= INFO STRIP ================= */}
      <div className="w-full px-6 py-3 text-sm text-slate-600 flex justify-between bg-slate-50 border-b">
        <div>📍 Location: <b>{location}</b></div>
        <div>📡 Data Source: Buoy + Model</div>
        <div>🕒 30 Minute Interval</div>
      </div>
      
      {/* ================= CHARTS ================= */}
      {sample && (
        <div className="w-full px-6 py-6">
          <OceanChart data={sample} />
        </div>
      )}

    </div>
  );
}

