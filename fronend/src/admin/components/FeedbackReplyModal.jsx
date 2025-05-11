import { useState } from "react";

function FeedbackReplyModal({ feedback, onClose, onReply }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(feedback.id, content);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">
          Phản hồi góp ý từ {feedback.tenant?.fullName || "Người thuê"}
        </h2>
        <p className="mb-4 text-gray-700 italic">"{feedback.message}"</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border p-3 rounded mb-4"
            rows={4}
            placeholder="Nội dung phản hồi..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Gửi phản hồi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackReplyModal;
