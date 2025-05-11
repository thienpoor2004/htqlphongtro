import { useState } from "react"

function FilterModal({ onClose, onApply }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    capacity: "",
    amenities: []
  })

  const toggleAmenity = (key) => {
    const current = filters.amenities || []
    const updated = current.includes(key)
      ? current.filter((a) => a !== key)
      : [...current, key]
    setFilters({ ...filters, amenities: updated })
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bộ lọc nâng cao</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Khoảng giá (VNĐ)</label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Tối thiểu"
              className="w-1/2 border rounded px-3 py-2"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Tối đa"
              className="w-1/2 border rounded px-3 py-2"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        {/* Sức chứa */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sức chứa tối thiểu</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Số người"
            value={filters.capacity}
            onChange={(e) =>
              setFilters({ ...filters, capacity: e.target.value })
            }
          />
        </div>

        {/* Tiện nghi */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tiện nghi</label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["wifi", "ac", "pool", "petFriendly", "kitchen"].map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(key)}
                  onChange={() => toggleAmenity(key)}
                />
                {getAmenityLabel(key)}
              </label>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleApply}
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  )
}

function getAmenityLabel(key) {
  switch (key) {
    case "wifi":
      return "Wi-Fi"
    case "ac":
      return "Máy lạnh"
    case "pool":
      return "Hồ bơi"
    case "petFriendly":
      return "Thú cưng"
    case "kitchen":
      return "Bếp"
    default:
      return key
  }
}

export default FilterModal
