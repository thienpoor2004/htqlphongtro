import { useEffect, useState } from "react"
import BookingService from "../../services/BookingService"
import { FaUsers, FaMoneyBillWave, FaTag } from "react-icons/fa"

function MyRoomPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    BookingService.getMyBookings()
      .then(data => setBookings(data || []))
      .catch(err => {
        console.error("Lỗi lấy danh sách đặt phòng:", err)
        setBookings([])
      })
  }, [])

  const translateStatus = (status) => {
    switch (status) {
      case "RENTED": return "Đã thuê"
      case "AVAILABLE": return "Còn trống"
      default: return status
    }
  }

  const getStatusBadgeClass = (status) => {
    return status === "AVAILABLE"
      ? "bg-green-100 text-green-600 border border-green-300"
      : "bg-red-100 text-red-600 border border-red-300"
  }

  const getImageUrl = (room) => {
    const firstImage = room.imageUrls?.[0]
    return firstImage
      ? `http://localhost:8080/uploads/${firstImage}`
      : "https://source.unsplash.com/random/400x300?room"
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center mt-16 text-gray-500 text-lg">
        <p>Bạn chưa có lịch sử đặt phòng nào.</p>
      </div>
    )
  }

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Phòng bạn đã đặt</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking) => {
          const room = booking.room
          return (
            <div
              key={booking.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={getImageUrl(room)}
                  alt="Hình ảnh phòng"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">Phòng {room.roomNumber}</h3>
                <div className="text-sm text-gray-500">
                  Thời gian: {booking.checkIn} → {booking.checkOut}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-teal-500" />
                  {room.capacity} người
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMoneyBillWave className="text-yellow-500" />
                  {room.price.toLocaleString()}đ / tháng
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaTag className="text-purple-500" />
                  <span className={`text-sm px-3 py-1 rounded-full ${getStatusBadgeClass(room.status)}`}>
                    {translateStatus(room.status)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyRoomPage
