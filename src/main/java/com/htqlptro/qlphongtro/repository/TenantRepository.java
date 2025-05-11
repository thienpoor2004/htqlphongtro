package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Tenant;
import com.htqlptro.qlphongtro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {

    // 🔎 Tìm tất cả tenant thuộc 1 phòng
    List<Tenant> findByRoomId(Long roomId);

    // 🔎 Tìm tất cả tenant theo trạng thái (ACTIVE, INACTIVE, ...)
    List<Tenant> findByStatus(String status);

    // 🔎 Tìm tenant theo email (unique)
    Optional<Tenant> findByEmail(String email);

    // ❌ Tránh dùng: có thể gây lỗi so sánh object Hibernate
    // Optional<Tenant> findByUser(User user);

    // ✅ Dùng đúng: tìm theo ID của user
    Optional<Tenant> findByUser_Id(Long userId);
}
