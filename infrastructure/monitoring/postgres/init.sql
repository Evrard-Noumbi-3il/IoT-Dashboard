CREATE TABLE IF NOT EXISTS measurements (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW(),
  temperature FLOAT,
  humidity FLOAT,
  co2 FLOAT,
  light FLOAT,
  noise FLOAT,
  pressure FLOAT,
  pm25 FLOAT
);
