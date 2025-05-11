import { useState, useEffect } from "react";
import FeedbackService from "../../services/FeedbackService";
import useAuth from "../../hooks/useAuth";

function FeedbackPage() {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [success, setSuccess] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await FeedbackService.getByTenant(currentUser.id);
      setList(res);
    } catch (err) {
      console.error("Lỗi khi tải phản hồi:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await FeedbackService.send({ tenantId: currentUser.tenantId, message });
      setMessage("");
      setSuccess(true); // Hiển thị thông báo thành công
      fetchFeedbacks();

      setTimeout(() => setSuccess(false), 3000); // Ẩn sau 3 giây
    } catch (err) {
      alert("Gửi góp ý thất bại!");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Góp ý / Hỗ trợ</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Gửi góp ý thành công!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border p-4 rounded mb-2"
          rows={4}
          placeholder="Nhập nội dung phản ánh / góp ý..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Gửi góp ý
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Lịch sử góp ý</h2>
      <ul className="space-y-4">
        {list.map((f) => (
          <li key={f.id} className="border rounded p-4 bg-white shadow-sm">
            <p className="mb-1">
              <strong>Nội dung:</strong> {f.message}
            </p>
            <p className="mb-1">
              <strong>Phản hồi:</strong>{" "}
              {f.reply ? <span className="text-green-700">{f.reply}</span> : "Chưa phản hồi"}
            </p>
            <p className="text-sm text-gray-500">
              Ngày gửi: {new Date(f.createdAt).toLocaleString("vi-VN")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackPage;
