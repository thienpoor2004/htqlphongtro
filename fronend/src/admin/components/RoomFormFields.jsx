import {
  FaDoorOpen, FaMoneyBillWave, FaUsers, FaToggleOn, FaImage,
  FaWifi, FaSnowflake, FaBath, FaTv, FaUtensils, FaRulerCombined,
  FaFileAlt, FaMapMarkerAlt, FaStar, FaBuilding
} from "react-icons/fa"

function RoomFormFields({ form, handleChange, handleFileChange, handleCheckboxChange }) {
  return (
    <>
      {/* Số phòng */}
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
          <FaDoorOpen /> Số phòng
        </label>
        <input
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200"
          placeholder="Nhập số phòng..."
        />
      </div>

      {/* Giá, sức chứa, diện tích, tầng */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <FaMoneyBillWave /> Giá thuê (VNĐ)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="VD: 3000000"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <FaUsers /> Sức chứa
          </label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="VD: 2"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <FaRulerCombined /> Diện tích (m²)
          </label>
          <input
            type="number"
            name="area"
            value={form.area}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="VD: 25"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <FaBuilding /> Tầng
          </label>
          <input
            type="number"
            name="floor"
            value={form.floor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="VD: 1"
          />
        </div>
      </div>

      {/* Vị trí */}
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
          <FaMapMarkerAlt /> Vị trí / địa chỉ
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="VD: 123 Lê Lợi, Quận 1"
        />
      </div>

      {/* Mô tả */}
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
          <FaFileAlt /> Mô tả chi tiết
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2"
          placeholder="Mô tả chi tiết về phòng..."
        />
      </div>

      {/* Trạng thái và nổi bật */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            <FaToggleOn /> Trạng thái
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="AVAILABLE">Còn trống</option>
            <option value="RENTED">Đã thuê</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-7">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleCheckboxChange}
          />
          <FaStar className="text-yellow-500" /> Phòng nổi bật
        </div>
      </div>

      {/* Tiện nghi */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-2">Tiện nghi</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="wifi" checked={form.wifi} onChange={handleCheckboxChange} />
            <FaWifi /> Wi-Fi
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="ac" checked={form.ac} onChange={handleCheckboxChange} />
            <FaSnowflake /> Máy lạnh
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="hotWater" checked={form.hotWater} onChange={handleCheckboxChange} />
            <FaBath /> Nước nóng
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="tv" checked={form.tv} onChange={handleCheckboxChange} />
            <FaTv /> TV
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="kitchen" checked={form.kitchen} onChange={handleCheckboxChange} />
            <FaUtensils /> Bếp
          </label>
        </div>
      </div>

      {/* Hình ảnh */}
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
          <FaImage /> Hình ảnh phòng (có thể chọn nhiều)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />

        {/* Xem trước ảnh */}
        {form.imagePreviews?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {form.imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="w-28 h-20 object-cover border rounded shadow"
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default RoomFormFields
