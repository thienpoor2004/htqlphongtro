import { FaTrash, FaRedo } from "react-icons/fa";

function OnlinePaymentTable({ payments, onDelete, onResend }) {
  const statusMap = {
    PENDING: "Đang chờ",
    SUCCESS: "Thành công",
    FAILED: "Thất bại",
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Số tiền</th>
            <th className="px-4 py-2">Phương thức</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Mã giao dịch</th>
            <th className="px-4 py-2">Ngày thanh toán</th>
            <th className="px-4 py-2">Mã khách thuê</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{payment.id}</td>
              <td className="px-4 py-2 text-green-600 font-semibold">
                {Number(payment.amount).toLocaleString()}đ
              </td>
              <td className="px-4 py-2">{payment.paymentMethod}</td>
              <td className="px-4 py-2">
                {statusMap[payment.status] || payment.status}
              </td>
              <td className="px-4 py-2">{payment.transactionId}</td>
              <td className="px-4 py-2">
                {new Date(payment.paymentDate).toLocaleTimeString("vi-VN")}{" "}
                {new Date(payment.paymentDate).toLocaleDateString("vi-VN")}
              </td>
              <td className="px-4 py-2">{payment.tenant?.id || "?"}</td>
              <td className="px-4 py-2 text-center space-x-2">
                {(payment.status === "PENDING" || payment.status === "FAILED") && (
                  <button
                    onClick={() => onResend(payment.transactionId)}
                    className="text-green-600 hover:text-green-800"
                    title="Gửi lại"
                  >
                    <FaRedo />
                  </button>
                )}
                <button
                  onClick={() => onDelete(payment.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Xóa"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OnlinePaymentTable;
