package com.htqlptro.qlphongtro.repository;

import com.htqlptro.qlphongtro.model.IssueReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueReportRepository extends JpaRepository<IssueReport, Long> {
    List<IssueReport> findByRoomId(Long roomId);
    List<IssueReport> findByTenantId(Long tenantId);
}
