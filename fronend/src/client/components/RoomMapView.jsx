// client/components/RoomMapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function RoomMapView({ rooms, onSelect }) {
  return (
    <div className="h-[70vh] w-full rounded-xl overflow-hidden shadow-md mt-6">
      <MapContainer
        center={[10.762622, 106.660172]} // trung tâm SG, bạn có thể điều chỉnh
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {rooms.map((room) =>
          room.latitude && room.longitude ? (
            <Marker
              key={room.id}
              position={[room.latitude, room.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="w-48 text-sm space-y-1">
                  <img
                    src={`http://localhost:8080/uploads/${room.imageUrls?.[0]}`}
                    alt="room"
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="font-semibold text-base">Phòng {room.roomNumber}</div>
                  <div className="text-indigo-600 font-bold">
                    {room.price.toLocaleString()}đ / tháng
                  </div>
                  <button
                    onClick={() => onSelect(room)}
                    className="text-blue-600 underline text-xs mt-1"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  )
}

export default RoomMapView
