package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.model.OnlinePayment;
import com.htqlptro.qlphongtro.service.OnlinePaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/online-payments")
@RequiredArgsConstructor
public class OnlinePaymentController {

    private final OnlinePaymentService onlinePaymentService;

    // 📌 Tạo thanh toán online
    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> request) {
        try {
            Long tenantId = Long.parseLong(request.get("tenantId").toString());
            Double amount = Double.parseDouble(request.get("amount").toString());
            String paymentMethod = request.get("paymentMethod").toString();

            OnlinePayment payment = onlinePaymentService.createPayment(tenantId, amount, paymentMethod);
            return ResponseEntity.ok(payment);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Dữ liệu không hợp lệ."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi server: " + e.getMessage()));
        }
    }

    // 📌 Lấy danh sách thanh toán theo tenantId
    @GetMapping("/{tenantId}")
    public ResponseEntity<List<OnlinePayment>> getPaymentsByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(onlinePaymentService.getPaymentsByTenant(tenantId));
    }

    // 📌 Cập nhật trạng thái thanh toán
    @PutMapping("/update-status")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String, String> request) {
        try {
            String transactionId = request.get("transactionId");
            String status = request.get("status");
            onlinePaymentService.updatePaymentStatus(transactionId, status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Cập nhật thất bại: " + e.getMessage()));
        }
    }

    // 📌 Lấy toàn bộ thanh toán
    @GetMapping
    public ResponseEntity<List<OnlinePayment>> getAllPayments() {
        return ResponseEntity.ok(onlinePaymentService.getAllPayments());
    }

    // 📌 Xoá thanh toán
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        try {
            onlinePaymentService.deletePayment(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Xoá thất bại: " + e.getMessage()));
        }
    }
}
