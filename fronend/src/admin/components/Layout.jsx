// src/admin/components/AdminLayout.jsx
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </main>

        {/* Footer (optional) */}
        <footer className="text-center text-sm text-gray-400 py-3">
          © {new Date().getFullYear()} QLPhongTro. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
