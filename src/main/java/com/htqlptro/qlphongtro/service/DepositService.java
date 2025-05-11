package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.DepositDto;
import com.htqlptro.qlphongtro.model.Deposit;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.repository.DepositRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.htqlptro.qlphongtro.model.DepositStatus;
import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.repository.RoomRepository; // ✅ Import RoomRepository



import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepositService {

    private final DepositRepository depositRepository;
    private final TenantRepository tenantRepository;
    private final RoomRepository roomRepository;
    

    public List<DepositDto> getDepositsByTenant(Long tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        return depositRepository.findByTenant(tenant)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public DepositDto createDeposit(DepositDto depositDto) {
    Tenant tenant = tenantRepository.findById(depositDto.getTenantId())
            .orElseThrow(() -> new RuntimeException("Tenant not found"));
    Room room = roomRepository.findById(depositDto.getRoomId()) // ✅ Thêm kiểm tra Room
            .orElseThrow(() -> new RuntimeException("Room not found"));

    Deposit deposit = Deposit.builder()
            .tenant(tenant)
            .room(room) // ✅ Sử dụng room thay vì roomId
            .amount(depositDto.getAmount())
            .depositDate(depositDto.getDepositDate())
            .status(DepositStatus.PENDING)
            .build();

    depositRepository.save(deposit);
    return mapToDto(deposit);
}
    
    public DepositDto confirmDeposit(Long depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Deposit not found"));
        
        deposit.setStatus(DepositStatus.CONFIRMED); // ✅ Sửa lỗi ở đây
        depositRepository.save(deposit);
    
        return mapToDto(deposit);
    }
    

    public DepositDto cancelDeposit(Long depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Deposit not found"));
    
        deposit.setStatus(DepositStatus.CANCELLED); // ✅ Sửa lỗi ở đây
        depositRepository.save(deposit);
    
        return mapToDto(deposit);
    }
    

    private DepositDto mapToDto(Deposit deposit) {
        return DepositDto.builder()
                .id(deposit.getId())
                .tenantId(deposit.getTenant().getId())
                .roomId(deposit.getRoom().getId()) // ✅ Sử dụng getRoom().getId()
                .amount(deposit.getAmount())
                .depositDate(deposit.getDepositDate())
                .status(deposit.getStatus().name())
                .build();
    }
    public List<DepositDto> getAllDeposits() {
        return depositRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
}
