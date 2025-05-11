package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.MeterReadingDto;
import com.htqlptro.qlphongtro.service.MeterReadingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meter-readings")
@RequiredArgsConstructor
public class MeterReadingController {

    private final MeterReadingService meterReadingService;

    @PostMapping
    public ResponseEntity<MeterReadingDto> addMeterReading(@RequestBody MeterReadingDto meterReadingDto) {
        return ResponseEntity.ok(meterReadingService.addMeterReading(meterReadingDto));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<MeterReadingDto>> getMeterReadingsByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(meterReadingService.getMeterReadingsByRoom(roomId));
    }
    @PutMapping("/{id}")
    public ResponseEntity<MeterReadingDto> updateMeterReading(@PathVariable Long id, @RequestBody MeterReadingDto dto) {
        return ResponseEntity.ok(meterReadingService.updateMeterReading(id, dto));
    }

}
