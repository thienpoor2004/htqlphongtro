import { useEffect, useState } from "react"
import RoomFormFields from "./RoomFormFields"
import RoomService from "../../services/RoomService"

function RoomModal({ room, onClose, onSuccess }) {
  const [form, setForm] = useState({
    roomNumber: "",
    capacity: "",
    price: "",
    status: "AVAILABLE",
    area: "",
    description: "",
    floor: "",
    location: "",
    featured: false,
    wifi: false,
    ac: false,
    hotWater: false,
    tv: false,
    kitchen: false,
    imageFiles: [],
    imagePreviews: [],
  })

  useEffect(() => {
    if (room) {
      const previews = room.imageUrls?.map(
        (name) => `http://localhost:8080/uploads/${name}`
      ) || []

      setForm({
        roomNumber: room.roomNumber || "",
        capacity: room.capacity || "",
        price: room.price || "",
        status: room.status || "AVAILABLE",
        area: room.area || "",
        description: room.description || "",
        floor: room.floor || "",
        location: room.location || "",
        featured: room.featured || false,
        wifi: room.wifi || false,
        ac: room.ac || false,
        hotWater: room.hotWater || false,
        tv: room.tv || false,
        kitchen: room.kitchen || false,
        imageFiles: [],
        imagePreviews: previews,
      })
    } else {
      setForm({
        roomNumber: "",
        capacity: "",
        price: "",
        status: "AVAILABLE",
        area: "",
        description: "",
        floor: "",
        location: "",
        featured: false,
        wifi: false,
        ac: false,
        hotWater: false,
        tv: false,
        kitchen: false,
        imageFiles: [],
        imagePreviews: [],
      })
    }
  }, [room])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setForm((prev) => ({
      ...prev,
      imageFiles: files,
      imagePreviews: files.map((file) => URL.createObjectURL(file)),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("roomNumber", form.roomNumber)
      formData.append("capacity", form.capacity)
      formData.append("price", form.price)
      formData.append("status", form.status)
      formData.append("area", form.area)
      formData.append("description", form.description)
      formData.append("floor", form.floor)
      formData.append("location", form.location)
      formData.append("featured", form.featured)
      formData.append("wifi", form.wifi)
      formData.append("ac", form.ac)
      formData.append("hotWater", form.hotWater)
      formData.append("tv", form.tv)
      formData.append("kitchen", form.kitchen)

      form.imageFiles.forEach((file) => {
        formData.append("images", file)
      })

      if (room) {
        await RoomService.updateRoom(room.id, formData)
      } else {
        await RoomService.createRoom(formData)
      }

      onSuccess()
    } catch (err) {
      console.error("Lỗi chi tiết:", err.response?.data || err.message)
      alert("Lỗi khi lưu phòng: " + JSON.stringify(err.response?.data || err.message))
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          {room ? "Cập nhật Phòng" : "Thêm Phòng"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <RoomFormFields
            form={form}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleCheckboxChange={handleCheckboxChange}
          />

          <div className="flex justify-end space-x-2 mt-4 sticky bottom-0 bg-white pt-4 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {room ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoomModal
