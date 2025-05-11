import { FaEdit, FaTrash } from "react-icons/fa";

function ServiceTable({ services, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tên dịch vụ</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Đơn vị</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2 text-green-600 font-semibold">{item.price.toLocaleString()}đ</td>
              <td className="px-4 py-2">{item.unit}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700">
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

export default ServiceTable;
