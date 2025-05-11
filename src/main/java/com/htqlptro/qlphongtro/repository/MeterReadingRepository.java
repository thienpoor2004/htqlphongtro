package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.MeterReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {
    List<MeterReading> findByRoomId(Long roomId);
}
