package com.htqlptro.qlphongtro.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    private String type; // PAYMENT_DUE, CONTRACT_END
    private String message;
    private String status; // PENDING, SENT, FAILED
    private LocalDateTime sentDate;
}
