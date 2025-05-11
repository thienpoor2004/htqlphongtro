package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.OnlinePayment;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.repository.OnlinePaymentRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OnlinePaymentService {

    private final OnlinePaymentRepository onlinePaymentRepository;
    private final TenantRepository tenantRepository;

    // ✅ Tạo thanh toán mới với QR code URL giả lập theo payment method
    public OnlinePayment createPayment(Long tenantId, Double amount, String paymentMethod) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Tenant với ID: " + tenantId));

        String transactionId = UUID.randomUUID().toString();

        // ✅ Gán QR URL giả lập theo loại thanh toán
        String baseQrUrl = switch (paymentMethod.toUpperCase()) {
            case "MOMO" -> "https://momo.vn/qr/";
            case "ZALOPAY" -> "https://zalopay.vn/pay/";
            case "VNPAY" -> "https://vnpay.vn/scan/";
            default -> "https://example.com/fakeqr/";
        };

        String qrUrl = baseQrUrl + transactionId;

        OnlinePayment payment = OnlinePayment.builder()
                .tenant(tenant)
                .amount(amount)
                .paymentMethod(paymentMethod)
                .transactionId(transactionId)
                .qrCodeUrl(qrUrl)
                .status("PENDING")
                .paymentDate(LocalDateTime.now())
                .build();

        return onlinePaymentRepository.save(payment);
    }

    // 📌 Lấy danh sách thanh toán theo Tenant ID
    public List<OnlinePayment> getPaymentsByTenant(Long tenantId) {
        return onlinePaymentRepository.findByTenant_Id(tenantId);
    }

    // 📌 Lấy toàn bộ thanh toán
    public List<OnlinePayment> getAllPayments() {
        return onlinePaymentRepository.findAll();
    }

    // 📌 Cập nhật trạng thái giao dịch
    public void updatePaymentStatus(String transactionId, String status) {
        OnlinePayment payment = onlinePaymentRepository.findAll()
                .stream()
                .filter(p -> transactionId.equals(p.getTransactionId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch với Transaction ID: " + transactionId));

        payment.setStatus(status);
        onlinePaymentRepository.save(payment);
    }

    // 📌 Xoá thanh toán
    public void deletePayment(Long id) {
        if (!onlinePaymentRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy thanh toán để xoá với ID: " + id);
        }
        onlinePaymentRepository.deleteById(id);
    }
}
