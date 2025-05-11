package com.htqlptro.qlphongtro.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BillDto {
    private Long id;
    private Long contractId;
    private Double electricityBill;
    private Double waterBill;
    private Double totalAmount;
    private LocalDate dueDate;
    private Boolean isPaid;
}
