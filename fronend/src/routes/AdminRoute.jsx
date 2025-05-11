// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom"

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user?.role === "ADMIN" // ✅ chỉ cần role

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}

export default AdminRoute
