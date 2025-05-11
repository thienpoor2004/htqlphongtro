package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.IssueReportDto;
import com.htqlptro.qlphongtro.model.IssueReport;
import com.htqlptro.qlphongtro.model.IssueStatus;
import com.htqlptro.qlphongtro.repository.IssueReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.model.Room;
import java.time.LocalDateTime;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueReportService {

    private final IssueReportRepository issueReportRepository;
    private final TenantRepository tenantRepository;
    private final RoomRepository roomRepository;

    public List<IssueReportDto> getAllIssueReports() {
        return issueReportRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public IssueReportDto createIssueReport(IssueReportDto issueReportDto) {
        // Kiểm tra xem Tenant có tồn tại không
        Tenant tenant = tenantRepository.findById(issueReportDto.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Room room = roomRepository.findById(issueReportDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        IssueReport issueReport = IssueReport.builder()
                .tenant(tenant)
                .room(room)
                .description(issueReportDto.getDescription())
                .status(IssueStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        issueReportRepository.save(issueReport);

        return mapToDto(issueReport);
    }

    public IssueReportDto updateIssueStatus(Long id, IssueStatus status) {
        IssueReport issueReport = issueReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue Report not found"));

        issueReport.setStatus(status);
        issueReport.setUpdatedAt(LocalDateTime.now());
        issueReportRepository.save(issueReport);

        return mapToDto(issueReport);
    }

    private IssueReportDto mapToDto(IssueReport issueReport) {
        return IssueReportDto.builder()
                .id(issueReport.getId())
                .roomId(issueReport.getRoom().getId())
                .tenantId(issueReport.getTenant().getId())
                .description(issueReport.getDescription())
                .status(issueReport.getStatus())
                .createdAt(issueReport.getCreatedAt())
                .updatedAt(issueReport.getUpdatedAt())
                .build();
    }
    public void deleteIssueReport(Long id) {
        IssueReport issue = issueReportRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Issue not found"));
        issueReportRepository.delete(issue);
    }
    
}
