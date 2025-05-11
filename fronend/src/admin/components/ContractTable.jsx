import { FaEdit, FaTrash } from "react-icons/fa";

function ContractTable({ contracts, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Khách thuê</th>
            <th className="px-4 py-2">Phòng</th>
            <th className="px-4 py-2">Ngày bắt đầu</th>
            <th className="px-4 py-2">Ngày kết thúc</th>
            <th className="px-4 py-2">Tiền cọc</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.tenantName || item.tenantId}</td>
              <td className="px-4 py-2">{item.roomNumber || item.roomId}</td>
              <td className="px-4 py-2">{item.startDate}</td>
              <td className="px-4 py-2">{item.endDate}</td>
              <td className="px-4 py-2 text-green-600">
                {item.deposit !== null && item.deposit !== undefined
                  ? `${item.deposit.toLocaleString()}đ`
                  : "—"}
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContractTable;
