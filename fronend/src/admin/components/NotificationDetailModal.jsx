function NotificationDetailModal({ notification, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">
            Chi tiết Thông báo
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>ID:</strong> {notification.id}
            </p>
            <p>
              <strong>Tenant ID:</strong> {notification.tenant?.id}
            </p>
            <p>
              <strong>Loại:</strong>{" "}
              {notification.type === "PAYMENT_REMINDER"
                ? "Nhắc thanh toán"
                : "Hết hợp đồng"}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {notification.status === "PENDING"
                ? "Đang chờ gửi"
                : notification.status === "SENT"
                ? "Đã gửi"
                : "Thất bại"}
            </p>
            <p>
              <strong>Ngày gửi:</strong> {notification.sentDate || "Chưa gửi"}
            </p>
            <p>
              <strong>Nội dung:</strong>
            </p>
            <div className="bg-gray-100 p-3 rounded">{notification.message}</div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationDetailModal;
  