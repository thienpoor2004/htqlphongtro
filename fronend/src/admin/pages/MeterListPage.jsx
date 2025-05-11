import MeterTable from "../components/MeterTable";
import MeterModal from "../components/MeterModal";
import MeterReadingService from "../../services/MeterReadingService";
import { useState, useEffect } from "react";

function MeterListPage() {
  const [readings, setReadings] = useState([]);
  const [roomId, setRoomId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await MeterReadingService.getByRoomId(roomId);
      setReadings(data);
    } catch (err) {
      console.error("Lỗi khi tải chỉ số:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [roomId]);

  const handleAddOrEdit = async (formData) => {
    if (editData) {
      await MeterReadingService.update(editData.id, formData);
    } else {
      await MeterReadingService.create(formData);
    }
    setShowModal(false);
    setEditData(null);
    fetchData();
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Danh sách chỉ số</h2>
        <button onClick={() => { setEditData(null); setShowModal(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded">
          + Thêm chỉ số
        </button>
      </div>

      <div className="mb-4">
        <label>Phòng: </label>
        <input
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded w-32"
        />
      </div>

      <MeterTable readings={readings} onEdit={handleEditClick} />

      {showModal && (
        <MeterModal
          onClose={() => { setShowModal(false); setEditData(null); }}
          onSave={handleAddOrEdit}
          defaultRoomId={roomId}
          editData={editData}
        />
      )}
    </div>
  );
}

export default MeterListPage;
