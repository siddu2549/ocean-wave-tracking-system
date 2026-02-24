import Plot from "react-plotly.js";

export default function WaveHeightChart({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">
        Significant Wave Height (m)
      </h2>

      <Plot
        data={[
          {
            x: data.source1.time,
            y: data.source1.hm0,
            type: "scatter",
            mode: "lines",
            name: "Observed Buoy",
            line: { color: "#2563eb", width: 2 }
          },
          {
            x: data.source2.time,
            y: data.source2.hm0,
            type: "scatter",
            mode: "lines",
            name: "Model Data",
            line: { color: "#dc2626", width: 2 }
          }
        ]}
        layout={{
  autosize: true,
  height: 350,
  margin: { l: 60, r: 30, t: 10, b: 60 },

  xaxis: {
    title: "Time",
    type: "date",
    showgrid: true
  },

  yaxis: {
    title: "Wave Height (cm)",
    showgrid: true
  },

  hovermode: "x unified",
  legend: { orientation: "h", y: -0.25 }
}}

        config={{ responsive: true }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
