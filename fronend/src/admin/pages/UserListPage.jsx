import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await UserService.getAll();
    setUsers(data);
  };

  const handleSave = async (formData) => {
    if (editingUser) {
      await UserService.update(editingUser.id, formData);
    } else {
      await UserService.create(formData);
    }
    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      await UserService.delete(id);
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold text-indigo-700">Quản lý người dùng</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          + Thêm người dùng
        </button>
      </div>

      <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />

      {showModal && (
        <UserModal
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          onSave={handleSave}
          initialData={editingUser}
        />
      )}
    </div>
  );
}

export default UserListPage;
