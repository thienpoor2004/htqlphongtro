// services/MeterReadingService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const MeterReadingService = {
  getByRoomId: async (roomId) => {
    const res = await API.get(`/meter-readings/room/${roomId}`);
    return res.data;
  },
  create: async (data) => {
    const res = await API.post("/meter-readings", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await API.put(`/meter-readings/${id}`, data);
    return res.data;
  },
  
};


export default MeterReadingService;
