package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.UserDto;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDto);
    }

    public UserDto saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto updateUser(Long id, User newData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (newData.getPassword() != null && !newData.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(newData.getPassword()));
        }

        user.setRole(newData.getRole());
        User updated = userRepository.save(user);
        return convertToDto(updated);
    }

    // ✅ Hàm chuyển đổi User → UserDto đầy đủ
    private UserDto convertToDto(User user) {
        Long tenantId = (user.getTenants() != null && !user.getTenants().isEmpty())
                ? user.getTenants().get(0).getId()
                : null;

        String fullName = (user.getTenants() != null && !user.getTenants().isEmpty())
                ? user.getTenants().get(0).getFullName()
                : null;

        String email = (user.getTenants() != null && !user.getTenants().isEmpty())
                ? user.getTenants().get(0).getEmail()
                : null;

        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                tenantId,
                fullName,
                email
        );
    }
}
