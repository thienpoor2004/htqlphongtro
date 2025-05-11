import { Routes, Route } from "react-router-dom"

import AdminLayout from "./admin/components/Layout"
import DashboardPage from "./admin/pages/DashboardPage"
import RoomListPage from "./admin/pages/RoomListPage"
import TenantListPage from "./admin/pages/TenantListPage"
import PaymentListPage from "./admin/pages/PaymentListPage"
import ServiceListPage from "./admin/pages/ServiceListPage"
import ContractListPage from "./admin/pages/ContractListPage"
import DepositListPage from "./admin/pages/DepositListPage"
import IssueListPage from "./admin/pages/IssueListPage"
import MeterListPage from "./admin/pages/MeterListPage"
import BillListPage from "./admin/pages/BillListPage"
import NotificationListPage from "./admin/pages/NotificationListPage"
import OnlinePaymentPage from "./admin/pages/OnlinePaymentPage"
import UserListPage from "./admin/pages/UserListPage"
import FeedbackListPage from "./admin/pages/FeedbackListPage"
import BookingListPage from "./admin/pages/BookingListPage"

import ClientLayout from "./client/components/Layout"
import HomePage from "./client/pages/HomePage"
import MyRoomPage from "./client/pages/MyRoomPage"
import PaymentPage from "./client/pages/PaymentPage"
import LoginPage from "./client/pages/LoginPage"
import LikedRoomsPage from "./client/pages/LikedRoomsPage"
import RegisterPage from "./client/pages/RegisterPage"
import ClientPaymentPage from "./client/pages/ClientPaymentPage"
import RoomDetailPage from "./client/pages/RoomDetailPage"
import FeedbackPage from "./client/pages/FeedbackPage"

import PrivateRoute from "./routes/PrivateRoute"
import AdminRoute from "./routes/AdminRoute" // ✅ import mới

function App() {
  return (
    <Routes>
      {/* Admin - chỉ cho phép ROLE_ADMIN */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="rooms" element={<RoomListPage />} />
        <Route path="tenants" element={<TenantListPage />} />
        <Route path="payments" element={<PaymentListPage />} />
        <Route path="services" element={<ServiceListPage />} />
        <Route path="contracts" element={<ContractListPage />} />
        <Route path="deposits" element={<DepositListPage />} />
        <Route path="issues" element={<IssueListPage />} />
        <Route path="meters" element={<MeterListPage />} />
        <Route path="bills" element={<BillListPage />} />
        <Route path="notifications" element={<NotificationListPage />} />
        <Route path="online-payments" element={<OnlinePaymentPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="feedbacks" element={<FeedbackListPage />} />
        <Route path="bookings" element={<BookingListPage />} />
      </Route>

      {/* Client */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="liked" element={<LikedRoomsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="phong/:id" element={<RoomDetailPage />} />

        {/* Các route cần đăng nhập */}
        <Route element={<PrivateRoute />}>
          <Route path="my-room" element={<MyRoomPage />} />
          <Route path="my-bills" element={<PaymentPage />} />
          <Route path="lich-su-thanh-toan" element={<ClientPaymentPage />} />
          <Route path="phan-hoi" element={<FeedbackPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
