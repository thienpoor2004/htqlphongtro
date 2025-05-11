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

const BillService = {
  getByTenantId: async (tenantId) => {
    const res = await API.get(`/bills/tenant/${tenantId}`);
    return res.data;
  },
  getMyBills: async () => {
    const res = await API.get(`/bills/my-bills`);
    return res.data;
  },
  markAsPaid: async (id) => {
    const res = await API.put(`/bills/${id}/pay`);
    return res.data;
  },
  markAsUnpaid: async (id) => {
    const res = await API.put(`/bills/${id}/unpay`);
    return res.data;
  },
  
};

export default BillService;
