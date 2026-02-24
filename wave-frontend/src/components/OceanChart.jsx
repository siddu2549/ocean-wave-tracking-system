import ExplorerChart from "./ExplorerChart";

export default function OceanCharts({ data }) {
  if (!data) return null;

  return (
    <div className="w-full flex flex-col gap-8">

      {/* Wave Height */}
      <div className="w-full">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.hm0 },
            source2: { time: data.source2.time, hm0: data.source2.hm0 }
          }}
          title="Significant Wave Height (cm)"
        />
      </div>

      {/* Wave Period */}
      <div className="w-full">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.t1 },
            source2: { time: data.source2.time, hm0: data.source2.t1 }
          }}
          title="Wave Period (s)"
        />
      </div>

      {/* Wave Direction */}
      <div className="w-full">
        <ExplorerChart
          data={{
            source1: { time: data.source1.time, hm0: data.source1.dirp },
            source2: { time: data.source2.time, hm0: data.source2.dirp }
          }}
          title="Wave Direction (deg)"
        />
      </div>

      {/* Current Speed */}
      <div className="w-full">
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
