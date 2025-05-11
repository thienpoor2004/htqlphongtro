package com.htqlptro.qlphongtro.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class DepositDto {
    private Long id;
    private Long tenantId;
    private Long roomId; // ✅ Đảm bảo có roomId trong DTO
    private Double amount;
    private LocalDate depositDate;
    private String status;
}
