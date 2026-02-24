const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

const dataPath = path.join(__dirname, "../data/waveData.json");

function loadData() {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

// Get dataset time bounds
function getMeta() {
  const data = loadData();
  if (!data.length) return null;

  return {
    start: data[0].obstime,
    end: data[data.length - 1].obstime,
    intervalMinutes: 30
  };
}

// Filter data by time range
function getRange(from, to) {
  const data = loadData();

  const start = dayjs(from);
  const end = dayjs(to);

  const filtered = data.filter(row => {
    const t = dayjs(row.obstime);
    return t.isAfter(start) && t.isBefore(end);
  });

  // group by source
  const grouped = {};
  filtered.forEach(row => {
    if (!grouped[row.source]) grouped[row.source] = [];
    grouped[row.source].push(row);
  });

  return grouped;
}


module.exports = {
  getMeta,
  getRange
};
