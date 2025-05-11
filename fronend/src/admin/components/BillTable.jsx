import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function BillTable({ bills, onMarkPaid, onMarkUnpaid }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tiền điện</th>
            <th className="px-4 py-2">Tiền nước</th>
            <th className="px-4 py-2">Tổng tiền</th>
            <th className="px-4 py-2">Hạn thanh toán</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{bill.id}</td>
              <td className="px-4 py-2 text-red-600">{bill.electricityBill.toLocaleString()}đ</td>
              <td className="px-4 py-2 text-blue-600">{bill.waterBill.toLocaleString()}đ</td>
              <td className="px-4 py-2 font-semibold">{bill.totalAmount.toLocaleString()}đ</td>
              <td className="px-4 py-2">{bill.dueDate}</td>
              <td className="px-4 py-2">
                {bill.isPaid ? (
                  <span className="text-green-600 font-medium">Đã thanh toán</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Chưa thanh toán</span>
                )}
              </td>
              <td className="px-4 py-2 text-center space-x-3">
                <button
                  onClick={() => onMarkPaid(bill.id)}
                  title="Đánh dấu đã thanh toán"
                  className="text-green-600 hover:scale-110 transition-transform"
                >
                  <FaCheckCircle size={20} />
                </button>
                <button
                  onClick={() => onMarkUnpaid(bill.id)}
                  title="Đánh dấu chưa thanh toán"
                  className="text-red-500 hover:scale-110 transition-transform"
                >
                  <FaTimesCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillTable;
