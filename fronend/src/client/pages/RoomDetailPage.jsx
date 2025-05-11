import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomService from "../../services/RoomService";
import BookingService from "../../services/BookingService";
import {
  MapPin, Users, Tag, DollarSign, ArrowLeft, Ruler, Layers, Info
} from "lucide-react";
import {
  FaWifi, FaSnowflake, FaBath, FaTv, FaUtensils, FaStar
} from "react-icons/fa";

import RoomGallery from "../components/RoomGallery";
import RoomRatingSummary from "../components/RoomRatingSummary";

function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    { key: "wifi", label: "Wi-Fi", icon: <FaWifi /> },
    { key: "ac", label: "Máy lạnh", icon: <FaSnowflake /> },
    { key: "hotWater", label: "Nước nóng", icon: <FaBath /> },
    { key: "tv", label: "TV", icon: <FaTv /> },
    { key: "kitchen", label: "Bếp", icon: <FaUtensils /> },
  ];

  useEffect(() => {
    RoomService.getById(id)
      .then((data) => setRoom(data))
      .catch(() => alert("Không tìm thấy phòng!"));
  }, [id]);

  const handleBooking = async () => {
    if (!window.confirm("Bạn chắc chắn muốn đặt phòng này?")) return;
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const checkOut = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
      await BookingService.createBooking({ roomId: room.id, checkIn: today, checkOut });
      alert("✅ Đặt phòng thành công!");
      navigate("/my-room");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Đặt phòng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!room) {
    return <div className="p-6 text-center text-gray-500">Đang tải thông tin phòng...</div>;
  }

  const images = room.imageUrls?.length > 0 ? room.imageUrls : [room.imageUrl];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-gray-600 hover:text-indigo-600"
      >
        <ArrowLeft size={18} className="mr-1" /> Quay lại
      </button>

      {/* Layout 2 cột */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cột trái - Gallery */}
        <div className="md:w-1/2">
          <RoomGallery images={images} />
        </div>

        {/* Cột phải - Thông tin */}
        <div className="md:w-1/2 space-y-3 text-[17px] leading-relaxed">

          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            Phòng {room.roomNumber}
            {room.featured && (
              <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                <FaStar size={12} /> Nổi bật
              </span>
            )}
          </h1>

          {room.location && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} /> Địa chỉ: {room.location}
            </p>
          )}

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Users size={16} /> Sức chứa: {room.capacity} người
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Ruler size={16} /> Diện tích: {room.area} m²
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Layers size={16} /> Tầng: {room.floor}
          </p>

          <p className="text-lg text-red-600 font-semibold flex items-center gap-2">
            <DollarSign size={16} /> {room.price.toLocaleString()}đ / tháng
          </p>

          <p className="flex items-center gap-2">
            <Tag size={16} /> Trạng thái:{" "}
            <span className={room.status === "AVAILABLE" ? "text-green-600 font-medium" : "text-red-600"}>
              {room.status === "AVAILABLE" ? "Còn trống" : "Đã thuê"}
            </span>
          </p>

          {room.description && (
            <p className="text-sm text-gray-700 flex items-start gap-2 mt-2">
              <Info size={16} className="mt-1" /> {room.description}
            </p>
          )}
        </div>
      </div>

      {/* Tiện nghi */}
      <h3 className="text-lg font-semibold mt-8 mb-2">Tiện nghi</h3>
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

      {/* Đánh giá */}
      <RoomRatingSummary roomId={room.id} />

      {/* Nút đặt phòng */}
      {room.status === "AVAILABLE" && (
        <div className="mt-6">
          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Đang đặt phòng..." : "Đặt phòng ngay"}
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomDetailPage;
