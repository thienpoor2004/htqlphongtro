const API_URL = "http://localhost:8080/api/bookings"

const getToken = () => localStorage.getItem("token")

const BookingService = {
  // ✅ Tạo đặt phòng (bookingData: { roomId, checkIn, checkOut })
  createBooking: async (bookingData) => {
    const token = getToken()
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error("❌ Đặt phòng thất bại: " + error)
    }

    return res.json()
  },

  // ✅ Lấy toàn bộ booking (cho admin)
  getAll: async () => {
    const token = getToken()
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error("❌ Không thể tải danh sách đặt phòng: " + error)
    }

    return res.json()
  },

  // ✅ Lấy lịch sử đặt phòng của người dùng hiện tại
  getMyBookings: async () => {
    const token = getToken()
    const res = await fetch(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error("❌ Không thể tải lịch sử đặt phòng: " + error)
    }

    return res.json()
  },

  // ✅ Huỷ đặt phòng theo ID
  deleteBooking: async (id) => {
    const token = getToken()
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error("❌ Huỷ đặt phòng thất bại: " + error)
    }

    return res.text()
  },
}

export default BookingService
