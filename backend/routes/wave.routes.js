const express = require("express");
const router = express.Router();
const { getMeta, getRange } = require("../services/wave.service");

// GET /wave/meta
router.get("/meta", (req, res) => {
  res.json(getMeta());
});

// GET /wave?from=&to=
router.get("/", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "from and to required" });
  }

  const data = getRange(from, to);
  res.json(data);
});

module.exports = router;
