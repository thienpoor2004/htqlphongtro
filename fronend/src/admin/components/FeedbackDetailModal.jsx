function FeedbackDetailModal({ feedback, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded w-full max-w-lg shadow-md">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Chi tiết góp ý</h2>
          <p className="mb-2"><strong>Khách thuê:</strong> {feedback.tenant?.fullName}</p>
          <p className="mb-2"><strong>Nội dung:</strong> {feedback.message}</p>
          <p className="mb-2"><strong>Phản hồi:</strong> {feedback.reply || "Chưa phản hồi"}</p>
          <p className="mb-2"><strong>Trạng thái:</strong> {feedback.status}</p>
          <div className="text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Đóng</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeedbackDetailModal;
  