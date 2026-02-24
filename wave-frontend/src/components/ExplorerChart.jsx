import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function ExplorerChart({ data, title = "Chart" }) {
console.log("ExplorerChart render");
console.log("ExplorerChart instance", Math.random());

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const [zoomDomain, setZoomDomain] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const downPos = useRef(null);
  const moved = useRef(false);

  // ---------- RESIZE OBSERVER ----------
useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver(entries => {
    const rect = entries[0].contentRect;
    setSize({ width: rect.width, height: rect.height });
  });

  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);

  // ---------- DOMAIN HELPER ----------
  const percentileDomain = (values) => {
    const v = values.filter(d => d !== null && !isNaN(d)).sort((a,b)=>a-b);
    if (v.length < 5) return d3.extent(v);

    const p5 = d3.quantile(v, 0.05);
    const p95 = d3.quantile(v, 0.95);
    return [p5, p95];
  };

  // ---------- MAIN DRAW ----------
  useEffect(() => {
    if (!data?.source1?.time?.length) return;
    if (size.width === 0) return;

    // DATA
    const s1 = data.source1.time.map((t, i) => ({
      time: new Date(t * 1000),
      value: +data.source1.hm0[i]
    }));

    const s2 = data.source2.time.map((t, i) => ({
      time: new Date(t * 1000),
      value: +data.source2.hm0[i]
    }));

    const dataset = [...s1, ...s2].filter(d => isFinite(d.value));

    // DIMENSIONS
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = size.width - margin.left - margin.right;
    const height = 420 - margin.top - margin.bottom;

    // CANVAS SETUP
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // DOMAINS
    const fullX = d3.extent(dataset, d => d.time);
    const xDomain = zoomDomain || fullX;

    const visible1 = s1.filter(d => d.time >= xDomain[0] && d.time <= xDomain[1]);
    const visible2 = s2.filter(d => d.time >= xDomain[0] && d.time <= xDomain[1]);
    const visibleAll = [...visible1, ...visible2];

    if (visibleAll.length < 2) return;

    const [minBase, maxBase] = percentileDomain(visibleAll.map(d => d.value));
    const pad = (maxBase - minBase) * 0.35;

    const x = d3.scaleTime().domain(xDomain).range([0, width]);
    const y = d3.scaleLinear().domain([minBase - pad, maxBase + pad]).nice().range([height, 0]);

    // DRAW LINES
    ctx.clearRect(0, 0, width, height);

    const seriesList = [
      { name: "buoy", color: "#2563eb", data: visible1 },
      { name: "model", color: "#dc2626", data: visible2 }
    ];

    seriesList.forEach(series => {
      const faded = activeSeries && activeSeries !== series.name;

      ctx.globalAlpha = faded ? 0.15 : 1;
      ctx.lineWidth = faded ? 1 : 2.6;
      ctx.strokeStyle = series.color;
      ctx.beginPath();

      d3.line()
        .x(d => x(d.time))
        .y(d => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5))
        .context(ctx)(series.data);

      ctx.stroke();
    });

    ctx.globalAlpha = 1;

    // ---------- SVG ----------
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const spanHours = (xDomain[1] - xDomain[0]) / 3600000;

    let format, ticks;
    if (spanHours > 72) {
      format = d3.timeFormat("%b %d");
      ticks = d3.timeDay.every(1);
    } else if (spanHours > 6) {
      format = d3.timeFormat("%H:%M");
      ticks = d3.timeHour.every(6);
    } else {
      format = d3.timeFormat("%H:%M");
      ticks = d3.timeMinute.every(30);
    }

    const axisX = d3.axisBottom(x).ticks(ticks).tickFormat(format);
    const axisY = d3.axisLeft(y).ticks(6).tickFormat(d => d.toFixed(1));

    svg.append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(axisX);

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(axisY);

    // ---------- BRUSH ZOOM ----------
    const brush = d3.brushX()
      .extent([[margin.left, margin.top], [width + margin.left, height + margin.top]])
      .on("start", (event) => {
        downPos.current = d3.pointer(event);
        moved.current = false;
      })
      .on("brush", (event) => {
        const p = d3.pointer(event);
        if (!downPos.current) return;
        if (Math.abs(p[0] - downPos.current[0]) > 3) moved.current = true;
      })
      .on("end", (event) => {
        if (!event.selection || !moved.current) return;

        const [px0, px1] = event.selection;
        const t0 = x.invert(px0 - margin.left);
        const t1 = x.invert(px1 - margin.left);

        setZoomDomain([t0, t1]);
        svg.select(".brush").call(brush.move, null);
      });

    svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(g => g.selectAll(".selection")
        .attr("fill", "#3b82f6")
        .attr("fill-opacity", 0.25)
      );

  }, [data, zoomDomain, activeSeries, size]);

  return (
    <div
      ref={containerRef}
      onDoubleClick={() => setZoomDomain(null)}
      className="w-full bg-white rounded-xl shadow p-4 select-none"
    >
      <h2 className="text-lg font-semibold mb-2">
  {title}
</h2>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none"
          style={{ left: 60, top: 20 }}
        />
        <svg
          ref={svgRef}
          width="100%"
          height="420"
          className="cursor-crosshair"
        />
      </div>
    </div>
  );
}
