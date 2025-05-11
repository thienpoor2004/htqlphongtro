import { FaTrash, FaEye, FaRedo } from "react-icons/fa";

function NotificationTable({ notifications, onDelete, onResend, onViewDetail }) {
  const mapStatusToVN = {
    PENDING: "Đang chờ gửi",
    SENT: "Đã gửi",
    FAILED: "Thất bại",
  };

  const mapTypeToVN = {
    PAYMENT_REMINDER: "Nhắc thanh toán",
    CONTRACT_END: "Hết hạn hợp đồng",
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Thông điệp</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Loại</th>
            <th className="px-4 py-2">Ngày gửi</th>
            <th className="px-4 py-2">Tenant ID</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{n.id}</td>
              <td className="px-4 py-2">{n.message}</td>
              <td className="px-4 py-2">{mapStatusToVN[n.status] || n.status}</td>
              <td className="px-4 py-2">{mapTypeToVN[n.type] || n.type}</td>
              <td className="px-4 py-2">{n.sentDate || "Chưa gửi"}</td>
              <td className="px-4 py-2">{n.tenant?.id || "?"}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onViewDetail(n)}
                  className="text-blue-600 hover:underline"
                  title="Xem chi tiết"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => onResend(n.id)}
                  className="text-green-600 hover:underline"
                  title="Gửi lại"
                >
                  <FaRedo />
                </button>
                <button
                  onClick={() => onDelete(n.id)}
                  className="text-red-600 hover:underline"
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

export default NotificationTable;
