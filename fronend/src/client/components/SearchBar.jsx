import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border rounded-full shadow-md max-w-5xl mx-auto mt-6">
      <div className="flex divide-x w-full">
        {/* Khu vực */}
        <div className="px-4 flex flex-col justify-center">
          <p className="text-xs font-semibold mb-1">Khu vực</p>
          <input
            type="text"
            placeholder="Nhập khu vực muốn thuê"
            className="text-sm outline-none w-full placeholder-gray-400"
          />
        </div>

        {/* Ngày vào ở */}
        <div className="px-4 flex flex-col justify-center">
          <p className="text-xs font-semibold mb-1">Ngày vào ở</p>
          <input
            type="date"
            className="text-sm outline-none w-full text-gray-600"
          />
        </div>

        {/* Ngày rời đi */}
        <div className="px-4 flex flex-col justify-center">
          <p className="text-xs font-semibold mb-1">Ngày rời đi</p>
          <input
            type="date"
            className="text-sm outline-none w-full text-gray-600"
          />
        </div>

        {/* Số lượng người */}
        <div className="px-4 flex flex-col justify-center">
          <p className="text-xs font-semibold mb-1">Số lượng người</p>
          <input
            type="number"
            min={1}
            placeholder="Nhập số người"
            className="text-sm outline-none w-full placeholder-gray-400"
          />
        </div>
      </div>

      {/* Nút tìm kiếm */}
      <button className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full ml-4 flex items-center justify-center transition">
        <Search size={18} />
      </button>
    </div>
  )
}

export default SearchBar
