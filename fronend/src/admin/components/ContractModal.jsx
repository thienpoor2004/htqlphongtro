import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import ContractService from "../../services/ContractService";
import TenantService from "../../services/TenantService";
import RoomService from "../../services/RoomService";

function ContractModal({ contract, onClose, onSuccess }) {
  const [form, setForm] = useState({
    userId: "",
    tenantId: "",
    roomId: "",
    startDate: "",
    endDate: "",
    depositAmount: "",
  });

  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchTenants();
    fetchRooms();

    if (contract) {
      setForm({
        userId: contract.userId || "",
        tenantId: contract.tenantId || contract.tenant?.id || "",
        roomId: contract.roomId || contract.room?.id || "",
        startDate: contract.startDate || "",
        endDate: contract.endDate || "",
        depositAmount: contract.deposit?.toString() || "",
      });
    } else {
      try {
        const storedUserRaw = localStorage.getItem("user");
        const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
        
        if (storedUser?.id) {
          setForm((prev) => ({ ...prev, userId: storedUser.id }));
        } else {
          console.warn("⚠️ Không tìm thấy userId trong localStorage:", storedUser);
        }
        
      } catch (err) {
        console.error("❌ Lỗi khi đọc user từ localStorage:", err);
      }
    }
  }, [contract]);

  const fetchTenants = async () => {
    try {
      const data = await TenantService.getAll();
      setTenants(data);
    } catch (error) {
      console.error("Lỗi khi tải khách thuê:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const data = await RoomService.getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error("Lỗi khi tải phòng:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userId: parseInt(form.userId),
      tenantId: parseInt(form.tenantId),
      roomId: parseInt(form.roomId),
      startDate: form.startDate,
      endDate: form.endDate,
      deposit: parseFloat(form.depositAmount || 0),
    };

    console.log("🟢 Data gửi đi:", dataToSend);

    if (isNaN(dataToSend.userId)) {
      alert("❗ Không thể tạo hợp đồng vì thiếu userId. Hãy đăng nhập lại.");
      return;
    }

    try {
      if (contract?.id) {
        await ContractService.update(contract.id, dataToSend);
      } else {
        await ContractService.create(dataToSend);
      }
      onSuccess();
    } catch (error) {
      console.error("❌ Lỗi khi lưu hợp đồng:", error);
      alert("Lỗi khi lưu hợp đồng!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {contract ? "Cập nhật hợp đồng" : "Thêm hợp đồng"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="hidden" name="userId" value={form.userId} />

          <select
            name="tenantId"
            value={form.tenantId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Chọn khách thuê --</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </select>

          <select
            name="roomId"
            value={form.roomId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Chọn phòng --</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.roomNumber}
              </option>
            ))}
          </select>

          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="depositAmount"
            type="number"
            value={form.depositAmount}
            onChange={handleChange}
            placeholder="Tiền cọc"
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded text-gray-600 flex items-center gap-1"
            >
              <FaTimes /> Hủy
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-1"
            >
              <FaSave /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContractModal;
