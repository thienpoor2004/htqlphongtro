package com.htqlptro.qlphongtro.dto;

import com.htqlptro.qlphongtro.model.IssueStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IssueReportDto {
    private Long id;
    private Long roomId;
    private Long tenantId;
    private String description;
    private IssueStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

