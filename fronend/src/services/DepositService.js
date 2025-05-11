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

const DepositService = {
  getAll: async () => {
    const res = await API.get("/deposits");
    return res.data;
  },

  getByTenantId: async (tenantId) => {
    const res = await API.get(`/deposits/tenant/${tenantId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await API.post("/deposits", data);
    return res.data;
  },

  confirm: async (id) => {
    const res = await API.put(`/deposits/${id}/confirm`);
    return res.data;
  },

  cancel: async (id) => {
    const res = await API.put(`/deposits/${id}/cancel`);
    return res.data;
  },
};

export default DepositService;
