package com.example.backend.service;

import com.example.backend.model.Status;

import java.util.List;

public interface StatusService {
    Status addStatus(Status status);

    Status getStatusById(String id);

    void updateStatus(Status status);


    List<Status> getAllStatus();

    void deleteExpiredStatuses();

}


