package com.htqlptro.qlphongtro.service;

import com.htqlptro.qlphongtro.dto.ServiceDto;
import com.htqlptro.qlphongtro.model.ServiceEntity;
import com.htqlptro.qlphongtro.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceDto addService(ServiceDto serviceDto) {
        if (serviceRepository.existsByName(serviceDto.getName())) {
            throw new RuntimeException("Service already exists");
        }

        ServiceEntity service = ServiceEntity.builder()
                .name(serviceDto.getName())
                .price(serviceDto.getPrice())
                .unit(serviceDto.getUnit())
                .build();
        ServiceEntity savedService = serviceRepository.save(service);
        return mapToDto(savedService);
    }

    public List<ServiceDto> getAllServices() {
        return serviceRepository.findAll()
                .stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ServiceDto updateService(Long id, ServiceDto serviceDto) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        service.setName(serviceDto.getName());
        service.setPrice(serviceDto.getPrice());
        service.setUnit(serviceDto.getUnit());

        ServiceEntity updatedService = serviceRepository.save(service);
        return mapToDto(updatedService);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    private ServiceDto mapToDto(ServiceEntity service) {
        return ServiceDto.builder()
                .id(service.getId())
                .name(service.getName())
                .price(service.getPrice())
                .unit(service.getUnit())
                .build();
    }
}
