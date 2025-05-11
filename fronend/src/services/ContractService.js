import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Gắn interceptor để tự động thêm token vào mọi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // hoặc sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ContractService = {
  getAll: async () => {
    const res = await API.get("/contracts");
    return res.data;
  },
  create: async (data) => {
    const res = await API.post("/contracts", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await API.put(`/contracts/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await API.delete(`/contracts/${id}`);
    return res.data;
  },
};

export default ContractService;
