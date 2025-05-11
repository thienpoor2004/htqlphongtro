function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Trang trước
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Trang sau
        </button>
      </div>
    )
  }
  export default Pagination
  