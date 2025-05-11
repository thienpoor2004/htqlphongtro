package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.UserDto;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.UserRepository;
import com.htqlptro.qlphongtro.security.JwtUtil;
import com.htqlptro.qlphongtro.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody User user) {
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        UserDto savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String rawPassword = request.get("password");

            System.out.println("⏩ Attempting login for: " + username);

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found in DB: " + username));

            System.out.println("✅ Found user: " + username);
            System.out.println("🔒 Encoded password in DB: " + user.getPassword());

            if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
                System.out.println("❌ Bad credentials for user: " + username);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Sai tên đăng nhập hoặc mật khẩu"));
            }

            String token = jwtUtil.generateToken(user);

            // ✅ Lấy tenantId đầu tiên nếu có
            Long tenantId = (user.getTenants() != null && !user.getTenants().isEmpty())
                    ? user.getTenants().get(0).getId()
                    : null;

            // ✅ Tạo UserDto để frontend lưu vào localStorage
            UserDto userDto = new UserDto(
                    user.getId(),
                    user.getUsername(),
                    user.getRole(),
                    tenantId,
                    null, // fullName nếu có
                    null  // email nếu có
            );

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", userDto
            ));

        } catch (BadCredentialsException e) {
            System.out.println("❌ Bad credentials: " + request.get("username"));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Sai tên đăng nhập hoặc mật khẩu"));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi khi đăng nhập"));
        }
    }
}
