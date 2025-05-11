package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.dto.ContractDto;
import com.htqlptro.qlphongtro.model.Contract;
import com.htqlptro.qlphongtro.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractService contractService;

    @GetMapping
    public ResponseEntity<List<ContractDto>> getAllContracts() {
        return ResponseEntity.ok(contractService.getAllContracts());
    }

    @PostMapping
public ResponseEntity<Contract> createContract(@RequestBody ContractDto dto) {
    System.out.println("DTO nhận được: " + dto); // In log DTO
    return ResponseEntity.ok(contractService.saveFromDto(dto));
}


    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        return contractService.getContractById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable Long id, @RequestBody ContractDto dto) {
        return ResponseEntity.ok(contractService.updateContract(id, dto));
    }

}
