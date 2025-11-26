import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const temperatureGauge = new client.Gauge({
  name: "iot_temperature",
  help: "Temperature value",
});
const humidityGauge = new client.Gauge({
  name: "iot_humidity",
  help: "Humidity value",
});
const co2Gauge = new client.Gauge({
  name: "iot_co2",
  help: "CO2 level",
});
const lightGauge = new client.Gauge({
  name: "iot_light",
  help: "Light level",
});
const noiseGauge = new client.Gauge({
  name: "iot_noise",
  help: "Noise level",
});
const pressureGauge = new client.Gauge({
  name: "iot_pressure",
  help: "Pressure (Pa)",
});
const pm25Gauge = new client.Gauge({
  name: "iot_pm25",
  help: "PM2.5 (air quality)",
});

register.registerMetric(temperatureGauge);
register.registerMetric(humidityGauge);
register.registerMetric(co2Gauge);
register.registerMetric(lightGauge);
register.registerMetric(noiseGauge);
register.registerMetric(pressureGauge);
register.registerMetric(pm25Gauge);

export const metricsRegister = register;
export const metrics = {
  temperatureGauge,
  humidityGauge,
  co2Gauge,
  lightGauge,
  noiseGauge,
  pressureGauge,
  pm25Gauge,
};
