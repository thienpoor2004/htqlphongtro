import { useEffect, useState } from "react";
import DepositService from "../../services/DepositService";
import DepositFilter from "../components/DepositFilter";
import DepositModal from "../components/DepositModal";
import DepositTable from "../components/DepositTable";

function DepositListPage() {
  const [deposits, setDeposits] = useState([]);
  const [filter, setFilter] = useState({ room: "", status: "" });
  const [showModal, setShowModal] = useState(false);

  const fetchDeposits = async () => {
    try {
      const data = await DepositService.getAll();
      setDeposits(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách cọc:", error);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleConfirm = async (id) => {
    await DepositService.confirm(id);
    fetchDeposits();
  };

  const handleCancel = async (id) => {
    await DepositService.cancel(id);
    fetchDeposits();
  };

  const handleSave = async (newDeposit) => {
    await DepositService.create(newDeposit);
    setShowModal(false);
    fetchDeposits();
  };

  const filteredDeposits = deposits.filter((d) => {
    const matchRoom = filter.room === "" || d.roomId.toString().includes(filter.room);
    const matchStatus = filter.status === "" || d.status === filter.status;
    return matchRoom && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Danh sách tiền cọc</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
        >
          + Thêm cọc
        </button>
      </div>

      <DepositFilter filter={filter} setFilter={setFilter} />

      <DepositTable
        deposits={filteredDeposits}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {filteredDeposits.length === 0 && (
        <div className="text-center py-4 text-gray-500">Không có dữ liệu</div>
      )}

      {showModal && (
        <DepositModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}

export default DepositListPage;
