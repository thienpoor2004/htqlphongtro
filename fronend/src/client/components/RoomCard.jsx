import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  BadgeCheck,
  Heart,
  Wifi,
  ThermometerSnowflake,
  Bath,
  Tv,
  Utensils,
} from "lucide-react";

const translateStatus = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "Còn trống";
    case "RENTED":
      return "Đã thuê";
    default:
      return status;
  }
};

function RoomCard({ room, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/phong/${room.id}`)}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Nhãn nổi bật */}
      {room.featured && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded shadow-md z-10 flex items-center gap-1">
          <BadgeCheck size={12} /> Nổi bật
        </div>
      )}

      {/* Ảnh */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-t-2xl">
        <img
          src={`http://localhost:8080/uploads/${room.imageUrls?.[0]}`}
          alt={`Phòng ${room.roomNumber}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Nút yêu thích */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(room.id);
          }}
          className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 z-10"
        >
          <Heart size={18} fill={room.liked ? "red" : "none"} />
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Home size={18} /> Phòng {room.roomNumber}
          </h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              room.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {translateStatus(room.status)}
          </span>
        </div>

        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
          <Users size={16} /> Sức chứa: {room.capacity} người
        </div>

        <div className="text-indigo-600 font-bold text-base mb-2">
          {room.price.toLocaleString()}đ / tháng
        </div>

        {/* Tiện nghi */}
        <div className="flex flex-wrap gap-3 text-gray-600 text-xs">
          {room.wifi && (
            <div className="flex items-center gap-1">
              <Wifi size={14} /> Wi-Fi
            </div>
          )}
          {room.ac && (
            <div className="flex items-center gap-1">
              <ThermometerSnowflake size={14} /> Máy lạnh
            </div>
          )}
          {room.hotWater && (
            <div className="flex items-center gap-1">
              <Bath size={14} /> Nước nóng
            </div>
          )}
          {room.tv && (
            <div className="flex items-center gap-1">
              <Tv size={14} /> TV
            </div>
          )}
          {room.kitchen && (
            <div className="flex items-center gap-1">
              <Utensils size={14} /> Bếp
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
