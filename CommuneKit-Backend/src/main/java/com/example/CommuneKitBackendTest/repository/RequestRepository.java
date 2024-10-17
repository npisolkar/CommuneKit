package com.example.CommuneKitBackendTest.repository;

import com.example.CommuneKitBackendTest.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
