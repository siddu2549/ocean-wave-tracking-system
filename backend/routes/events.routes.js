const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/events.json");

// read events
function read() {
  return JSON.parse(fs.readFileSync(file));
}

// save events
function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// GET /events
router.get("/", (req, res) => {
  res.json(read());
});

// POST /events
router.post("/", (req, res) => {
  const events = read();
  events.push(req.body);
  write(events);
  res.json({ success: true });
});

module.exports = router;
