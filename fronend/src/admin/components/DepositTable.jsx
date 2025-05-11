import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

function DepositTable({ deposits, onConfirm, onCancel }) {
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Số tiền</th>
            <th className="px-4 py-2">Ngày cọc</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Phòng</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((d) => (
            <tr key={d.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{d.id}</td>
              <td className="px-4 py-2 text-green-700">{d.amount.toLocaleString()}đ</td>
              <td className="px-4 py-2">{d.depositDate}</td>
              <td className="px-4 py-2">{translateStatus(d.status)}</td>
              <td className="px-4 py-2">{d.roomId}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onConfirm(d.id)}
                  title="Xác nhận"
                  className="text-green-600 hover:text-green-800"
                >
                  <AiOutlineCheckCircle size={22} />
                </button>
                <button
                  onClick={() => onCancel(d.id)}
                  title="Hủy"
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineCloseCircle size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepositTable;
