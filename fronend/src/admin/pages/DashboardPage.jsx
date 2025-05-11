import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import {
  HiHomeModern,
  HiUsers,
  HiCurrencyDollar,
  HiChartBar,
  HiChartPie,
} from "react-icons/hi2"

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend)

function DashboardPage() {
  const [roomStats, setRoomStats] = useState({
    totalRooms: 10,
    availableRooms: 6,
    rentedRooms: 4,
  })

  const [revenueStats, setRevenueStats] = useState([
    2, 4, 6, 3, 5, 7, 8, 6, 5, 9, 7, 10,
  ])

  const pieData = {
    labels: ["Còn trống", "Đã thuê"],
    datasets: [
      {
        data: [roomStats.availableRooms, roomStats.rentedRooms],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  }

  const barData = {
    labels: [
      "T1", "T2", "T3", "T4", "T5", "T6",
      "T7", "T8", "T9", "T10", "T11", "T12"
    ],
    datasets: [
      {
        label: "Hợp đồng mới",
        data: revenueStats,
        backgroundColor: "#6366f1",
        borderRadius: 4,
      },
    ],
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <HiChartBar className="text-indigo-700 text-3xl" />
        Bảng điều khiển
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <HiHomeModern className="text-indigo-500 text-4xl" />
          <div>
            <h4 className="text-gray-600">Tổng số phòng</h4>
            <p className="text-2xl font-bold">{roomStats.totalRooms}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <HiUsers className="text-green-500 text-4xl" />
          <div>
            <h4 className="text-gray-600">Phòng trống</h4>
            <p className="text-2xl font-bold">{roomStats.availableRooms}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <HiCurrencyDollar className="text-red-500 text-4xl" />
          <div>
            <h4 className="text-gray-600">Phòng đã thuê</h4>
            <p className="text-2xl font-bold">{roomStats.rentedRooms}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-indigo-700">
            <HiChartBar /> Hợp đồng theo tháng
          </h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-indigo-700">
            <HiChartPie /> Tình trạng phòng
          </h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
