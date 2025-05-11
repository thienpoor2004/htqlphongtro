package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.BillDto;
import com.htqlptro.qlphongtro.model.Bill;
import com.htqlptro.qlphongtro.model.Contract;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.BillRepository;
import com.htqlptro.qlphongtro.repository.ContractRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import com.htqlptro.qlphongtro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final ContractRepository contractRepository;
    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;

    // ✅ Lấy theo tenantId
    public List<BillDto> getBillsByTenantId(Long tenantId) {
        List<Contract> contracts = contractRepository.findByTenantId(tenantId);
        List<Bill> bills = contracts.stream()
                .flatMap(contract -> billRepository.findByContract(contract).stream())
                .collect(Collectors.toList());

        return bills.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    // ✅ Lấy theo username (dành cho người dùng hiện tại)
    public List<BillDto> getBillsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        Tenant tenant = tenantRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tenant"));

        List<Contract> contracts = contractRepository.findByTenant(tenant);
        List<Bill> bills = contracts.stream()
                .flatMap(contract -> billRepository.findByContract(contract).stream())
                .collect(Collectors.toList());

        return bills.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private BillDto mapToDto(Bill bill) {
        return BillDto.builder()
                .id(bill.getId())
                .contractId(bill.getContract().getId())
                .electricityBill(bill.getElectricityBill())
                .waterBill(bill.getWaterBill())
                .totalAmount(bill.getTotalAmount())
                .dueDate(bill.getDueDate())
                .isPaid(bill.getIsPaid())
                .build();
    }
    public BillDto markAsPaid(Long id) {
        Bill bill = billRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));
    
        bill.setIsPaid(true);
        billRepository.save(bill);
    
        return mapToDto(bill);
    }
    public BillDto markAsUnpaid(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));
        bill.setIsPaid(false); // đánh dấu chưa thanh toán
        billRepository.save(bill);
        return mapToDto(bill);
    }
    
    
}
