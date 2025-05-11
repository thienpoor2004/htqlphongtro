package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.PaymentDto;
import com.htqlptro.qlphongtro.model.Payment;
import com.htqlptro.qlphongtro.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentDto createPayment(PaymentDto paymentDto) {
        Payment payment = Payment.builder()
                .tenantId(paymentDto.getTenantId())
                .amount(paymentDto.getAmount())
                .paymentMethod(paymentDto.getPaymentMethod())
                .paymentDate(paymentDto.getPaymentDate() != null
                        ? paymentDto.getPaymentDate().atStartOfDay()
                        : LocalDateTime.now())
                .status(paymentDto.getStatus() != null ? paymentDto.getStatus() : "PENDING")
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        return mapToDto(savedPayment);
    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll()
                .stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<PaymentDto> getPaymentsByTenant(Long tenantId) {
        return paymentRepository.findByTenantId(tenantId)
                .stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PaymentDto updatePayment(Long id, PaymentDto paymentDto) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setStatus(paymentDto.getStatus());

        if (paymentDto.getPaymentDate() != null) {
            payment.setPaymentDate(paymentDto.getPaymentDate().atStartOfDay());
        }

        Payment updatedPayment = paymentRepository.save(payment);
        return mapToDto(updatedPayment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    private PaymentDto mapToDto(Payment payment) {
        return PaymentDto.builder()
                .id(payment.getId())
                .tenantId(payment.getTenantId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate().toLocalDate()) // ✅ Chuyển từ LocalDateTime → LocalDate
                .status(payment.getStatus())
                .build();
    }
}
