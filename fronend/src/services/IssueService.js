import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const IssueService = {
  getAll: async () => {
    const res = await API.get("/issue-reports");
    return res.data;
  },
  create: async (data) => {
    const res = await API.post("/issue-reports", data);
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await API.patch(`/issue-reports/${id}?status=${status}`);
    return res.data;
  },
  delete: async (id) => {
    const res = await API.delete(`/issue-reports/${id}`);
    return res.data;
  },
  
};

export default IssueService;
