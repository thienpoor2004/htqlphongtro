package com.htqlptro.qlphongtro.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TenantDto {
    private Long id;
    private String fullName;
    private String identityCard;
    private String phoneNumber;
    private String address;
    private String email;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;
    private Double monthlyRent;
    private Long roomId;
    private String status;

    private Long userId; // 🔗 Thêm để ánh xạ quan hệ với User
}
