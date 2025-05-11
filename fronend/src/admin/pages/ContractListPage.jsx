import { useEffect, useState } from "react";
import ContractService from "../../services/ContractService";
import ContractModal from "../components/ContractModal";
import ContractTable from "../components/ContractTable";

function ContractListPage() {
  const [contracts, setContracts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const fetchContracts = async () => {
    const data = await ContractService.getAll();
    setContracts(data);
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleAdd = () => {
    setSelectedContract(null);
    setShowModal(true);
  };

  const handleEdit = (contract) => {
    setSelectedContract(contract);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hợp đồng này không?")) {
      await ContractService.delete(id);
      fetchContracts();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold text-indigo-700">Quản lý Hợp đồng</h2>
        <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Thêm hợp đồng</button>
      </div>
      <ContractTable contracts={contracts} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <ContractModal
          contract={selectedContract}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchContracts();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default ContractListPage;
