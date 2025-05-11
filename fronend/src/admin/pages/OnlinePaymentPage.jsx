import { useState, useEffect } from "react";
import OnlinePaymentService from "../../services/OnlinePaymentService";
import OnlinePaymentTable from "../components/OnlinePaymentTable";
import OnlinePaymentModal from "../components/OnlinePaymentModal";
import QRModal from "../components/QRModal";

function OnlinePaymentPage() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await OnlinePaymentService.getAll();
      setPayments(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu thanh toán:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const result = await OnlinePaymentService.create(formData);
      setShowModal(false);
      fetchPayments();
      if (result.qrCodeUrl || result.payUrl) {
        setQrUrl(result.qrCodeUrl || result.payUrl);
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || "Tạo thanh toán thất bại!";
      alert(errorMessage);
      console.error("Lỗi tạo thanh toán:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thanh toán này?")) return;
    try {
      await OnlinePaymentService.delete(id);
      fetchPayments();
    } catch (err) {
      console.error("Lỗi khi xoá thanh toán:", err);
      alert("Xoá thất bại!");
    }
  };

  const handleResend = async (transactionId) => {
    try {
      await OnlinePaymentService.resend(transactionId);
      fetchPayments();
    } catch (err) {
      console.error("Lỗi khi gửi lại thanh toán:", err);
      alert("Gửi lại thất bại!");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold text-indigo-700">📜 Quản lý Thanh toán Online</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          + Tạo thanh toán
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Đang tải dữ liệu thanh toán...</div>
      ) : (
        <OnlinePaymentTable
          payments={payments}
          onDelete={handleDelete}
          onResend={handleResend}
        />
      )}

      {showModal && (
        <OnlinePaymentModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
        />
      )}

      {qrUrl && <QRModal url={qrUrl} onClose={() => setQrUrl(null)} />}
    </div>
  );
}

export default OnlinePaymentPage;
