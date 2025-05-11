import { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import ServiceService from "../../services/ServiceService";

function ServiceModal({ service, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
  });

  useEffect(() => {
    if (service) setForm(service);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (service) {
      await ServiceService.updateService(service.id, form); // ✅ sửa
    } else {
      await ServiceService.createService(form); // ✅ sửa
    }
    onSuccess();
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          {service ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên dịch vụ"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Giá"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="Đơn vị tính (ví dụ: kWh, m³...)"
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded text-gray-600 flex items-center gap-1">
              <FaTimes /> Hủy
            </button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-1">
              <FaSave /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;
