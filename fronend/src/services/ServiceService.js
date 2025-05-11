import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080/api",
})

// ✅ Gửi token trong header Authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const ServiceService = {
  getAllServices: async () => {
    const res = await API.get("/services")
    return res.data
  },

  createService: async (data) => {
    const res = await API.post("/services", data)
    return res.data
  },

  updateService: async (id, data) => {
    const res = await API.put(`/services/${id}`, data)
    return res.data
  },

  deleteService: async (id) => {
    const res = await API.delete(`/services/${id}`)
    return res.data
  },
}

export default ServiceService
