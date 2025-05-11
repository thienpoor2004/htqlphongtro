import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const UserService = {
  getAll: async () => {
    const res = await API.get("/users");
    return res.data;
  },
  create: async (data) => {
    const res = await API.post("/users", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await API.put(`/users/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    await API.delete(`/users/${id}`);
  },
};

export default UserService;
