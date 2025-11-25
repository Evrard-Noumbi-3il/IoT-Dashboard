import client from 'prom-client';
import { getLatestSensor } from './sensors.js';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

export const gauges = {
    temperature: new client.Gauge({ name: 'sensor_temperature_c', help: 'Temperature in Celsius' }),
    humidity: new client.Gauge({ name: 'sensor_humidity_percent', help: 'Humidity %' }),
    co2: new client.Gauge({ name: 'sensor_co2_ppm', help: 'CO2 ppm' }),
    light: new client.Gauge({ name: 'sensor_light_lux', help: 'Light intensity lux' }),
    noise: new client.Gauge({ name: 'sensor_noise_db', help: 'Noise dB' }),
    pressure: new client.Gauge({ name: 'sensor_pressure_hpa', help: 'Pressure hPa' }),
    pm25: new client.Gauge({ name: 'sensor_pm25_ug_m3', help: 'PM2.5 µg/m³' }),
};

export function updateMetrics() {
    const latest = getLatestSensor();
    for (const key in gauges) {
        gauges[key].set(latest[key]);
    }
}

setInterval(updateMetrics, 5000);

export { client };
