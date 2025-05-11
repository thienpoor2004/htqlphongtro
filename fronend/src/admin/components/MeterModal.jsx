// admin/components/MeterModal.jsx
import { useState } from "react";

function MeterModal({ onClose, onSave, defaultRoomId, editData }) {
    const [form, setForm] = useState(
      editData ?? {
        roomId: defaultRoomId,
        recordedDate: "",
        previousElectricReading: "",
        currentElectricReading: "",
        previousWaterReading: "",
        currentWaterReading: "",
      }
    );
  
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
          <h2 className="text-lg font-bold mb-4">
            {editData ? "Cập nhật chỉ số" : "Thêm chỉ số"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="recordedDate" type="date" value={form.recordedDate} onChange={handleChange} required className="w-full border p-2 rounded" />
            <input name="previousElectricReading" type="number" value={form.previousElectricReading} onChange={handleChange} placeholder="Điện cũ" required className="w-full border p-2 rounded" />
            <input name="currentElectricReading" type="number" value={form.currentElectricReading} onChange={handleChange} placeholder="Điện mới" required className="w-full border p-2 rounded" />
            <input name="previousWaterReading" type="number" value={form.previousWaterReading} onChange={handleChange} placeholder="Nước cũ" required className="w-full border p-2 rounded" />
            <input name="currentWaterReading" type="number" value={form.currentWaterReading} onChange={handleChange} placeholder="Nước mới" required className="w-full border p-2 rounded" />
            <div className="flex justify-end gap-2">
              <button onClick={onClose} type="button" className="px-4 py-2 border rounded">Hủy</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {editData ? "Lưu thay đổi" : "Lưu mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default MeterModal;
