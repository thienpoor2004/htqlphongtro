package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.IssueReportDto;
import com.htqlptro.qlphongtro.model.IssueStatus;
import com.htqlptro.qlphongtro.service.IssueReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue-reports")
@RequiredArgsConstructor
public class IssueReportController {

    private final IssueReportService issueReportService;

    @GetMapping
    public ResponseEntity<List<IssueReportDto>> getAllIssueReports() {
        return ResponseEntity.ok(issueReportService.getAllIssueReports());
    }

    @PostMapping
    public ResponseEntity<IssueReportDto> createIssueReport(@RequestBody IssueReportDto issueReportDto) {
        return ResponseEntity.ok(issueReportService.createIssueReport(issueReportDto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IssueReportDto> updateIssueStatus(
            @PathVariable Long id,
            @RequestParam("status") IssueStatus status) {
        return ResponseEntity.ok(issueReportService.updateIssueStatus(id, status));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssueReport(@PathVariable Long id) {
        issueReportService.deleteIssueReport(id);
        return ResponseEntity.noContent().build();
    }
    
}

