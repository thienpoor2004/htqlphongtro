package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.model.ChatMessage;
import com.htqlptro.qlphongtro.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatRepo;

    @Autowired
    private GoogleChatService googleChatService; // ✅ Đã đổi sang GoogleChatService

    public ChatMessage sendMessage(ChatMessage msg) {
        msg.setCreatedAt(LocalDateTime.now());
        ChatMessage saved = chatRepo.save(msg);

        // Nếu là tin nhắn từ người dùng thì gọi Google trả lời
        if (msg.getSenderId() != null && msg.getSenderId() < 1000) {
            googleChatService.askQuestion(msg.getContent())
                    .subscribeOn(Schedulers.boundedElastic())
                    .subscribe(replyText -> {
                        System.out.println("✅ Google trả lời: " + replyText);

                        ChatMessage reply = new ChatMessage();
                        reply.setRoomId(msg.getRoomId());
                        reply.setSenderId(0L); // Hệ thống trả lời
                        reply.setReceiverId(msg.getSenderId());
                        reply.setContent(replyText);
                        reply.setCreatedAt(LocalDateTime.now());
                        chatRepo.save(reply);
                    }, error -> {
                        System.err.println("❌ Lỗi khi gọi Google Chat API:");
                        error.printStackTrace();
                    });
        }

        return saved;
    }

    public List<ChatMessage> getMessages(Long roomId) {
        return chatRepo.findByRoomIdOrderByCreatedAtAsc(roomId);
    }
}
