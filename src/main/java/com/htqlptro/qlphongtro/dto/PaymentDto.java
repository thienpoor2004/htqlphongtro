package com.htqlptro.qlphongtro.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {
    private Long id;
    private Long tenantId;
    private Double amount;
    private String paymentMethod;
    private LocalDate paymentDate;
    private String status;
}
