import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService"

function Header() {
  const navigate = useNavigate()
  const isLogin = AuthService.isLoggedIn()
  const currentUser = AuthService.getCurrentUser()

  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    AuthService.logout()
    navigate("/login")
  }

const isAdmin = currentUser?.role === "ADMIN"


  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">🏡 Người thuê trọ</h1>

        <nav className="space-x-4 flex items-center text-sm relative">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/liked" className="text-pink-600 hover:underline">Yêu thích</Link>
          {isLogin && <Link to="/my-room" className="hover:underline">Phòng của tôi</Link>}
          {isLogin && <Link to="/my-bills" className="hover:underline">Hóa đơn</Link>}
          {isLogin && <Link to="/lich-su-thanh-toan" className="hover:underline">Thanh toán</Link>}
          <Link to="/phan-hoi" className="hover:underline">Góp ý</Link>
          {!isLogin && <Link to="/login" className="hover:underline">Đăng nhập</Link>}

          {/* 👉 Chỉ hiện nếu là admin */}
          {isLogin && isAdmin && (
            <Link to="/admin" className="hover:underline text-green-600 font-semibold">
              Quản trị
            </Link>
          )}

          {isLogin && (
            <div className="relative ml-4" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="focus:outline-none"
              >
                <img
                  src="/images/avatar-demo.png"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-gray-700 font-medium border-b">
                    👋 {currentUser?.sub || "Người dùng"}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setShowMenu(false)}
                  >
                    Thông tin tài khoản
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
