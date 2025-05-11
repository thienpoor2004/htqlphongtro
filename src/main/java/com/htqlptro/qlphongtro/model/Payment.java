package com.htqlptro.qlphongtro.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tenantId; // ID của khách thuê

    @Column(nullable = false)
    private Double amount; // Số tiền thanh toán

    @Column(nullable = false)
    private String paymentMethod; // Hình thức thanh toán (Tiền mặt, Chuyển khoản,...)

    @Column(nullable = false)
    private LocalDateTime paymentDate; // Ngày thanh toán

    @Column(nullable = false)
    private String status; // Trạng thái (PENDING, COMPLETED, FAILED)

    @PrePersist
    public void prePersist() {
        this.paymentDate = LocalDateTime.now();
    }
}
