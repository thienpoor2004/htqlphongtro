package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.DepositDto;
import com.htqlptro.qlphongtro.service.DepositService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deposits")
@RequiredArgsConstructor
public class DepositController {

    private final DepositService depositService;

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<DepositDto>> getDepositsByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(depositService.getDepositsByTenant(tenantId));
    }

    @PostMapping
    public ResponseEntity<DepositDto> createDeposit(@RequestBody DepositDto depositDto) {
        return ResponseEntity.ok(depositService.createDeposit(depositDto));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<DepositDto> confirmDeposit(@PathVariable Long id) {
        return ResponseEntity.ok(depositService.confirmDeposit(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<DepositDto> cancelDeposit(@PathVariable Long id) {
        return ResponseEntity.ok(depositService.cancelDeposit(id));
    }
    @GetMapping
public ResponseEntity<List<DepositDto>> getAllDeposits() {
    return ResponseEntity.ok(depositService.getAllDeposits());
}

}
