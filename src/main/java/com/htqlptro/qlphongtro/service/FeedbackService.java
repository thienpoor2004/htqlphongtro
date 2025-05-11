package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.Feedback;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.repository.FeedbackRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepo;
    private final TenantRepository tenantRepo;
    private final JavaMailSender mailSender;

    public Feedback sendFeedback(Long tenantId, String message) {
        Tenant tenant = tenantRepo.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Feedback feedback = Feedback.builder()
                .tenant(tenant)
                .message(message)
                .createdAt(LocalDateTime.now())
                .status("PENDING")
                .build();

        return feedbackRepo.save(feedback);
    }

    public List<Feedback> getAll() {
        return feedbackRepo.findAll();
    }

    public List<Feedback> getByTenant(Long tenantId) {
        return feedbackRepo.findByTenantId(tenantId);
    }

    public Feedback replyToFeedback(Long feedbackId, String reply) {
        Feedback feedback = feedbackRepo.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        feedback.setReply(reply);
        feedback.setRepliedAt(LocalDateTime.now());
        feedback.setStatus("REPLIED");
        Feedback saved = feedbackRepo.save(feedback);

        sendReplyEmail(saved.getTenant(), reply); // ✅ gửi mail
        return saved;
    }

    public void markResolved(Long feedbackId) {
        Feedback feedback = feedbackRepo.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setStatus("RESOLVED");
        feedbackRepo.save(feedback);
    }

    public void delete(Long id) {
        feedbackRepo.deleteById(id);
    }

    @Async
    public void sendReplyEmail(Tenant tenant, String replyContent) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(tenant.getEmail());
        mail.setSubject("Phản hồi từ quản lý trọ");
        mail.setText("Chào " + tenant.getFullName() + ",\n\n" +
                "Phản hồi từ quản lý:\n" + replyContent + "\n\nTrân trọng!");
        mailSender.send(mail);
    }
}
