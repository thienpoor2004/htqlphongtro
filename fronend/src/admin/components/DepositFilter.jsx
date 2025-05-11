function DepositFilter({ filter, setFilter }) {
  return (
    <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Tìm theo phòng"
        className="border p-2 rounded"
        value={filter.room}
        onChange={(e) => setFilter({ ...filter, room: e.target.value })}
      />
      <select
        className="border p-2 rounded"
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      >
        <option value="">-- Tất cả trạng thái --</option>
        <option value="PENDING">Chờ</option>
        <option value="CONFIRMED">Xác nhận</option>
        <option value="CANCELLED">Đã hủy</option>
      </select>
    </div>
  );
}

export default DepositFilter;
