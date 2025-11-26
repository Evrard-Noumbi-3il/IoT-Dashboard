import express from "express";
import cors from "cors";
import sensorsRoute from "./sensors.js";
import { metricsRegister, metrics } from "./metrics.js";
import pool from "./db.js";

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Route Prometheus
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", metricsRegister.contentType);
    res.send(await metricsRegister.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// API Routes
app.use("/api/sensors", sensorsRoute);

// Insert fake data every 5 seconds (optional)
setInterval(async () => {
  const data = {
    temperature: (20 + Math.random() * 5).toFixed(2),
    humidity: (40 + Math.random() * 20).toFixed(2),
    co2: (500 + Math.random() * 200).toFixed(2),
    light: (100 + Math.random() * 900).toFixed(2),
    noise: (20 + Math.random() * 50).toFixed(2),
    pressure: (1000 + Math.random() * 30).toFixed(2),
    pm25: (2 + Math.random() * 8).toFixed(2),
  };

  try {
    await pool.query(
      `INSERT INTO measurements 
       (temperature, humidity, co2, light, noise, pressure, pm25)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        data.temperature,
        data.humidity,
        data.co2,
        data.light,
        data.noise,
        data.pressure,
        data.pm25,
      ]
    );

    // Update Prometheus metrics
    metrics.temperatureGauge.set(Number(data.temperature));
    metrics.humidityGauge.set(Number(data.humidity));
    metrics.co2Gauge.set(Number(data.co2));
    metrics.lightGauge.set(Number(data.light));
    metrics.noiseGauge.set(Number(data.noise));
    metrics.pressureGauge.set(Number(data.pressure));
    metrics.pm25Gauge.set(Number(data.pm25));

  } catch (err) {
    console.error("DB insert error:", err);
  }
}, 5000);

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
