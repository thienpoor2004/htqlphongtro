function IssueFilter({ filter, setFilter }) {
    return (
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo mã phòng"
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
          <option value="PENDING">Chờ xử lý</option>
          <option value="IN_PROGRESS">Đang xử lý</option>
          <option value="RESOLVED">Đã xử lý</option>
        </select>
      </div>
    );
  }
  export default IssueFilter;
  