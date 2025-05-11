import { useEffect, useState } from "react"
import PaymentService from "../../services/PaymentService"
import PaymentModal from "../components/PaymentModal"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

function PaymentListPage() {
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const fetchPayments = async () => {
    const data = await PaymentService.getAllPayments()
    setPayments(data)
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handleAdd = () => {
    setSelectedPayment(null)
    setShowModal(true)
  }

  const handleEdit = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thanh toán này?")) {
      await PaymentService.deletePayment(id)
      fetchPayments()
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          <FaEdit className="text-indigo-600" />
          Quản lý Thanh toán
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlus />
          Thêm thanh toán
        </button>
      </div>

      <table className="w-full border shadow rounded bg-white">
        <thead className="bg-indigo-100 text-left text-indigo-700">
          <tr>
            <th className="px-4 py-2">Mã</th>
            <th className="px-4 py-2">Khách thuê</th>
            <th className="px-4 py-2">Số tiền</th>
            <th className="px-4 py-2">Ngày thanh toán</th>
            <th className="px-4 py-2">Phương thức</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pmt) => (
            <tr key={pmt.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{pmt.id}</td>
              <td className="px-4 py-2">{pmt.tenantName || pmt.tenantId}</td>
              <td className="px-4 py-2 text-green-600 font-semibold">
                {pmt.amount.toLocaleString()}đ
              </td>
              <td className="px-4 py-2">{pmt.paymentDate}</td>
              <td className="px-4 py-2">{pmt.paymentMethod}</td>
              <td className="px-4 py-2">
                {pmt.status === "ĐÃ THANH TOÁN" ? (
                  <span className="text-green-600 font-medium">Đã thanh toán</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Chưa thanh toán</span>
                )}
              </td>
              <td className="px-4 py-2 text-center space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  title="Sửa"
                  onClick={() => handleEdit(pmt)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Xóa"
                  onClick={() => handleDelete(pmt.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchPayments()
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default PaymentListPage
