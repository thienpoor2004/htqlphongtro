import {
  FaUserLock,       // Phòng riêng
  FaUsers,          // Phòng ghép
  FaHome,           // Nguyên căn
  FaMoneyBillWave,  // Giá rẻ
  FaSchool,         // Gần trường
  FaDoorOpen,       // Không chung chủ
  FaToilet,         // WC riêng
  FaFilter,         // Icon bộ lọc
} from "react-icons/fa"

const categories = [
  { key: "privateRoom", label: "Phòng riêng", icon: <FaUserLock /> },
  { key: "sharedRoom", label: "Phòng ghép", icon: <FaUsers /> },
  { key: "entireHouse", label: "Nguyên căn", icon: <FaHome /> },
  { key: "under2m", label: "< 2 triệu", icon: <FaMoneyBillWave /> },
  { key: "nearSchool", label: "Gần trường", icon: <FaSchool /> },
  { key: "noOwner", label: "Không chung chủ", icon: <FaDoorOpen /> },
  { key: "privateWC", label: "WC riêng", icon: <FaToilet /> },
]

function FilterBar({ selected, onSelect, onOpenFilter }) {
  return (
    <div className="flex items-center justify-between overflow-x-auto px-4 py-3 space-x-6 border-b">
      <div className="flex items-center space-x-6 flex-shrink-0">
        {categories.map((item) => {
          const isActive = item.key === selected
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`flex flex-col items-center text-xs pb-2 border-b-2 ${
                isActive
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:text-indigo-600"
              }`}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
        <button
          onClick={onOpenFilter}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-sm"
        >
          <FaFilter className="text-gray-600" />
          Bộ lọc
        </button>
      </div>
    </div>
  )
}

export default FilterBar
