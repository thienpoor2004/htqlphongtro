package com.htqlptro.qlphongtro.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "online_payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnlinePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant; // Gắn với Tenant (mà Tenant đã gắn với User)

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String paymentMethod;  // MOMO, ZALOPAY, VNPAY

    @Column(nullable = false, unique = true)
    private String transactionId; // Mã giao dịch duy nhất

    @Column(nullable = false)
    private String status; // PENDING, SUCCESS, FAILED

    private LocalDateTime paymentDate; // Thời gian thanh toán (set khi thành công)

    private String qrCodeUrl; // URL mã QR để thanh toán (nếu có)
}
