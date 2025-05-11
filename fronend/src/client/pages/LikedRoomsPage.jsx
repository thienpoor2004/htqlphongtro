import { useEffect, useState } from "react"
import RoomService from "../../services/RoomService"
import RoomCard from "../components/RoomCard"
import RoomDetailModal from "../components/RoomDetailModal"

function LikedRoomsPage() {
  const [rooms, setRooms] = useState([])
  const [likedRooms, setLikedRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await RoomService.getPublicRooms()
        const liked = data.filter((room) => favorites.includes(room.id))
        setRooms(data)
        setLikedRooms(liked)
      } catch (err) {
        console.error("Lỗi khi tải danh sách phòng:", err)
      }
    }

    fetchRooms()
  }, [favorites])

  const toggleFavorite = (roomId) => {
    const updated = favorites.includes(roomId)
      ? favorites.filter((id) => id !== roomId)
      : [...favorites, roomId]
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Phòng bạn đã yêu thích</h2>

      {likedRooms.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Bạn chưa có phòng nào trong danh sách yêu thích.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {likedRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={{ ...room, liked: favorites.includes(room.id) }}
              onClick={setSelectedRoom}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </div>
  )
}

export default LikedRoomsPage
