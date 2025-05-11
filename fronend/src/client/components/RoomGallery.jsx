import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function RoomGallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-6 relative">
      {/* Vùng ảnh chính dạng slide */}
      <div className="overflow-hidden rounded-xl aspect-[4/3] w-full relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:8080/uploads/${img}`}
              alt={`slide-${idx}`}
              className="min-w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Nút chuyển ảnh */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail chọn nhanh */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:8080/uploads/${img}`}
              onClick={() => setIndex(idx)}
              className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 ${
                idx === index ? "border-indigo-600" : "border-gray-300"
              }`}
              alt={`thumb-${idx}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomGallery;
