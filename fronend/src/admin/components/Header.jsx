import { useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService"

function Header({ toggleSidebar }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    navigate("/") // 👈 chuyển về trang chủ người dùng
  }

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Nút toggle sidebar (mobile) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-2xl text-indigo-600 focus:outline-none"
      >
        ☰
      </button>

      {/* Tiêu đề */}
      <h1 className="text-lg md:text-2xl font-bold text-indigo-700 hidden md:block">
        Hệ thống quản lý phòng trọ
      </h1>

      {/* Thông tin admin */}
      <div className="flex items-center space-x-3">
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff"
          alt="Admin Avatar"
          className="w-9 h-9 rounded-full shadow-md"
        />
        <div className="hidden sm:flex flex-col text-sm">
          <span className="font-medium text-gray-800">Admin</span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-500 hover:underline"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
