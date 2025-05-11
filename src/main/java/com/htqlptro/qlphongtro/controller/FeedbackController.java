package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.model.Feedback;
import com.htqlptro.qlphongtro.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> sendFeedback(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("📩 Yêu cầu gửi góp ý: " + body);

            if (!body.containsKey("tenantId") || !body.containsKey("message")) {
                return ResponseEntity.badRequest().body("Thiếu tenantId hoặc message");
            }

            Long tenantId = Long.parseLong(body.get("tenantId").toString());
            String message = body.get("message").toString();

            Feedback feedback = feedbackService.sendFeedback(tenantId, message);
            return ResponseEntity.ok(feedback);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Lỗi hệ thống khi gửi góp ý");
        }
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAll());
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Feedback>> getByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(feedbackService.getByTenant(tenantId));
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<?> replyToFeedback(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String reply = body.get("reply");
            if (reply == null || reply.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Nội dung phản hồi không được để trống");
            }

            Feedback updated = feedbackService.replyToFeedback(id, reply);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Lỗi khi phản hồi góp ý");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        feedbackService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
