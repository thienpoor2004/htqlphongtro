package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.TenantDto;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import com.htqlptro.qlphongtro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;

    public TenantDto addTenant(TenantDto tenantDto) {
        var user = userRepository.findById(tenantDto.getUserId())
                .orElseThrow(() -> new RuntimeException("❌ User không tồn tại"));

        var tenant = Tenant.builder()
                .fullName(tenantDto.getFullName())
                .identityCard(tenantDto.getIdentityCard())
                .phoneNumber(tenantDto.getPhoneNumber())
                .address(tenantDto.getAddress())
                .email(tenantDto.getEmail())
                .leaseStartDate(tenantDto.getLeaseStartDate())
                .leaseEndDate(tenantDto.getLeaseEndDate())
                .monthlyRent(tenantDto.getMonthlyRent())
                .roomId(tenantDto.getRoomId())
                .status("ACTIVE")
                .user(user)
                .build();

        return mapToDto(tenantRepository.save(tenant));
    }

    public List<TenantDto> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<TenantDto> getTenantsByRoom(Long roomId) {
        return tenantRepository.findByRoomId(roomId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TenantDto updateTenant(Long id, TenantDto tenantDto) {
        var tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Tenant không tồn tại"));

        tenant.setFullName(tenantDto.getFullName());
        tenant.setIdentityCard(tenantDto.getIdentityCard());
        tenant.setPhoneNumber(tenantDto.getPhoneNumber());
        tenant.setAddress(tenantDto.getAddress());
        tenant.setEmail(tenantDto.getEmail());
        tenant.setLeaseStartDate(tenantDto.getLeaseStartDate());
        tenant.setLeaseEndDate(tenantDto.getLeaseEndDate());
        tenant.setMonthlyRent(tenantDto.getMonthlyRent());
        tenant.setRoomId(tenantDto.getRoomId());
        tenant.setStatus(tenantDto.getStatus());

        if (tenantDto.getUserId() != null) {
            var user = userRepository.findById(tenantDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("❌ User không tồn tại"));
            tenant.setUser(user);
        }

        return mapToDto(tenantRepository.save(tenant));
    }

    public void deleteTenant(Long id) {
        tenantRepository.deleteById(id);
    }

    // ✅ Trả về Optional để tránh lỗi 500
    public Optional<TenantDto> getTenantByUserId(Long userId) {
        return tenantRepository.findByUser_Id(userId)
                .map(this::mapToDto);
    }

    public TenantDto getTenantByUsername(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("❌ User không tồn tại"));

        var tenant = tenantRepository.findByUser_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy tenant của user: " + username));

        return mapToDto(tenant);
    }

    private TenantDto mapToDto(Tenant tenant) {
        return TenantDto.builder()
                .id(tenant.getId())
                .fullName(tenant.getFullName())
                .identityCard(tenant.getIdentityCard())
                .phoneNumber(tenant.getPhoneNumber())
                .address(tenant.getAddress())
                .email(tenant.getEmail())
                .leaseStartDate(tenant.getLeaseStartDate())
                .leaseEndDate(tenant.getLeaseEndDate())
                .monthlyRent(tenant.getMonthlyRent())
                .roomId(tenant.getRoomId())
                .status(tenant.getStatus())
                .userId(tenant.getUser() != null ? tenant.getUser().getId() : null)
                .build();
    }
}
