import { useState } from "react";
import OnlinePaymentService from "../../services/OnlinePaymentService";

function CreatePaymentButton({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleCreatePayment = async () => {
    const confirm = window.confirm("Bạn muốn tạo thanh toán online?");
    if (!confirm) return;

    setLoading(true);
    try {
      // 🔥 Lấy user từ localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      const data = {
        tenantId: user.id, // ⚡ Tự động gắn tenantId từ user
        amount: 500000, // tuỳ chỉnh số tiền
        paymentMethod: "MOMO", // hoặc VNPAY, ZALOPAY
      };

      const res = await OnlinePaymentService.create(data);
      alert("Tạo thanh toán thành công!");
      window.open(res.qrCodeUrl, "_blank"); // mở link QR

      onSuccess?.(); // reload lại danh sách nếu cần
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Đã có lỗi khi tạo thanh toán.";
      alert(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreatePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
    >
      {loading ? "Đang xử lý..." : "Tạo thanh toán"}
    </button>
  );
}

export default CreatePaymentButton;
