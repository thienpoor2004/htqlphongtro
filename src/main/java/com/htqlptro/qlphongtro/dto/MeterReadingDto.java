package com.htqlptro.qlphongtro.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeterReadingDto {
    private Long id;
    private Long roomId;
    private Integer previousElectricReading;
    private Integer currentElectricReading;
    private Integer previousWaterReading;
    private Integer currentWaterReading;
    private Integer electricUsage;
    private Integer waterUsage;
    private LocalDate recordedDate;
}
