import { useState } from "react";

function NotificationModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    tenantId: "",
    type: "PAYMENT_REMINDER",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Tạo Thông Báo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Tenant ID:</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={formData.tenantId}
              onChange={(e) =>
                setFormData({ ...formData, tenantId: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>Loại:</label>
            <select
              className="border p-2 rounded w-full"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="PAYMENT_REMINDER">Nhắc thanh toán</option>
              <option value="CONTRACT_END">Hết hợp đồng</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Thông điệp:</label>
            <textarea
              className="border p-2 rounded w-full"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotificationModal;
