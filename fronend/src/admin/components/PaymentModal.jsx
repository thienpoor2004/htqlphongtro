import { useEffect, useState } from "react"
import PaymentService from "../../services/PaymentService"
import { FaTimes, FaSave, FaMoneyBillWave, FaCalendarAlt, FaUser } from "react-icons/fa"

function PaymentModal({ payment, onClose, onSuccess }) {
  const [form, setForm] = useState({
    tenantId: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Tiền mặt",
    status: "ĐÃ THANH TOÁN",
  })

  useEffect(() => {
    if (payment) setForm(payment)
  }, [payment])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (payment) {
      await PaymentService.updatePayment(payment.id, form)
    } else {
      await PaymentService.createPayment(form)
    }
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
          <FaMoneyBillWave />
          {payment ? "Cập nhật thanh toán" : "Thêm thanh toán"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="tenantId"
              value={form.tenantId}
              onChange={handleChange}
              placeholder="ID Khách thuê"
              className="w-full border p-2 pl-10 rounded"
              required
            />
          </div>

          <div className="relative">
            <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Số tiền"
              className="w-full border p-2 pl-10 rounded"
              required
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              name="paymentDate"
              type="date"
              value={form.paymentDate}
              onChange={handleChange}
              className="w-full border p-2 pl-10 rounded"
              required
            />
          </div>

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Tiền mặt</option>
            <option>Chuyển khoản</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>ĐÃ THANH TOÁN</option>
            <option>CHƯA THANH TOÁN</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="flex items-center gap-2 border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
            >
              <FaTimes /> Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <FaSave /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentModal
