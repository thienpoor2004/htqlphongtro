import { useEffect, useState } from "react";
import BillService from "../../services/BillService";
import BillTable from "../components/BillTable";

function BillListPage() {
  const [bills, setBills] = useState([]);
  const [tenantId, setTenantId] = useState(1); // test tạm thời

  const fetchBills = async () => {
    try {
      const data = await BillService.getByTenantId(tenantId);
      setBills(data);
    } catch (error) {
      console.error("Lỗi tải hóa đơn:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [tenantId]);

  const handleMarkPaid = async (id) => {
    try {
      await BillService.markAsPaid(id);
      fetchBills();
    } catch (err) {
      console.error("Lỗi cập nhật hóa đơn:", err);
    }
  };

  const handleMarkUnpaid = async (id) => {
    try {
      await BillService.markAsUnpaid(id); // gọi hàm chưa thanh toán
      fetchBills();
    } catch (err) {
      console.error("Lỗi cập nhật chưa thanh toán:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Danh sách hóa đơn</h2>
      </div>

      <div className="mb-4">
        <label>Nhập Tenant ID: </label>
        <input
          type="number"
          className="border p-2 rounded w-32"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
        />
      </div>

      <BillTable
        bills={bills}
        onMarkPaid={handleMarkPaid}
        onMarkUnpaid={handleMarkUnpaid}
      />
    </div>
  );
}

export default BillListPage;
