package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.service.RevenueReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.Map;

@RestController
@RequestMapping("/api/revenue")
@RequiredArgsConstructor
public class RevenueReportController {

    private final RevenueReportService revenueReportService;

    // 📌 API thống kê tổng thu nhập theo tháng
    @GetMapping("/monthly")
    public ResponseEntity<Map<YearMonth, BigDecimal>> getMonthlyRevenue() {
        return ResponseEntity.ok(revenueReportService.getMonthlyRevenue());
    }

    // 📌 API thống kê số tiền đặt cọc và hoàn trả
    @GetMapping("/deposit-summary")
    public ResponseEntity<Map<String, BigDecimal>> getDepositSummary() {
        return ResponseEntity.ok(revenueReportService.getDepositSummary());
    }
}
