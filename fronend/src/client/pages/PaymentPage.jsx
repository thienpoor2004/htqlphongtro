import { useEffect, useState } from "react"
import BillService from "../../services/BillService"

function PaymentPage() {
  const [bills, setBills] = useState([])

  useEffect(() => {
    BillService.getMyBills()
      .then(data => setBills(data))
      .catch(err => {
        console.error("Lỗi lấy hóa đơn:", err)
      })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hóa đơn của tôi</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">Tiền điện</th>
              <th className="px-4 py-2">Tiền nước</th>
              <th className="px-4 py-2">Tổng tiền</th>
              <th className="px-4 py-2">Hạn thanh toán</th>
              <th className="px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-t">
                <td className="px-4 py-2">{bill.electricityBill?.toLocaleString() ?? '0'}đ</td>
                <td className="px-4 py-2">{bill.waterBill?.toLocaleString() ?? '0'}đ</td>
                <td className="px-4 py-2">{bill.totalAmount?.toLocaleString() ?? '0'}đ</td>
                <td className="px-4 py-2">
                  {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : "Chưa có"}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    bill.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bill.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentPage
