import axios from "axios";

const API_URL = "http://localhost:8080/api";

const http = axios.create({
  baseURL: API_URL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const TenantService = {
  // 📌 Lấy tất cả tenant (dành cho Admin)
  getAll: async () => {
    const response = await http.get("/tenants");
    return response.data;
  },

  // 📌 Tạo tenant mới
  create: async (data) => {
    const response = await http.post("/tenants", data);
    return response.data;
  },

  // 📌 Cập nhật tenant theo ID
  update: async (id, data) => {
    const response = await http.put(`/tenants/${id}`, data);
    return response.data;
  },

  // 📌 Xoá tenant theo ID
  delete: async (id) => {
    const response = await http.delete(`/tenants/${id}`);
    return response.data;
  },

  // ✅ Thêm: lấy tenant theo userId (dùng ở client)
  getByUserId: async (userId) => {
    const response = await http.get(`/tenants/by-user/${userId}`);
    return response.data;
  },
};

export default TenantService;
