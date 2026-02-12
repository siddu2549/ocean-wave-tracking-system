const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load data once at startup
const dataPath = path.join(__dirname, "data", "waveData.json");
let waveData = [];

try {
  const raw = fs.readFileSync(dataPath);
  waveData = JSON.parse(raw);
  console.log("Wave data loaded successfully");
} catch (err) {
  console.error("Error loading data:", err);
}

// Data validation function
function cleanData(data) {
  return data.map((d) => {
    return {
      ...d,
      longitude: d.longitude < 54 || d.longitude > 94 ? null : d.longitude,
      latitude: d.latitude < -20 || d.latitude > 23 ? null : d.latitude,
      hm0: d.hm0 <= 0 || d.hm0 > 1800 ? null : d.hm0,
      t1: d.t1 <= 0 || d.t1 > 30 ? null : d.t1,
      dirp: d.dirp < 0 || d.dirp > 360 ? null : d.dirp,
      cs: d.cs < 0 || d.cs > 350 ? null : d.cs,
    };
  });
}

// API Route
app.get("/api/wave-data", (req, res) => {
  const { start, end } = req.query;

  let filtered = waveData;

  if (start && end) {
    filtered = waveData.filter(
      (d) => new Date(d.obstime) >= new Date(start) &&
             new Date(d.obstime) <= new Date(end)
    );
  }

  const cleaned = cleanData(filtered);

  res.json(cleaned);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
