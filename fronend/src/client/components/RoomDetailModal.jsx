import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { X, MapPin, Users, Tag, DollarSign } from "lucide-react"
import { FaWifi, FaSnowflake, FaBath, FaTv, FaUtensils } from "react-icons/fa"
import BookingService from "../../services/BookingService"

// ... các import giữ nguyên
import { Star } from "lucide-react" // icon nổi bật

function RoomDetailModal({ room, onClose, onBookingSuccess }) {
  if (!room) return null;

  const images = room.imageUrls?.length > 0 ? room.imageUrls : [room.imageUrl];
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    { key: "wifi", label: "Wi-Fi", icon: <FaWifi /> },
    { key: "ac", label: "Máy lạnh", icon: <FaSnowflake /> },
    { key: "hotWater", label: "Nước nóng", icon: <FaBath /> },
    { key: "tv", label: "TV", icon: <FaTv /> },
    { key: "kitchen", label: "Bếp", icon: <FaUtensils /> },
  ];

  const handleBooking = async () => {
    if (!window.confirm("Bạn chắc chắn muốn đặt phòng này?")) return;

    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const checkOut = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
      await BookingService.createBooking({ roomId: room.id, checkIn: today, checkOut });
      alert("✅ Đặt phòng thành công!");
      if (onBookingSuccess) onBookingSuccess();
      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Đặt phòng thất bại: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!room} onClose={onClose} className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>

        {/* Ảnh chính */}
        <img
          src={`http://localhost:8080/uploads/${images[activeIndex]}`}
          className="w-full h-64 object-cover rounded-xl mb-4 shadow-sm"
          alt="Room"
        />

        {/* Ảnh phụ */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:8080/uploads/${img}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                idx === activeIndex ? "border-indigo-500" : "border-gray-200 hover:border-gray-400"
              }`}
              alt={`thumb-${idx}`}
            />
          ))}
        </div>

        {/* Thông tin */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1 text-indigo-700 flex items-center gap-2">
            Phòng {room.roomNumber}
            {room.featured && (
              <span className="text-yellow-500 text-sm flex items-center gap-1">
                <Star size={16} /> Nổi bật
              </span>
            )}
          </h2>

          {room.location && (
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <MapPin size={16} /> {room.location}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            <Users size={16} /> Sức chứa: {room.capacity} người
          </p>
          {room.area && (
            <p className="text-sm text-gray-600 mb-1 flex gap-2">
              Diện tích: {room.area} m²
            </p>
          )}
          {room.floor && (
            <p className="text-sm text-gray-600 mb-1 flex gap-2">
              Tầng: {room.floor}
            </p>
          )}
          <p className="text-lg text-red-600 font-semibold mb-1 flex items-center gap-2">
            <DollarSign size={16} /> {room.price.toLocaleString()}đ / tháng
          </p>
          <p className="mb-2 flex items-center gap-2">
            <Tag size={16} />
            Trạng thái:{" "}
            <span
              className={room.status === "AVAILABLE" ? "text-green-600 font-medium" : "text-red-600"}
            >
              {room.status === "AVAILABLE" ? "Còn trống" : "Đã thuê"}
            </span>
          </p>
        </div>

        {/* Mô tả */}
        {room.description && (
          <>
            <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
            <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">{room.description}</p>
          </>
        )}

        {/* Tiện nghi */}
        <h3 className="text-lg font-semibold mb-2">Tiện nghi</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-sm text-gray-700">
          {amenitiesList.map(
            (a) =>
              room[a.key] && (
                <div key={a.key} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="text-indigo-600">{a.icon}</span> {a.label}
                </div>
              )
          )}
        </div>

        {/* Nút đặt */}
        {room.status === "AVAILABLE" && (
          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-semibold transition"
          >
            {loading ? "Đang đặt phòng..." : "Đặt phòng"}
          </button>
        )}
      </div>
    </Dialog>
  );
}

export default RoomDetailModal;

