import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await AuthService.login(username, password)
      localStorage.setItem("token", res.token)
      navigate("/")
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.svg" alt="Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Chào mừng bạn trở lại 👋
        </h2>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
