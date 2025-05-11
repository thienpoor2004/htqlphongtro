package com.htqlptro.qlphongtro.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // Tên dịch vụ (Điện, Nước, Internet, Rác...)

    @Column(nullable = false)
    private Double price; // Giá dịch vụ mỗi tháng

    @Column(nullable = false)
    private String unit; // Đơn vị tính (kWh, m³, VNĐ/tháng...)
}
