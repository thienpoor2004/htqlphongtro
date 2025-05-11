// admin/components/UserModal.jsx
import { useState, useEffect } from "react";

function UserModal({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username,
        password: "", // để trống khi sửa
        role: initialData.role,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Tài khoản:</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              disabled={!!initialData} // không cho sửa username khi edit
            />
          </div>

          {initialData && (
            <div className="mb-3">
              <label>Mật khẩu mới (bỏ trống nếu không đổi):</label>
              <input
                type="password"
                className="border p-2 rounded w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          )}

          {!initialData && (
            <div className="mb-3">
              <label>Mật khẩu:</label>
              <input
                type="password"
                className="border p-2 rounded w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label>Vai trò:</label>
            <select
              className="border p-2 rounded w-full"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="ADMIN">ADMIN</option>
              <option value="TENANT">TENANT</option>
              <option value="STAFF">STAFF</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {initialData ? "Lưu" : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
