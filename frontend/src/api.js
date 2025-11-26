import axios from 'axios';

// Si on est dans Docker, le nom du service backend est "backend"
const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:4000/api/sensors';

export const fetchLatest = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest`);
    return response.data;
  } catch (err) {
    console.error("Fetch latest error:", err);
    return {};
  }
};

export const fetchHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  } catch (err) {
    console.error("Fetch history error:", err);
    return [];
  }
};
