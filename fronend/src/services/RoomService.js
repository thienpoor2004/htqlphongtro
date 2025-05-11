import axios from "axios";

const API_URL = "http://localhost:8080/api";

// ✅ Khởi tạo axios instance dùng chung
const http = axios.create({
  baseURL: API_URL,
});

// ✅ Gắn token Bearer vào mọi request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🏠 Service quản lý phòng
const RoomService = {
  // 📌 Lấy danh sách phòng của người dùng hiện tại
  getMyRoom: async () => {
    const res = await http.get("/rooms/my-room");
    return res.data;
  },

  // 📌 Lấy toàn bộ phòng (dành cho admin)
  getAllRooms: async () => {
    const res = await http.get("/rooms");
    return res.data;
  },

  // 📌 Lấy danh sách phòng công khai cho người thuê
  getPublicRooms: async () => {
    const res = await http.get("/rooms/public");
    return res.data;
  },

  // ✅ Lấy chi tiết 1 phòng theo ID (thêm dòng này để fix lỗi RoomDetailPage)
  getById: async (id) => {
    const res = await http.get(`/rooms/${id}`);
    return res.data;
  },

  // ✅ Tạo phòng mới (dành cho admin, upload ảnh)
  createRoom: async (formData) => {
    const res = await http.post("/rooms", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ✅ Cập nhật phòng (dành cho admin, update có ảnh)
  updateRoom: async (id, formData) => {
    const res = await http.put(`/rooms/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ❌ Xoá phòng
  deleteRoom: async (id) => {
    const res = await http.delete(`/rooms/${id}`);
    return res.data;
  },

  // 📌 Alias tương thích UI cũ
  updateRoomWithImage: async (id, formData) => {
    return RoomService.updateRoom(id, formData);
  },
};

export default RoomService;
