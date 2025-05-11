// src/services/ChatService.js
import axios from "axios";

const API = "/api/chat";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const ChatService = {
  // ✅ Lấy tin nhắn theo roomId và userId có auth token
  getMessages(roomId, userId) {
    return axios.get(`${API}/user/${roomId}/${userId}`, getAuthHeaders());
  },

  // ✅ Gửi tin nhắn có auth token
  sendMessage(message) {
    return axios.post(API, message, getAuthHeaders());
  },
};

export default ChatService;
