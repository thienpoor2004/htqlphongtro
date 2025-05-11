import { useEffect, useState } from "react";
import { MdOutlinePayment, MdQrCodeScanner, MdHistory } from "react-icons/md";
import AuthService from "../../services/AuthService";
import PaymentService from "../../services/PaymentService";
import OnlinePaymentService from "../../services/OnlinePaymentService";
import TenantService from "../../services/TenantService";

function ClientPaymentPage() {
  const currentUser = AuthService.getCurrentUser();
  const [normalPayments, setNormalPayments] = useState([]);
  const [onlinePayments, setOnlinePayments] = useState([]);
  const [qrUrl, setQrUrl] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  const fetchTenantAndPayments = async () => {
    if (!currentUser?.id) return;
    try {
      const tenant = await TenantService.getByUserId(currentUser.id);
      setTenantId(tenant.id);

      const [normal, online] = await Promise.all([
        PaymentService.getPaymentsByTenant(tenant.id),
        OnlinePaymentService.getByTenant(tenant.id),
      ]);
      setNormalPayments(normal);
      setOnlinePayments(online);
    } catch (err) {
      console.error("Lỗi tải dữ liệu thanh toán:", err);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="text-yellow-600 font-medium">Đang chờ</span>;
      case "SUCCESS":
        return <span className="text-green-600 font-medium">Thành công</span>;
      case "FAILED":
        return <span className="text-red-600 font-medium">Thất bại</span>;
      default:
        return status;
    }
  };

  useEffect(() => {
    fetchTenantAndPayments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <MdHistory className="text-indigo-700 text-3xl" /> Lịch sử thanh toán
      </h2>

      {/* 🔷 Thanh toán thường */}
      <div className="mb-10 bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
          <MdOutlinePayment className="text-blue-600" /> Thanh toán thường
        </h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Số tiền</th>
              <th className="p-2 border">Ngày thanh toán</th>
              <th className="p-2 border">Phương thức</th>
              <th className="p-2 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {normalPayments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Không có thanh toán thường nào.
                </td>
              </tr>
            ) : (
              normalPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{p.amount.toLocaleString()}đ</td>
                  <td className="p-2 border">
                    {p.paymentDate ? new Date(p.paymentDate).toLocaleString("vi-VN") : "--"}
                  </td>
                  <td className="p-2 border">{p.paymentMethod}</td>
                  <td className="p-2 border">{getStatusLabel(p.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔶 Thanh toán online */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
          <MdQrCodeScanner className="text-orange-600" /> Thanh toán online
        </h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Số tiền</th>
              <th className="p-2 border">Ngày tạo</th>
              <th className="p-2 border">Phương thức</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Mã giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {onlinePayments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Không có thanh toán online nào.
                </td>
              </tr>
            ) : (
              onlinePayments.map((p) => (
                <tr
                  key={p.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    if (p.qrCodeUrl) setQrUrl(p.qrCodeUrl);
                    else alert("Không có mã QR cho giao dịch này.");
                  }}
                >
                  <td className="p-2 border">{p.amount.toLocaleString()}đ</td>
                  <td className="p-2 border">
                    {p.paymentDate ? new Date(p.paymentDate).toLocaleString("vi-VN") : "--"}
                  </td>
                  <td className="p-2 border">{p.paymentMethod}</td>
                  <td className="p-2 border">{getStatusLabel(p.status)}</td>
                  <td className="p-2 border text-xs break-all">{p.transactionId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-gray-500">
          Nhấn vào dòng thanh toán để xem mã QR (nếu có).
        </p>
      </div>

      {/* QR hiển thị bằng ảnh thật từ qrserver */}
      {qrUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-1">
              <MdQrCodeScanner className="text-xl" /> Quét mã QR để thanh toán
            </h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                qrUrl
              )}`}
              alt="QR Code"
              className="w-60 h-60 mx-auto mb-4"
            />
            <p className="text-xs break-all text-gray-500">{qrUrl}</p>
            <button
              onClick={() => setQrUrl(null)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientPaymentPage;
