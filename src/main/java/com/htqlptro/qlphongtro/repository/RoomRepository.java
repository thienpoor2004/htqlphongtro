package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.User;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findAllByUser(User user);
    List<Room> findByStatus(String status); // hoặc boolean isAvailable
}

