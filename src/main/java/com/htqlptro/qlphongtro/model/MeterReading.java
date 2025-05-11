package com.htqlptro.qlphongtro.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "meter_readings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeterReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room; // Phòng nào sử dụng điện/nước

    @Column(nullable = false)
    private Integer previousElectricReading; // Chỉ số điện tháng trước

    @Column(nullable = false)
    private Integer currentElectricReading; // Chỉ số điện hiện tại

    @Column(nullable = false)
    private Integer previousWaterReading; // Chỉ số nước tháng trước

    @Column(nullable = false)
    private Integer currentWaterReading; // Chỉ số nước hiện tại

    @Column(nullable = false)
    private LocalDate recordedDate; // Ngày ghi chỉ số

    public Integer getElectricUsage() {
        return currentElectricReading - previousElectricReading;
    }

    public Integer getWaterUsage() {
        return currentWaterReading - previousWaterReading;
    }
}
