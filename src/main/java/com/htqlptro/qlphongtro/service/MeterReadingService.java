package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.MeterReadingDto;
import com.htqlptro.qlphongtro.model.MeterReading;
import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.repository.MeterReadingRepository;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeterReadingService {

    private final MeterReadingRepository meterReadingRepository;
    private final RoomRepository roomRepository;

    public MeterReadingDto addMeterReading(MeterReadingDto dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        MeterReading meterReading = MeterReading.builder()
                .room(room)
                .previousElectricReading(dto.getPreviousElectricReading())
                .currentElectricReading(dto.getCurrentElectricReading())
                .previousWaterReading(dto.getPreviousWaterReading())
                .currentWaterReading(dto.getCurrentWaterReading())
                .recordedDate(dto.getRecordedDate())
                .build();

        MeterReading savedMeterReading = meterReadingRepository.save(meterReading);
        return mapToDto(savedMeterReading);
    }

    public List<MeterReadingDto> getMeterReadingsByRoom(Long roomId) {
        return meterReadingRepository.findByRoomId(roomId)
                .stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private MeterReadingDto mapToDto(MeterReading meterReading) {
        return MeterReadingDto.builder()
                .id(meterReading.getId())
                .roomId(meterReading.getRoom().getId())
                .previousElectricReading(meterReading.getPreviousElectricReading())
                .currentElectricReading(meterReading.getCurrentElectricReading())
                .previousWaterReading(meterReading.getPreviousWaterReading())
                .currentWaterReading(meterReading.getCurrentWaterReading())
                .electricUsage(meterReading.getElectricUsage())
                .waterUsage(meterReading.getWaterUsage())
                .recordedDate(meterReading.getRecordedDate())
                .build();
    }
    public MeterReadingDto updateMeterReading(Long id, MeterReadingDto dto) {
        MeterReading existing = meterReadingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Meter reading not found"));
    
        Room room = roomRepository.findById(dto.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found"));
    
        existing.setRoom(room);
        existing.setRecordedDate(dto.getRecordedDate());
        existing.setPreviousElectricReading(dto.getPreviousElectricReading());
        existing.setCurrentElectricReading(dto.getCurrentElectricReading());
        existing.setPreviousWaterReading(dto.getPreviousWaterReading());
        existing.setCurrentWaterReading(dto.getCurrentWaterReading());
    
        MeterReading updated = meterReadingRepository.save(existing);
        return mapToDto(updated);
    }
    
}
