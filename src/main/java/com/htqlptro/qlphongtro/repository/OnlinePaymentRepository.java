package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.OnlinePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnlinePaymentRepository extends JpaRepository<OnlinePayment, Long> {
    
    // 📌 Lấy tất cả thanh toán của 1 tenant
    List<OnlinePayment> findByTenant_Id(Long tenantId);

    // 📌 (Tuỳ chọn) Có thể thêm nếu bạn muốn tìm theo transactionId sau này nhanh hơn
    OnlinePayment findByTransactionId(String transactionId);
}
