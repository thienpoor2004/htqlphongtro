import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Tự động gắn token JWT nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const NotificationService = {
  // ✅ Lấy toàn bộ thông báo
  getAll: async () => {
    const res = await API.get("/notifications");
    return res.data;
  },

  // ✅ Tạo thông báo mới
  create: async ({ tenantId, type, message }) => {
    await API.post("/notifications", { tenantId, type, message });
  },

  // 🔁 Gửi lại thông báo (tùy theo backend có hỗ trợ không)
  resend: async (id) => {
    // Ví dụ: PATCH /notifications/{id}/resend
    const res = await API.patch(`/notifications/${id}/resend`);
    return res.data;
  },

  // 🗑 Xóa thông báo
  delete: async (id) => {
    const res = await API.delete(`/notifications/${id}`);
    return res.data;
  },

  // 🔎 Lọc theo trạng thái hoặc loại (cần backend hỗ trợ query param)
  filter: async ({ status, type }) => {
    const params = {};
    if (status) params.status = status;
    if (type) params.type = type;

    const res = await API.get("/notifications", { params });
    return res.data;
  },
};

export default NotificationService;
