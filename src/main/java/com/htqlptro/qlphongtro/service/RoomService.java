package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public List<Room> findByUser(User user) {
        return roomRepository.findAllByUser(user);
    }
}
