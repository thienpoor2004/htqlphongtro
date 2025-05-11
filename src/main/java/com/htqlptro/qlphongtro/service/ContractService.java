package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.ContractDto;
import com.htqlptro.qlphongtro.model.Contract;
import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.ContractRepository;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import com.htqlptro.qlphongtro.repository.TenantRepository;
import com.htqlptro.qlphongtro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContractService {
    private final ContractRepository contractRepository;
    private final TenantRepository tenantRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public List<ContractDto> getAllContracts() {
        return contractRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    public Contract saveContract(Contract contract) {
        return contractRepository.save(contract);
    }

    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }

    private ContractDto mapToDto(Contract contract) {
        return ContractDto.builder()
                .id(contract.getId())
                .tenantId(contract.getTenant().getId())
                .tenantName(contract.getTenant().getFullName())
                .roomId(contract.getRoom().getId())
                .roomNumber(contract.getRoom().getRoomNumber())
                .userId(contract.getUser().getId())
                .startDate(contract.getStartDate())
                .endDate(contract.getEndDate())
                .deposit(contract.getDeposit())
                .build();
    }

    public Contract saveFromDto(ContractDto dto) {
        Tenant tenant = tenantRepository.findById(dto.getTenantId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tenant"));
    
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
    
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
    
        Contract contract = Contract.builder()
                .tenant(tenant)
                .room(room)
                .user(user)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .deposit(dto.getDeposit())
                .build();
    
        return contractRepository.save(contract);
    }
    public Contract updateContract(Long id, ContractDto dto) {
        Contract existingContract = contractRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
    
        Tenant tenant = tenantRepository.findById(dto.getTenantId())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy tenant"));
    
        Room room = roomRepository.findById(dto.getRoomId())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
    
        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
    
        existingContract.setTenant(tenant);
        existingContract.setRoom(room);
        existingContract.setUser(user);
        existingContract.setStartDate(dto.getStartDate());
        existingContract.setEndDate(dto.getEndDate());
        existingContract.setDeposit(dto.getDeposit());
    
        return contractRepository.save(existingContract);
    }
    
    
}
