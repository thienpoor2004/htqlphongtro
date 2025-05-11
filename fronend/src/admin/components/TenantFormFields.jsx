import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

function TenantFormFields({ form, handleChange }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách user:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="fullName" value={form.fullName} onChange={handleChange} className="border p-2 rounded" placeholder="Họ tên" />
        <input name="identityCard" value={form.identityCard} onChange={handleChange} className="border p-2 rounded" placeholder="CCCD" />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded" placeholder="SĐT" />
        <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
        <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="monthlyRent" value={form.monthlyRent} onChange={handleChange} className="border p-2 rounded" placeholder="Giá thuê" />
        <input type="number" name="roomId" value={form.roomId} onChange={handleChange} className="border p-2 rounded" placeholder="ID Phòng" />
      </div>

      <select name="userId" value={form.userId || ""} onChange={handleChange} className="border p-2 rounded w-full mb-4">
        <option value="">-- Chọn User liên kết --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.username} (#{user.id})</option>
        ))}
      </select>
    </>
  );
}

export default TenantFormFields;
