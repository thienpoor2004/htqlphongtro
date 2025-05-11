package com.htqlptro.qlphongtro.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    private int capacity;
    private double price;
    private String status;

    // ✅ Tiện nghi
    private boolean wifi;
    private boolean ac;
    private boolean hotWater;
    private boolean tv;
    private boolean kitchen;

    // ✅ Chi tiết phòng thêm mới
    @Column(columnDefinition = "TEXT")
    private String description;

    private Double area; // Diện tích (m²)
    private String location; // Địa chỉ
    private Integer floor;   // Tầng
    private Double latitude; // Vị trí bản đồ
    private Double longitude;
    private boolean featured; // Nổi bật

    @ElementCollection
    @CollectionTable(name = "room_images", joinColumns = @JoinColumn(name = "room_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
