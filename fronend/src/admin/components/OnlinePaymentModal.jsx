import { useEffect, useState } from "react";
import TenantService from "../../services/TenantService";

function OnlinePaymentModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    tenantId: "",
    amount: "",
    paymentMethod: "MOMO",
  });

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTenants() {
      try {
        setLoading(true);
        const data = await TenantService.getAll();
        setTenants(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách khách thuê:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTenants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenantId || !formData.amount) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          {`📄 Tạo thanh toán mới`}
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Đang tải danh sách khách thuê...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Dropdown khách thuê */}
            <div>
              <label className="block mb-1 font-medium text-sm">Khách thuê:</label>
              <select
                name="tenantId"
                value={formData.tenantId}
                onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                className="border rounded w-full p-2"
                required
              >
                <option value="">-- Chọn khách thuê --</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.fullName || `Khách ${tenant.id}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Số tiền */}
            <div>
              <label className="block mb-1 font-medium text-sm">Số tiền (VND):</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="border rounded w-full p-2"
                min={0}
                required
                placeholder="Nhập số tiền cần thanh toán"
              />
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <label className="block mb-1 font-medium text-sm">Phương thức thanh toán:</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="border rounded w-full p-2"
              >
                <option value="MOMO">MOMO</option>
                <option value="ZALOPAY">ZaloPay</option>
                <option value="VNPAY">VNPay</option>
              </select>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Tạo thanh toán
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default OnlinePaymentModal;
