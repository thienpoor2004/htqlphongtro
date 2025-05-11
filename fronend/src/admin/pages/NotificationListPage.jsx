import { useEffect, useState } from "react";
import NotificationService from "../../services/NotificationService";
import NotificationTable from "../components/NotificationTable";
import NotificationModal from "../components/NotificationModal";
import NotificationDetailModal from "../components/NotificationDetailModal";

function NotificationListPage() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchData = async () => {
    try {
      const data = await NotificationService.getAll();
      setNotifications(data);
    } catch (err) {
      console.error("Lỗi khi tải thông báo:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    await NotificationService.create(formData);
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
      await NotificationService.delete(id);
      fetchData();
    }
  };

  const handleResend = async (id) => {
    await NotificationService.resend(id);
    fetchData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Danh sách thông báo</h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Tạo thông báo
        </button>
      </div>

      <NotificationTable
        notifications={notifications}
        onDelete={handleDelete}
        onResend={handleResend}
        onViewDetail={(item) => setSelectedNotification(item)}
      />

      {/* Modal tạo mới */}
      {showModal && (
        <NotificationModal onClose={() => setShowModal(false)} onSave={handleCreate} />
      )}

      {/* Modal chi tiết */}
      {selectedNotification && (
        <NotificationDetailModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
}

export default NotificationListPage;
