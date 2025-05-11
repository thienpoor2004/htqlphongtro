import { FaReply, FaEye } from "react-icons/fa";

function FeedbackTable({ feedbacks, onReply, onViewDetail }) {
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Khách thuê</th>
            <th className="px-4 py-2">Nội dung</th>
            <th className="px-4 py-2">Phản hồi</th>
            <th className="px-4 py-2">Thời gian</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{f.id}</td>
              <td className="px-4 py-2">{f.tenant?.fullName || "?"}</td>
              <td className="px-4 py-2 truncate max-w-[200px]">{f.message}</td>
              <td className="px-4 py-2 text-green-700">{f.reply || "Chưa phản hồi"}</td>
              <td className="px-4 py-2">
                {new Date(f.createdAt).toLocaleDateString("vi-VN")}{" "}
                {new Date(f.createdAt).toLocaleTimeString("vi-VN")}
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onViewDetail(f)}
                  className="text-gray-600 hover:text-black"
                  title="Xem chi tiết"
                >
                  <FaEye />
                </button>
                {!f.reply && (
                  <button
                    onClick={() => onReply(f)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Phản hồi"
                  >
                    <FaReply />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackTable;
