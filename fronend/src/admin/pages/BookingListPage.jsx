import { useEffect, useState } from "react"
import axios from "axios"
import { FaBed, FaTrash } from "react-icons/fa"

function BookingListPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:8080/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBookings(res.data || [])
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đặt phòng:", err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn huỷ đặt phòng này?")) return
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:8080/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchBookings()
    } catch (err) {
      console.error("Lỗi huỷ đặt phòng:", err)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <FaBed /> Quản lý Đặt phòng
      </h2>

      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-3">Phòng</th>
              <th className="px-4 py-3">Khách thuê</th>
              <th className="px-4 py-3">Nhận phòng</th>
              <th className="px-4 py-3">Trả phòng</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{b.room?.roomNumber}</td>
                <td className="px-4 py-2">{b.tenant?.fullName || b.tenant?.username}</td>
                <td className="px-4 py-2">{b.checkIn}</td>
                <td className="px-4 py-2">{b.checkOut}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Huỷ đặt phòng"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  Không có đặt phòng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingListPage
