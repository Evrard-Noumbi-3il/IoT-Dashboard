const sensors = [];

export function generateSensorData() {
    const data = {
        timestamp: new Date(),
        temperature: +(18 + Math.random() * 12).toFixed(2),
        humidity: +(35 + Math.random() * 35).toFixed(2),
        co2: +(300 + Math.random() * 900).toFixed(0),
        light: +(100 + Math.random() * 900).toFixed(0),
        noise: +(30 + Math.random() * 50).toFixed(1),
        pressure: +(990 + Math.random() * 20).toFixed(1),
        pm25: +(5 + Math.random() * 45).toFixed(1)
    };
    sensors.push(data);
    if (sensors.length > 100) sensors.shift();
    return data;
}

// Générer toutes les 5 secondes
setInterval(generateSensorData, 5000);

export function getLatestSensor() {
    return sensors[sensors.length - 1] || generateSensorData();
}

export function getHistory() {
    return sensors;
}