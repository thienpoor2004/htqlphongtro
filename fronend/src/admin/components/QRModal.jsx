function QRModal({ url, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Quét mã để thanh toán</h3>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              url
            )}`}
            alt="QR Code"
            className="mx-auto"
          />
          <p className="mt-2 text-sm break-words">{url}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }
  
  export default QRModal;
  