package com.example.backend.repository;

import com.example.backend.model.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StatusRepository extends MongoRepository<Status, String> {

    List<Status> findByExpiredAtBefore(Date currentDate);
}
