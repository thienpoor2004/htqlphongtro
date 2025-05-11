package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByTenantId(Long tenantId);
}
