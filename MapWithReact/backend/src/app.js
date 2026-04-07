const express = require("express");
const cors = require("cors");
const shapeRoutes = require("./routes/shapeRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/shapes", shapeRoutes);
app.use(errorHandler);

module.exports = app;
