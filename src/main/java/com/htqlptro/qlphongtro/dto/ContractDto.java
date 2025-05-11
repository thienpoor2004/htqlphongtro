package com.htqlptro.qlphongtro.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractDto {
    private Long id;
    private Long tenantId;
    private String tenantName;
    private Long roomId;
    private String roomNumber;
    private Long userId; // ✅ Bắt buộc để lấy từ localStorage ở frontend
    private LocalDate startDate;
    private LocalDate endDate;
    private Double deposit;
}
