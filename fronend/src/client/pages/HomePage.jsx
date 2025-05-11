import { useEffect, useState } from "react"
import RoomService from "../../services/RoomService"
import FilterBar from "../components/FilterBar"
import FilterModal from "../components/FilterModal"
import RoomCard from "../components/RoomCard"
import RoomDetailModal from "../components/RoomDetailModal"
import Pagination from "../components/Pagination"
import RoomMapView from "../components/RoomMapView"
import ChatBox from "../components/ChatBox"
import SearchBar from "../components/SearchBar" // 👉 thêm dòng này

function HomePage() {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites")
    return saved ? JSON.parse(saved) : []
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [mapMode, setMapMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  const [searchData, setSearchData] = useState({
    keyword: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  })

  const perPage = 5

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.id) {
      setCurrentUserId(user.id)
    }
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const data = await RoomService.getPublicRooms()
      const availableRooms = data.filter((r) => r.status === "AVAILABLE")
      setRooms(availableRooms)
      setFilteredRooms(availableRooms)
    } catch (err) {
      console.error("Lỗi khi tải danh sách phòng:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const applyFilters = (filters = {}) => {
    let result = [...rooms]
    const {
      keyword,
      location,
      minPrice,
      maxPrice,
      capacity,
      status,
      amenities
    } = filters

    if (keyword) {
      const kw = keyword.toLowerCase()
      result = result.filter(
        (r) =>
          r.roomNumber?.toLowerCase().includes(kw) ||
          r.location?.toLowerCase().includes(kw)
      )
    }

    if (location) {
      result = result.filter(
        (r) => r.location?.toLowerCase() === location.toLowerCase()
      )
    }

    if (minPrice) result = result.filter((r) => r.price >= parseFloat(minPrice))
    if (maxPrice) result = result.filter((r) => r.price <= parseFloat(maxPrice))
    if (capacity) result = result.filter((r) => r.capacity >= parseInt(capacity))
    if (status) result = result.filter((r) => r.status === status)

    if (amenities && amenities.length > 0) {
      amenities.forEach((key) => {
        result = result.filter((r) => r[key] === true)
      })
    }

    if (selectedCategory) {
      result = result.filter((r) =>
        r.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    setCurrentPage(1)
    setFilteredRooms(result)
  }

  const toggleFavorite = (roomId) => {
    setFavorites((prev) => {
      const updated = prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const handleCategorySelect = (categoryKey) => {
    const newCategory = categoryKey === selectedCategory ? "" : categoryKey
    setSelectedCategory(newCategory)
    applyFilters({ ...searchData, category: newCategory })
  }

  const handleSearchChange = (field, value) => {
    const newData = { ...searchData, [field]: value }
    setSearchData(newData)
    applyFilters(newData)
  }

  const paginatedRooms = filteredRooms
    .map((r) => ({ ...r, liked: favorites.includes(r.id) }))
    .slice((currentPage - 1) * perPage, currentPage * perPage)

  const totalPages = Math.ceil(filteredRooms.length / perPage)

  return (
    <div className="p-6 relative">
      {/* Dùng đúng SearchBar thuần Việt */}
      <SearchBar onSearchChange={handleSearchChange} searchData={searchData} />

      <div className="mb-6 border-b border-gray-200 mt-4">
        <FilterBar
          selected={selectedCategory}
          onSelect={handleCategorySelect}
          onOpenFilter={() => setShowFilterModal(true)}
        />
      </div>

      {/* TIÊU ĐỀ TRUNG TÂM CÓ GẠCH NGANG */}
<div className="my-8">
  <div className="flex items-center justify-center w-full max-w-5xl mx-auto px-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <h2 className="mx-4 text-lg md:text-xl tracking-widest font-semibold text-gray-800 uppercase">
      Phòng trọ hiện có
    </h2>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>

  {/* Nút xem bản đồ bên phải */}
  <div className="flex justify-end mt-2 max-w-5xl mx-auto px-4">
    <button
      onClick={() => setMapMode(!mapMode)}
      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm transition"
    >
      {mapMode ? "Xem danh sách" : "Xem bản đồ"}
    </button>
  </div>
</div>


      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
          <svg className="animate-spin h-10 w-10 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="text-sm font-medium">Đang tải phòng...</span>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Không có phòng phù hợp với tiêu chí lọc.
        </div>
      ) : mapMode ? (
        <RoomMapView rooms={filteredRooms} onSelect={setSelectedRoom} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {paginatedRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onClick={setSelectedRoom}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookingSuccess={fetchRooms}
      />

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={(filters) => applyFilters({ ...searchData, ...filters })}
        />
      )}

      {currentUserId && (
        <>
          {!showChat && (
            <button
              onClick={() => setShowChat(true)}
              className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg z-50 hover:bg-blue-700"
            >
              💬
            </button>
          )}

          {showChat && (
            <div className="fixed bottom-4 right-4 z-50">
              <ChatBox roomId={1} userId={currentUserId} onClose={() => setShowChat(false)} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage
