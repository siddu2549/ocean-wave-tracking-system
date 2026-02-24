import { useEffect, useState } from "react";
import { getMeta } from "./api/waveApi";
import { getRange } from "./api/waveApi";
import { transformWaveData } from "./utils/transformWaveData";
import ExplorerChart from "./components/ExplorerChart";
import OceanChart from "./components/OceanChart";






export default function App() {
  const [meta, setMeta] = useState(null);
  const [sample, setSample] = useState(null);

const loadSample = async () => {
  if (!meta) return;

  // backend gives "YYYY-MM-DD HH:mm:ss"
  const start = meta.start.replace(" ", "T");
  const end   = meta.end.replace(" ", "T");

  const raw = await getRange(start, end);

  const transformed = transformWaveData(raw);

  console.log("FULL DATASET:", transformed);
  setSample(transformed);
};




  useEffect(() => {
    getMeta().then(setMeta);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 px-6 py-6">
      <h1 className="text-3xl font-bold">Wave Analysis Workstation</h1>

      {!meta ? (
        <p className="text-slate-500">Connecting to buoy server...</p>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p><b>Dataset Start:</b> {meta.start}</p>
          <p><b>Dataset End:</b> {meta.end}</p>
          <p><b>Interval:</b> {meta.intervalMinutes} minutes</p>
        </div>
      )}
      <button
  onClick={loadSample}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
>
  Load Sample Range
</button>
{sample && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

    <OceanChart
      data={sample}
      xKey="time"
      yKey="hm0"
      title="Significant Wave Height vs Time"
    />

    <OceanChart
      data={sample}
      xKey="time"
      yKey="t1"
      title="Wave Period vs Time"
    />

    <OceanChart
      data={sample}
      xKey="time"
      yKey="cs"
      title="Current Speed vs Time"
    />

    <OceanChart
      data={sample}
      xKey="time"
      yKey="dirp"
      title="Wave Direction vs Time"
    />

  </div>
)}





    </div>
  );
}
