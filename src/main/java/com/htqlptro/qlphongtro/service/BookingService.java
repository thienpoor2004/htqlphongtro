package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.Booking;
import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;

    public boolean isRoomAvailable(Room room, LocalDate checkIn, LocalDate checkOut) {
        List<Booking> overlaps = bookingRepo.findByRoomAndCheckOutAfterAndCheckInBefore(room, checkIn, checkOut);
        return overlaps.isEmpty();
    }

    public Booking save(Booking booking) {
        return bookingRepo.save(booking);
    }

    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }

    public List<Booking> getByUser(User user) {
        return bookingRepo.findByUser(user);
    }

    public Optional<Booking> getById(Long id) {
        return bookingRepo.findById(id);
    }

    public void deleteById(Long id) {
        bookingRepo.deleteById(id);
    }
}
