import { useEffect, useState, useRef } from "react";
import ChatService from "../../services/ChatService";

const ChatBox = ({ roomId, userId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  const suggestedQuestions = [
    "Phòng này còn trống không?",
    "Tiền điện, nước tính sao vậy?",
    "Có chỗ để xe không?",
    "Thời gian thuê tối thiểu là bao lâu?",
    "Phòng có cho nuôi thú cưng không?"
  ];

  useEffect(() => {
    if (roomId && userId) {
      fetchMessages();

      // Bắt đầu polling mỗi 2s
      pollingRef.current = setInterval(fetchMessages, 2000);
    }

    return () => {
      // Dừng polling khi đóng
      clearInterval(pollingRef.current);
    };
  }, [roomId, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const res = await ChatService.getMessages(roomId, userId);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Lỗi lấy tin nhắn:", err);
      setMessages([]);
    }
  };

  const sendMessage = async (msgText) => {
    const text = msgText ?? content.trim();
    if (!text) return;

    const msg = {
      roomId,
      senderId: userId,
      receiverId: 0,
      content: text,
    };

    try {
      await ChatService.sendMessage(msg);
      setContent("");
      // Không cần setTimeout nữa vì polling sẽ tự lấy sau 2s
    } catch (err) {
      console.error("❌ Lỗi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-lg rounded border relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
      >
        ✕
      </button>

      <h2 className="text-lg font-bold mb-3">💬 Hỏi đáp với chủ trọ</h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="h-64 overflow-y-auto flex flex-col gap-2 mb-3 border rounded p-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[75%] text-sm ${
              msg.senderId === userId ? "ml-auto bg-blue-100" : "bg-gray-200"
            }`}
          >
            <div>{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
