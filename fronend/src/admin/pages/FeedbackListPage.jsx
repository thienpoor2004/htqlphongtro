import { useEffect, useState } from "react";
import FeedbackService from "../../services/FeedbackService";
import FeedbackTable from "../components/FeedbackTable";
import FeedbackReplyModal from "../components/FeedbackReplyModal";
import FeedbackDetailModal from "../components/FeedbackDetailModal";

function FeedbackListPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [detailFeedback, setDetailFeedback] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchFeedbacks = async () => {
    try {
      const data = await FeedbackService.getAll();
      setFeedbacks(data);
    } catch (err) {
      console.error("Lỗi khi tải góp ý:", err);
    }
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    const matchesSearch = f.tenant?.fullName?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReply = async (id, replyContent) => {
    await FeedbackService.reply(id, replyContent);
    setSelectedFeedback(null);
    fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Phản ánh / Góp ý</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm khách thuê..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chưa phản hồi</option>
          <option value="REPLIED">Đã phản hồi</option>
          <option value="RESOLVED">Đã xử lý</option>
        </select>
      </div>

      <FeedbackTable
        feedbacks={filteredFeedbacks}
        onReply={setSelectedFeedback}
        onViewDetail={setDetailFeedback}
      />

      {selectedFeedback && (
        <FeedbackReplyModal
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          onReply={handleReply}
        />
      )}

      {detailFeedback && (
        <FeedbackDetailModal
          feedback={detailFeedback}
          onClose={() => setDetailFeedback(null)}
        />
      )}
    </div>
  );
}

export default FeedbackListPage;
