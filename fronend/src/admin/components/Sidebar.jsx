import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaBed,
  FaUserFriends,
  FaMoneyBillWave,
  FaCogs,
  FaFileContract,
  FaWallet,
  FaBug,
  FaTachometerAlt,
  FaReceipt,
  FaBell,
  FaUsersCog,
  FaComments,
  FaCalendarCheck,
} from "react-icons/fa";

const menuGroups = [
  {
    title: "Quản lý",
    items: [
      { label: "Dashboard", path: "/admin", icon: <FaHome /> },
      { label: "Phòng", path: "/admin/rooms", icon: <FaBed /> },
      { label: "Đặt phòng", path: "/admin/bookings", icon: <FaCalendarCheck /> }, // ✅ MỚI THÊM
      { label: "Khách thuê", path: "/admin/tenants", icon: <FaUserFriends /> },
      { label: "Thanh toán", path: "/admin/payments", icon: <FaMoneyBillWave /> },
      { label: "Dịch vụ", path: "/admin/services", icon: <FaCogs /> },
      { label: "Hợp đồng", path: "/admin/contracts", icon: <FaFileContract /> },
      { label: "Cọc", path: "/admin/deposits", icon: <FaWallet /> },
      { label: "Sự cố", path: "/admin/issues", icon: <FaBug /> },
      { label: "Chỉ số", path: "/admin/meters", icon: <FaTachometerAlt /> },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      { label: "Hóa đơn", path: "/admin/bills", icon: <FaReceipt /> },
      { label: "Thông báo", path: "/admin/notifications", icon: <FaBell /> },
      { label: "Thanh toán Online", path: "/admin/online-payments", icon: <FaWallet /> },
      { label: "Tài khoản", path: "/admin/users", icon: <FaUsersCog /> },
      { label: "Góp ý / Hỗ trợ", path: "/admin/feedbacks", icon: <FaComments /> },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState("Quản lý");

  const toggleGroup = (group) => {
    setExpandedGroup((prev) => (prev === group ? null : group));
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <div className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        🏡 Quản lý trọ
      </div>

      {menuGroups.map((group) => (
        <div key={group.title} className="mb-4">
          <button
            onClick={() => toggleGroup(group.title)}
            className="w-full flex justify-between items-center px-4 py-2 font-semibold text-indigo-700 hover:bg-indigo-50 rounded"
          >
            <span>{group.title}</span>
            {expandedGroup === group.title ? <FaChevronDown /> : <FaChevronRight />}
          </button>

          {expandedGroup === group.title && (
            <nav className="space-y-1 mt-2">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ml-2 ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
