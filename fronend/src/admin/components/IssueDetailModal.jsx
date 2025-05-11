function IssueDetailModal({ issue, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Chi tiết sự cố</h2>
          <p><strong>ID:</strong> {issue.id}</p>
          <p><strong>Mô tả:</strong> {issue.description}</p>
          <p><strong>Trạng thái:</strong> {issue.status}</p>
          <p><strong>Phòng:</strong> {issue.roomId}</p>
          <p><strong>Khách thuê:</strong> {issue.tenantId}</p>
          <p><strong>Ngày tạo:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
          <p><strong>Cập nhật:</strong> {new Date(issue.updatedAt).toLocaleString()}</p>
          <div className="mt-4 text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Đóng</button>
          </div>
        </div>
      </div>
    );
  }
  export default IssueDetailModal;
  