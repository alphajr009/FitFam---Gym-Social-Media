package com.example.backend.service;

import com.example.backend.model.Status;
import com.example.backend.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Status addStatus(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Status getStatusById(String id) {
        return statusRepository.findById(id).orElse(null);
    }

    @Override
    public void updateStatus(Status status) {
        statusRepository.save(status);
    }

    @Override
    public List<Status> getAllStatus() {
        Date currentDate = new Date();

        List<Status> allStatuses = statusRepository.findAll();

        // Filter out the expired statuses
        List<Status> nonExpiredStatuses = allStatuses.stream()
                .filter(status -> status.getExpiredAt().after(currentDate))
                .collect(Collectors.toList());

        return nonExpiredStatuses;
    }
}
