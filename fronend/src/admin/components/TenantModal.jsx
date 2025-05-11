import { useState, useEffect } from "react";
import TenantService from "../../services/TenantService";
import UserService from "../../services/UserService";

function TenantModal({ tenant, onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "",
    identityCard: "",
    phoneNumber: "",
    email: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    roomId: "",
    address: "",
    userId: "", // 👈 thêm userId
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (tenant) {
      setForm((prev) => ({
        ...prev,
        ...tenant,
        userId: tenant.user?.id || "", // 👈 nếu có sẵn user
      }));
    }

    // Load danh sách users
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi tải user:", err);
      }
    };

    fetchUsers();
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tenant) {
        await TenantService.update(tenant.id, form);
      } else {
        await TenantService.create(form);
      }
      onSuccess();
    } catch (err) {
      console.error("Lỗi lưu khách thuê:", err.response?.data || err.message);
      alert("Lỗi: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {tenant ? "Cập nhật khách thuê" : "Thêm khách thuê"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Họ tên" className="w-full border p-2 rounded" required />
          <input name="identityCard" value={form.identityCard} onChange={handleChange} placeholder="CMND/CCCD" className="w-full border p-2 rounded" required />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Số điện thoại" className="w-full border p-2 rounded" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
          <input name="leaseStartDate" type="date" value={form.leaseStartDate} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="leaseEndDate" type="date" value={form.leaseEndDate} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="monthlyRent" value={form.monthlyRent} onChange={handleChange} placeholder="Tiền thuê" className="w-full border p-2 rounded" required />
          <input name="roomId" value={form.roomId} onChange={handleChange} placeholder="ID Phòng" className="w-full border p-2 rounded" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" className="w-full border p-2 rounded" required />

          {/* Dropdown user */}
          <select name="userId" value={form.userId} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">-- Chọn tài khoản người dùng --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} ({u.role})
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TenantModal;
