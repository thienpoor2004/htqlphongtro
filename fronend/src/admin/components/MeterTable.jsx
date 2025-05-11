import { AiFillEdit } from "react-icons/ai";

function MeterTable({ readings, onEdit }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700">
          <tr>
            <th className="px-4 py-2">Ngày ghi</th>
            <th className="px-4 py-2">Điện cũ</th>
            <th className="px-4 py-2">Điện mới</th>
            <th className="px-4 py-2">Số điện</th>
            <th className="px-4 py-2">Nước cũ</th>
            <th className="px-4 py-2">Nước mới</th>
            <th className="px-4 py-2">Số nước</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{r.recordedDate}</td>
              <td className="px-4 py-2">{r.previousElectricReading}</td>
              <td className="px-4 py-2">{r.currentElectricReading}</td>
              <td className="px-4 py-2">{r.electricUsage}</td>
              <td className="px-4 py-2">{r.previousWaterReading}</td>
              <td className="px-4 py-2">{r.currentWaterReading}</td>
              <td className="px-4 py-2">{r.waterUsage}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => onEdit(r)} className="text-blue-600 hover:underline flex items-center gap-1">
                  <AiFillEdit /> Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeterTable;
