package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.model.ChatMessage;
import com.htqlptro.qlphongtro.service.ChatService;
import com.htqlptro.qlphongtro.repository.ChatMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatMessageRepository chatMessageRepository; // ✅ thêm dòng này

    @PostMapping
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage msg) {
        return ResponseEntity.ok(chatService.sendMessage(msg));
    }

    @GetMapping("/user/{roomId}/{userId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByUser(
        @PathVariable Long roomId,
        @PathVariable Long userId) {
        List<ChatMessage> messages = chatMessageRepository
            .findByRoomIdAndSenderIdOrReceiverIdOrderByCreatedAtAsc(roomId, userId, userId);
        return ResponseEntity.ok(messages);
    }
    
}
