import { useEffect, useState } from "react"
import TenantService from "../../services/TenantService"
import TenantModal from "../components/TenantModal"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

function TenantListPage() {
  const [tenants, setTenants] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)

  useEffect(() => {
    loadTenants()
  }, [])

  const loadTenants = async () => {
    try {
      const data = await TenantService.getAll()
      setTenants(data)
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách thuê:", error)
    }
  }

  const handleAdd = () => {
    setSelectedTenant(null)
    setShowModal(true)
  }

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách thuê này không?")) {
      try {
        await TenantService.delete(id)
        loadTenants()
      } catch (error) {
        console.error("Lỗi khi xóa khách thuê:", error)
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          👤 Quản lý Khách thuê
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlus /> Thêm
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">CCCD</th>
              <th className="px-4 py-2">SDT</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Thuê từ</th>
              <th className="px-4 py-2">Đến</th>
              <th className="px-4 py-2">Phòng</th>
              <th className="px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tenant.fullName}</td>
                <td className="px-4 py-2">{tenant.identityCard}</td>
                <td className="px-4 py-2">{tenant.phoneNumber}</td>
                <td className="px-4 py-2">{tenant.email || "--"}</td>
                <td className="px-4 py-2">{tenant.leaseStartDate}</td>
                <td className="px-4 py-2">{tenant.leaseEndDate}</td>
                <td className="px-4 py-2">{tenant.roomId}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(tenant)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="text-red-500 hover:text-red-700"
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

      {showModal && (
       <TenantModal
       tenant={selectedTenant}
       onClose={() => setShowModal(false)}
       onSuccess={() => {
         loadTenants()
         setShowModal(false)
       }}
     />
     
      )}
    </div>
  )
}

export default TenantListPage
