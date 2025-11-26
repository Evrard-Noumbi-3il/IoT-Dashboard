import express from "express";
import pool from "./db.js";

const router = express.Router();

// Get latest measurement
router.get("/latest", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM measurements ORDER BY timestamp DESC LIMIT 1`
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("Error latest:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get history (last 100 rows)
router.get("/history", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM measurements ORDER BY timestamp DESC LIMIT 100`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error history:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
