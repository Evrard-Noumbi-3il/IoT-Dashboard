import React, { useState, useEffect } from 'react';
import { fetchLatest } from './api';
import SensorCard from './components/SensorCard';
import Graph from './components/Graph';
import { Thermometer, Droplets, Wind, Sun, Volume2, Gauge, Cloud } from 'lucide-react';
import './App.css';

function App() {
  const [latest, setLatest] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const updateData = async () => {
      const data = await fetchLatest();
      setLatest(data);
      setHistory(prev => [...prev, data].slice(-20));
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const sensors = [
    { key: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer, color: '#FF6B6B' },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, color: '#4ECDC4' },
    { key: 'co2', label: 'CO₂', unit: 'ppm', icon: Wind, color: '#95E1D3' },
    { key: 'light', label: 'Light', unit: 'lux', icon: Sun, color: '#FFE66D' },
    { key: 'noise', label: 'Noise', unit: 'dB', icon: Volume2, color: '#A8E6CF' },
    { key: 'pressure', label: 'Pressure', unit: 'hPa', icon: Gauge, color: '#C7CEEA' },
    { key: 'pm25', label: 'PM2.5', unit: 'µg/m³', icon: Cloud, color: '#B4A7D6' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            color: '#fff', 
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: '-1px'
          }}>
            IoT Dashboard
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '1.1rem',
            fontWeight: '400'
          }}>
            Real-time environmental monitoring
          </p>
        </header>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          margin: '-0.5rem'
        }}>
          {sensors.map(sensor => (
            <SensorCard
              key={sensor.key}
              label={sensor.label}
              value={latest[sensor.key]}
              unit={sensor.unit}
              icon={sensor.icon}
              color={sensor.color}
            />
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          marginTop: '1rem',
          margin: '-0.5rem'
        }}>
          {sensors.map(sensor => (
            <Graph
              key={sensor.key}
              data={history}
              dataKey={sensor.key}
              label={`${sensor.label} (${sensor.unit})`}
              color={sensor.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
