// repository/BookingRepository.java
package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Booking;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // ✅ Kiểm tra trùng lịch
    List<Booking> findByRoomAndCheckOutAfterAndCheckInBefore(Room room, LocalDate checkIn, LocalDate checkOut);

    // ✅ Tìm booking theo người dùng
    List<Booking> findByUser(User user);
}

