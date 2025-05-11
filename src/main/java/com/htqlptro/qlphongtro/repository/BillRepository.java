package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Bill;
import com.htqlptro.qlphongtro.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByContract(Contract contract);
}
