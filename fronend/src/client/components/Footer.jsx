function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Cột 1: Hỗ trợ */}
        <div>
          <h4 className="font-semibold mb-2">Hỗ trợ</h4>
          <ul className="space-y-1">
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">AirCover</a></li>
            <li><a href="#">Chống phân biệt đối xử</a></li>
            <li><a href="#">Hỗ trợ người khuyết tật</a></li>
            <li><a href="#">Tuỳ chọn huỷ</a></li>
            <li><a href="#">Báo cáo vấn đề khu vực</a></li>
          </ul>
        </div>

        {/* Cột 2: Cho thuê */}
        <div>
          <h4 className="font-semibold mb-2">Cho thuê</h4>
          <ul className="space-y-1">
            <li><a href="#">Đăng phòng của bạn</a></li>
            <li><a href="#">AirCover cho Chủ nhà</a></li>
            <li><a href="#">Tài nguyên cho Chủ nhà</a></li>
            <li><a href="#">Cộng đồng Chủ nhà</a></li>
            <li><a href="#">Cho thuê có trách nhiệm</a></li>
            <li><a href="#">Tìm bạn đồng hành</a></li>
          </ul>
        </div>

        {/* Cột 3: Về chúng tôi */}
        <div>
          <h4 className="font-semibold mb-2">Về chúng tôi</h4>
          <ul className="space-y-1">
            <li><a href="#">Tin tức</a></li>
            <li><a href="#">Tính năng mới</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Nhà đầu tư</a></li>
            <li><a href="#">Thẻ quà tặng</a></li>
            <li><a href="#">Airbnb.org cứu trợ</a></li>
          </ul>
        </div>

        {/* Cột 4: Ngôn ngữ & bản quyền */}
        <div className="text-gray-500">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Ngôn ngữ & Tiền tệ</h4>
            <p>🌐 Tiếng Việt (VN)</p>
            <p>💲 VND</p>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Quản lý phòng trọ, Inc.
            <br />
            <a href="#" className="underline mr-2">Điều khoản</a>
            <a href="#" className="underline mr-2">Sitemap</a>
            <a href="#" className="underline">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
