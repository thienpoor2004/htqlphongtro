import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const FeedbackService = {
  // ✅ Lấy toàn bộ góp ý (cho admin)
  getAll: async () => {
    const res = await API.get("/feedbacks");
    return res.data;
  },

  // ✅ Lấy góp ý của 1 người thuê cụ thể
  getByTenant: async (tenantId) => {
    const res = await API.get(`/feedbacks/tenant/${tenantId}`);
    return res.data;
  },

  // ✅ Gửi góp ý mới
  send: async ({ tenantId, message }) => {
    const res = await API.post("/feedbacks", { tenantId, message });
    return res.data;
  },

  // ✅ Phản hồi góp ý
  reply: async (id, replyMessage) => {
    const res = await API.put(`/feedbacks/${id}/reply`, { reply: replyMessage });
    return res.data;
  },

  // (Tuỳ chọn) Đánh dấu đã xử lý
  markResolved: async (id) => {
    const res = await API.put(`/feedbacks/${id}/resolve`);
    return res.data;
  },

  // (Tuỳ chọn) Xoá góp ý
  delete: async (id) => {
    const res = await API.delete(`/feedbacks/${id}`);
    return res.data;
  },
};

export default FeedbackService;
