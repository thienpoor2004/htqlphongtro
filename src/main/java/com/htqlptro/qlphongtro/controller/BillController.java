package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.BillDto;
import com.htqlptro.qlphongtro.security.JwtUtil;
import com.htqlptro.qlphongtro.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;
    private final JwtUtil jwtUtil;


    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<BillDto>> getBillsByTenantId(@PathVariable Long tenantId) {
        return ResponseEntity.ok(billService.getBillsByTenantId(tenantId));
    }
    @GetMapping("/my-bills")
    public ResponseEntity<List<BillDto>> getMyBills(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token); // lấy từ JWT

        return ResponseEntity.ok(billService.getBillsByUsername(username));
    }
    @PutMapping("/{id}/pay")
    public ResponseEntity<BillDto> markBillAsPaid(@PathVariable Long id) {
        return ResponseEntity.ok(billService.markAsPaid(id));
    }
    @PutMapping("/{id}/unpay")
public ResponseEntity<BillDto> markBillAsUnpaid(@PathVariable Long id) {
    return ResponseEntity.ok(billService.markAsUnpaid(id));
}



}
