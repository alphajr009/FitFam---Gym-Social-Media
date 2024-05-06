package com.example.backend.repository;



import com.example.backend.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MealPlanRepo extends MongoRepository<MealPlan, String> {
}
