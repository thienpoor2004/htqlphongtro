import { useEffect, useState } from "react";
import IssueService from "../../services/IssueService";
import IssueModal from "../components/IssueModal";
import IssueFilter from "../components/IssueFilter";
import IssueDetailModal from "../components/IssueDetailModal";
import {
  AiOutlineCheckCircle,
  AiOutlineSync,
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";

const translateStatus = (status) => {
  switch (status) {
    case "PENDING": return "Chờ xử lý";
    case "IN_PROGRESS": return "Đang xử lý";
    case "RESOLVED": return "Đã xử lý";
    default: return status;
  }
};

function IssueListPage() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState({ room: "", status: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      const data = await IssueService.getAll();
      setIssues(data);
    } catch (error) {
      console.error("Lỗi khi tải sự cố:", error);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleUpdateStatus = async (id, status) => {
    await IssueService.updateStatus(id, status);
    fetchIssues();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sự cố này?")) {
      await IssueService.delete(id);
      fetchIssues();
    }
  };

  const handleSave = async (form) => {
    await IssueService.create(form);
    setShowModal(false);
    fetchIssues();
  };

  const filteredIssues = issues.filter((i) => {
    const matchRoom = filter.room === "" || i.roomId.toString().includes(filter.room);
    const matchStatus = filter.status === "" || i.status === filter.status;
    return matchRoom && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Danh sách sự cố</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          <AiOutlinePlus /> Thêm sự cố
        </button>
      </div>

      <IssueFilter filter={filter} setFilter={setFilter} />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Mô tả</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Phòng</th>
              <th className="px-4 py-2">Khách thuê</th>
              <th className="px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{issue.id}</td>
                <td className="px-4 py-2">{issue.description}</td>
                <td className="px-4 py-2">{translateStatus(issue.status)}</td>
                <td className="px-4 py-2">{issue.roomId}</td>
                <td className="px-4 py-2">{issue.tenantId}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button title="Chi tiết" onClick={() => setSelectedIssue(issue)} className="text-blue-600 hover:text-blue-800"><AiOutlineEye size={20} /></button>
                  <button title="Đang xử lý" onClick={() => handleUpdateStatus(issue.id, "IN_PROGRESS")} className="text-yellow-600 hover:text-yellow-800"><AiOutlineSync size={20} /></button>
                  <button title="Đã xử lý" onClick={() => handleUpdateStatus(issue.id, "RESOLVED")} className="text-green-600 hover:text-green-800"><AiOutlineCheckCircle size={20} /></button>
                  <button title="Xóa" onClick={() => handleDelete(issue.id)} className="text-red-600 hover:text-red-800"><AiOutlineDelete size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredIssues.length === 0 && (
          <div className="text-center py-4 text-gray-500">Không có sự cố nào</div>
        )}
      </div>

      {showModal && <IssueModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      {selectedIssue && <IssueDetailModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />}
    </div>
  );
}

export default IssueListPage;
