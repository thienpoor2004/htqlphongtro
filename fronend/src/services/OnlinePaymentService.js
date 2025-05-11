import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const OnlinePaymentService = {
  getByTenant: async (tenantId) => {
    const res = await API.get(`/online-payments/${tenantId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await API.post("/online-payments", data);
    return res.data;
  },

  updateStatus: async (transactionId, status) => {
    await API.put("/online-payments/update-status", {
      transactionId,
      status,
    });
  },
  getAll: async () => {
    const res = await API.get("/online-payments"); // ✅ API mới không có tenantId
    return res.data;
  },
  resend: async (transactionId) => {
    return await API.put("/online-payments/update-status", {
      transactionId,
      status: "SUCCESS", // hoặc PENDING tùy logic bạn muốn
    });
  },
  
  delete: async (id) => {
    return await API.delete(`/online-payments/${id}`);
  },
  
  
};

export default OnlinePaymentService;
