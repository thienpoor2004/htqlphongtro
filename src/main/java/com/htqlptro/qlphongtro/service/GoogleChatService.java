package com.htqlptro.qlphongtro.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class GoogleChatService {

    @Value("${google.api.key}")
    private String apiKey;

    private WebClient webClient;

    @PostConstruct
    public void init() {
        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(30));

        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent") // ✅ Dùng Gemini Flash
                .defaultHeader("Content-Type", "application/json")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }

    public Mono<String> askQuestion(String userMessage) {
        return webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .bodyValue(Map.of(
                        "contents", List.of(
                                Map.of("parts", List.of(
                                        Map.of("text", "Bạn là trợ lý tư vấn phòng trọ. Hãy trả lời tiếng Việt ngắn gọn, lịch sự.\nCâu hỏi: " + userMessage)
                                ))
                        )
                ))
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .map(response -> {
                    if (response.candidates != null && !response.candidates.isEmpty()) {
                        return response.candidates.get(0).content.parts.get(0).text;
                    }
                    return "Xin lỗi, hiện tại tôi chưa thể trả lời.";
                })
                .onErrorResume(error -> {
                    System.err.println("❌ Lỗi Google Gemini:");
                    error.printStackTrace();
                    return Mono.just("Xin lỗi, hệ thống đang tạm thời gặp sự cố.");
                });
    }

    // Định nghĩa lớp phản hồi từ Gemini API
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GeminiResponse {
        @JsonProperty("candidates")
        public List<ChatCandidate> candidates;

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class ChatCandidate {
            @JsonProperty("content")
            public ChatContent content;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class ChatContent {
            @JsonProperty("parts")
            public List<Part> parts;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Part {
            @JsonProperty("text")
            public String text;
        }
    }
}
