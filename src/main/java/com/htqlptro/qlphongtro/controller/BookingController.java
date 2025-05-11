package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.BookingRequest;
import com.htqlptro.qlphongtro.model.Booking;
import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import com.htqlptro.qlphongtro.repository.UserRepository;
import com.htqlptro.qlphongtro.security.JwtUtil;
import com.htqlptro.qlphongtro.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired private BookingService bookingService;
    @Autowired private RoomRepository roomRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtUtil jwtUtil;

    // ✅ Đặt phòng
    @PostMapping
    public ResponseEntity<?> bookRoom(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BookingRequest dto
    ) {
        try {
            String username = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));

            Room room = roomRepo.findById(dto.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));

            LocalDate inDate = LocalDate.parse(dto.getCheckIn());
            LocalDate outDate = LocalDate.parse(dto.getCheckOut());

            if (!bookingService.isRoomAvailable(room, inDate, outDate)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Phòng đã được đặt trong khoảng thời gian này."));
            }

            room.setStatus("RENTED");
            roomRepo.save(room);

            Booking booking = new Booking(null, inDate, outDate, room, user);
            Booking saved = bookingService.save(booking);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi đặt phòng: " + e.getMessage()));
        }
    }

    // ✅ Admin: Lấy toàn bộ danh sách đặt phòng
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(bookingService.getAll());
    }

    // ✅ Người dùng: Xem lịch sử đặt phòng
    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(@RequestHeader("Authorization") String authHeader) {
        try {
            String username = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
            User user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
            return ResponseEntity.ok(bookingService.getByUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Lỗi: " + e.getMessage()));
        }
    }

    // ✅ Huỷ đặt phòng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getById(id);
        if (booking.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy đặt phòng"));
        }
        bookingService.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Đã huỷ đặt phòng thành công."));
    }
}
