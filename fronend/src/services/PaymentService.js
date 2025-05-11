import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080/api",
})

// ✅ Tự động gắn JWT token nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const PaymentService = {
  getAllPayments: async () => {
    const res = await API.get("/payments")
    return res.data
  },

  createPayment: async (data) => {
    const res = await API.post("/payments", data)
    return res.data
  },

  updatePayment: async (id, data) => {
    const res = await API.put(`/payments/${id}`, data)
    return res.data
  },

  deletePayment: async (id) => {
    const res = await API.delete(`/payments/${id}`)
    return res.data
  },

  getPaymentsByTenant: async (tenantId) => {
    const res = await API.get(`/payments/tenant/${tenantId}`)
    return res.data
  },
}

export default PaymentService
