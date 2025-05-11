package com.htqlptro.qlphongtro.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    @JsonIgnoreProperties({"user", "hibernateLazyInitializer"}) // ⬅️ thêm dòng này
    private Tenant tenant;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(columnDefinition = "TEXT")
    private String reply;
    @Column(nullable = false)
    private String status = "PENDING"; // PENDING | REPLIED | RESOLVED


    private LocalDateTime createdAt;
    private LocalDateTime repliedAt;
}
