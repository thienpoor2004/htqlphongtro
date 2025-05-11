import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, role: "USER" }) // 👈 thêm dòng này
          })
          

      if (!res.ok) throw new Error("Đăng ký thất bại")

      navigate("/login")
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.svg" alt="Logo" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tạo tài khoản mới</h2>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow"
          >
            Đăng ký
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Bạn đã có tài khoản?{" "}
          <span
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
