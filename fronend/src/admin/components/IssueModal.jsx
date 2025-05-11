import { useState } from "react";

function IssueModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    roomId: "",
    tenantId: "",
    description: "",
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
        <h2 className="text-lg font-bold mb-4">Thêm sự cố mới</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="roomId"
            type="number"
            placeholder="Mã phòng"
            value={form.roomId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="tenantId"
            type="number"
            placeholder="Mã khách thuê"
            value={form.tenantId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Mô tả sự cố"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            rows={4}
          ></textarea>
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

export default IssueModal;
    