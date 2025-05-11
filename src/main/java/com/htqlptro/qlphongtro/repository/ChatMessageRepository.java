package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomIdOrderByCreatedAtAsc(Long roomId);
    List<ChatMessage> findByRoomIdAndSenderId(Long roomId, Long senderId);
    List<ChatMessage> findByRoomIdAndSenderIdOrReceiverIdOrderByCreatedAtAsc(
    Long roomId, Long senderId, Long receiverId);


}
