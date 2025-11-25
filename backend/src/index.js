import express from 'express';
import cors from 'cors';
import { getLatestSensor, getHistory } from './sensors.js';
import { client, updateMetrics } from './metrics.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/sensors/latest', (req, res) => {
    res.json(getLatestSensor());
});

app.get('/api/sensors/history', (req, res) => {
    res.json(getHistory());
});

app.get('/metrics', async (req, res) => {
    updateMetrics();
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
