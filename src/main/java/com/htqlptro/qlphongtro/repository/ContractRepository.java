package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Contract;
import com.htqlptro.qlphongtro.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByTenantId(Long tenantId); // 🟢 Tìm hợp đồng theo tenantId
    List<Contract> findByTenant(Tenant tenant);

}


