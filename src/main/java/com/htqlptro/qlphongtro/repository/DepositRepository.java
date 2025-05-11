package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Deposit;
import com.htqlptro.qlphongtro.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findByTenant(Tenant tenant);
}
