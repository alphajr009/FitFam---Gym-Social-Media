package com.example.backend.repository;

import com.example.backend.model.WorkoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutPlanRepo extends MongoRepository<WorkoutPlan, String> {
}
