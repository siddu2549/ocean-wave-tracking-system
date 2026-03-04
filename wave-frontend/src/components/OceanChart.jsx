import ExplorerChart from "./ExplorerChart";


export default function OceanCharts({ data }) {
  if (!data) return null;
console.log("OceanCharts data:", data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
    {/* Latitude */}
<div className="bg-white rounded-xl shadow-md p-4">
  <ExplorerChart
    data={{
      source1: { time: data.source1.time, hm0: data.source1.lat },
      source2: { time: data.source2.time, hm0: data.source2.lat }
    }}
    title="Latitude"
  />
</div>
{/* Longitude */}
<div className="bg-white rounded-xl shadow-md p-4">
  <ExplorerChart
    data={{
      source1: { time: data.source1.time, hm0: data.source1.lon },
      source2: { time: data.source2.time, hm0: data.source2.lon }
    }}
    title="Longitude"
  />
</div>
      {/* Wave Height */}
     <div className="bg-white rounded-xl shadow-md p-4">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.hm0 },
            source2: { time: data.source2.time, hm0: data.source2.hm0 }
          }}
          title="Significant Wave Height (cm)"
        />
      </div>

      {/* Wave Period */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.t1 },
            source2: { time: data.source2.time, hm0: data.source2.t1 }
          }}
          title="Wave Period (s)"
        />
      </div>

      {/* Wave Direction */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.dirp },
            source2: { time: data.source2.time, hm0: data.source2.dirp }
          }}
          title="Wave Direction (deg)"
        />
      </div>

      {/* Current Speed */}
    <div className="bg-white rounded-xl shadow-md p-4">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.cs },
            source2: { time: data.source2.time, hm0: data.source2.cs }
          }}
          title="Current Speed (cm/s)"
        />
      </div>

      
    </div>
  );
}
