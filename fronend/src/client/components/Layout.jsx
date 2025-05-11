import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function ClientLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ClientLayout
