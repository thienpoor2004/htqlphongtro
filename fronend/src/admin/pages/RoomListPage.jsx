import { useEffect, useState } from "react"
import RoomService from "../../services/RoomService"
import { FaPlus, FaEdit, FaTrash, FaHome, FaWifi, FaTv, FaSnowflake, FaUtensils, FaFire } from "react-icons/fa"
import RoomModal from "../components/RoomModal"

function RoomListPage() {
  const [rooms, setRooms] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      const data = await RoomService.getAllRooms()
      setRooms(data || [])
    } catch (err) {
      console.error("Lỗi lấy danh sách phòng:", err)
    }
  }

  const handleEdit = (room) => {
    setSelectedRoom(room)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      await RoomService.deleteRoom(id)
      loadRooms()
    }
  }

  const handleAdd = () => {
    setSelectedRoom(null)
    setShowModal(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
          <FaHome className="text-indigo-600" /> Quản lý Phòng
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          <FaPlus /> Thêm phòng
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-6 py-3 text-left">Ảnh</th>
              <th className="px-6 py-3 text-left">Số phòng</th>
              <th className="px-6 py-3 text-left">Giá thuê</th>
              <th className="px-6 py-3 text-left">Sức chứa</th>
              <th className="px-6 py-3 text-left">Tiện nghi</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-3">
                  <img
                    src={`http://localhost:8080/uploads/${room.imageUrls?.[0]}`}
                    alt="Ảnh phòng"
                    className="w-20 h-14 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="px-6 py-3 font-medium">{room.roomNumber}</td>
                <td className="px-6 py-3 text-indigo-600 font-semibold">
                  {room.price.toLocaleString()}đ
                </td>
                <td className="px-6 py-3">{room.capacity} người</td>
                <td className="px-6 py-3 space-x-1">
                  {room.wifi && <FaWifi title="Wi-Fi" className="inline text-blue-500" />}
                  {room.ac && <FaSnowflake title="Máy lạnh" className="inline text-cyan-500" />}
                  {room.hotWater && <FaFire title="Nước nóng" className="inline text-red-500" />}
                  {room.tv && <FaTv title="TV" className="inline text-purple-500" />}
                  {room.kitchen && <FaUtensils title="Bếp" className="inline text-green-600" />}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      room.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {room.status === "AVAILABLE" ? "Còn trống" : "Đã thuê"}
                  </span>
                </td>
                <td className="px-6 py-3 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                    title="Sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-500 hover:text-red-700 transition"
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
        <RoomModal
          room={selectedRoom}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            loadRooms()
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default RoomListPage
