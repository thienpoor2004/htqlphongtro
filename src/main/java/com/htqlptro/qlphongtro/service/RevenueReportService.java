package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.repository.PaymentRepository;
import com.htqlptro.qlphongtro.repository.DepositRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
@Service
@RequiredArgsConstructor
public class RevenueReportService {

    private final PaymentRepository paymentRepository;
    private final DepositRepository depositRepository;

    // 📌 Thống kê tổng thu nhập từ các khoản thanh toán theo tháng
    public Map<YearMonth, BigDecimal> getMonthlyRevenue() {
        return paymentRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        payment -> YearMonth.from(payment.getPaymentDate()),
                        Collectors.mapping(payment -> BigDecimal.valueOf(payment.getAmount()),
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))
                ));
    }

    // 📌 Thống kê tổng số tiền đặt cọc và hoàn trả
    public Map<String, BigDecimal> getDepositSummary() {
        BigDecimal totalDeposits = depositRepository.findAll().stream()
                .filter(deposit -> deposit.getStatus().equals("CONFIRMED"))
                .map(deposit -> BigDecimal.valueOf(deposit.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalRefunds = depositRepository.findAll().stream()
                .filter(deposit -> deposit.getStatus().equals("REFUNDED"))
                .map(deposit -> BigDecimal.valueOf(deposit.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return Map.of(
                "Total Deposits", totalDeposits,
                "Total Refunds", totalRefunds
        );
    }
}
