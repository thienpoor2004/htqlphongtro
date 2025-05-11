package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.service.NotificationService;
import lombok.RequiredArgsConstructor;
import com.htqlptro.qlphongtro.model.Notification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Void> createNotification(@RequestBody Map<String, Object> request) {
        Long tenantId = Long.parseLong(request.get("tenantId").toString());
        String type = request.get("type").toString();
        String message = request.get("message").toString();

        notificationService.createNotification(tenantId, type, message);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAll());
    }

    // ✅ Duy nhất phương thức này cho gửi lại
    @PatchMapping("/{id}/resend")
    public ResponseEntity<Void> resendNotification(@PathVariable Long id) {
        notificationService.resendNotification(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

