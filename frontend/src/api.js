import axios from 'axios';

const API_URL = 'http://localhost:4000/api/sensors';

export const fetchLatest = async () => {
    const response = await axios.get(`${API_URL}/latest`);
    return response.data;
};

export const fetchHistory = async () => {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
};
