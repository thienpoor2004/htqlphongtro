package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.TenantDto;
import com.htqlptro.qlphongtro.service.TenantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    @PostMapping
    public ResponseEntity<TenantDto> addTenant(@RequestBody TenantDto tenantDto) {
        return ResponseEntity.ok(tenantService.addTenant(tenantDto));
    }

    @GetMapping
    public ResponseEntity<List<TenantDto>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<TenantDto>> getTenantsByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(tenantService.getTenantsByRoom(roomId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TenantDto> updateTenant(@PathVariable Long id, @RequestBody TenantDto tenantDto) {
        return ResponseEntity.ok(tenantService.updateTenant(id, tenantDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.ok("Tenant deleted successfully");
    }

    // ✅ Trả về 200 nếu có, 404 nếu không có (ép kiểu để tránh lỗi lambda)
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getTenantByUserId(@PathVariable Long userId) {
        return tenantService.getTenantByUserId(userId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Tenant not found for userId: " + userId));
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<TenantDto> getTenantByUsername(@PathVariable String username) {
        return ResponseEntity.ok(tenantService.getTenantByUsername(username));
    }
}
