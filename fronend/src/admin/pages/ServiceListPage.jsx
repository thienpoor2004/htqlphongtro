import { useEffect, useState } from "react"
import ServiceService from "../../services/ServiceService"
import ServiceModal from "../components/ServiceModal"
import ServiceTable from "../components/ServiceTable"
import { FaPlus } from "react-icons/fa"

function ServiceListPage() {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const fetchServices = async () => {
    const data = await ServiceService.getAllServices()
    setServices(data)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleAdd = () => {
    setSelectedService(null)
    setShowModal(true)
  }

  const handleEdit = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      await ServiceService.deleteService(id)
      fetchServices()
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Quản lý Dịch vụ</h2>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm dịch vụ
        </button>
      </div>

      <ServiceTable services={services} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchServices()
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default ServiceListPage
