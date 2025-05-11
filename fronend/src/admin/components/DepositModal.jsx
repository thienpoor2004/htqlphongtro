import { useState } from "react";

function DepositModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    amount: "",
    depositDate: "",
    tenantId: "",
    roomId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Thêm tiền cọc</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Số tiền"
            required
          />
          <input
            name="depositDate"
            type="date"
            value={form.depositDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="tenantId"
            type="number"
            value={form.tenantId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Mã khách thuê"
            required
          />
          <input
            name="roomId"
            type="number"
            value={form.roomId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Mã phòng"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Hủy
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepositModal;
