const express = require("express");
const cors = require("cors");

const waveRoutes = require("./routes/wave.routes");
const eventRoutes = require("./routes/events.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/wave", waveRoutes);
app.use("/events", eventRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
