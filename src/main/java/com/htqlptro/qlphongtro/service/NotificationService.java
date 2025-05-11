package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.Notification;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.repository.NotificationRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final TenantRepository tenantRepository;
    private final JavaMailSender mailSender;

    // 📌 Gửi email thông báo
    public void sendEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    // 📌 Tạo thông báo mới
    public void createNotification(Long tenantId, String type, String message) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Notification notification = Notification.builder()
                .tenant(tenant)
                .type(type)
                .message(message)
                .status("PENDING")
                .sentDate(null)
                .build();

        notificationRepository.save(notification);
    }
    // 📌 Gửi thông báo tự động (Chạy mỗi ngày vào 8h sáng)
    @Scheduled(cron = "0 0 8 * * ?")
    public void processPendingNotifications() {
        List<Notification> notifications = notificationRepository.findByStatus("PENDING");
        for (Notification notification : notifications) {
            try {
                sendEmail(notification.getTenant().getEmail(),
                        "Thông báo từ hệ thống phòng trọ",
                        notification.getMessage());

                notification.setStatus("SENT");
                notification.setSentDate(LocalDateTime.now());
                notificationRepository.save(notification);
            } catch (Exception e) {
                notification.setStatus("FAILED");
                notificationRepository.save(notification);
            }
        }
    }
    public List<Notification> getAll() {
        return notificationRepository.findAll();
    }
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }
    public void resendNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
    
        try {
            sendEmail(
                notification.getTenant().getEmail(),
                "Thông báo từ hệ thống phòng trọ",
                notification.getMessage()
            );
    
            notification.setStatus("SENT");
            notification.setSentDate(LocalDateTime.now());
            notificationRepository.save(notification);
        } catch (Exception e) {
            notification.setStatus("FAILED");
            notificationRepository.save(notification);
            
            // In lỗi chi tiết ra log
            e.printStackTrace();
    
            throw new RuntimeException("Gửi email thất bại: " + e.getMessage(), e);
        }
    }   
}
