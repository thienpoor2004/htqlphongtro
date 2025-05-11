import { Star, CheckCircle, MapPin, MessageSquare, Clock, DollarSign } from "lucide-react";
import { FaBroom, FaBullseye } from "react-icons/fa"; // cho vệ sinh và chính xác

const mockSummary = {
  average: 5.0,
  details: {
    cleanliness: 4.9,
    accuracy: 5.0,
    checkIn: 4.7,
    communication: 5.0,
    location: 4.7,
    value: 4.9,
  },
};

const criteriaIcons = {
  cleanliness: <FaBroom size={22} className="text-indigo-600" />,
  accuracy: <FaBullseye size={22} className="text-indigo-600" />,
  checkIn: <Clock size={22} className="text-indigo-600" />,
  communication: <MessageSquare size={22} className="text-indigo-600" />,
  location: <MapPin size={22} className="text-indigo-600" />,
  value: <DollarSign size={22} className="text-indigo-600" />,
};

const criteriaLabels = {
  cleanliness: "Vệ sinh",
  accuracy: "Chính xác",
  checkIn: "Nhận phòng",
  communication: "Giao tiếp",
  location: "Vị trí",
  value: "Giá trị",
};

function RoomRatingSummary({ roomId }) {
  const { average, details } = mockSummary; // TODO: gọi API thật sau

  return (
    <div className="border-t pt-6 mt-8">
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-gray-900 flex justify-center items-center gap-2">
          <Star size={36} className="text-yellow-400" />
          {average.toFixed(1)}
        </div>
        <p className="text-lg font-semibold mt-2">Khách yêu thích</p>
        <p className="text-gray-500 text-sm">
          Phòng được đánh giá cao về trải nghiệm, độ tin cậy và phản hồi tích cực
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
        {Object.keys(details).map((key) => (
          <div key={key} className="border-r last:border-none px-2">
            <div className="text-xl font-bold">{details[key]}</div>
            <div className="text-sm font-medium text-gray-700">{criteriaLabels[key]}</div>
            <div className="flex justify-center mt-1">{criteriaIcons[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomRatingSummary;
