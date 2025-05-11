import { FaTrash, FaEdit } from "react-icons/fa";

function UserTable({ users, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tài khoản</th>
            <th className="px-4 py-2">Vai trò</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{u.id}</td>
              <td className="px-4 py-2">{u.username}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(u)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Sửa"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(u.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Xóa"
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

export default UserTable;
