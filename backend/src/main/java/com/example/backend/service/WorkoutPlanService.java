package com.example.backend.service;

import com.example.backend.model.WorkoutPlan;
import com.example.backend.repository.WorkoutPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class WorkoutPlanService {
    private final WorkoutPlanRepo workoutPlanRepo;

    @Autowired
    public WorkoutPlanService(WorkoutPlanRepo workoutPlanRepo) {
        this.workoutPlanRepo = workoutPlanRepo;
    }

    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        return workoutPlanRepo.save(workoutPlan);
    }

    public Iterable<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepo.findAll();
    }

    public void deleteWorkoutPlan(String id) {
        workoutPlanRepo.deleteById(id); // Assuming workoutPlanRepo.deleteById accepts Long directly
    }

    public WorkoutPlan getWorkoutPlanById(String id) {
        return workoutPlanRepo.findById(id).orElse(null); // Assuming workoutPlanRepo.findById accepts Long directly
    }

    public WorkoutPlan updateWorkoutPlan(WorkoutPlan workoutPlan) {
        if (workoutPlan.getId() == null || !workoutPlanRepo.existsById(workoutPlan.getId())) {
            // Handle invalid or non-existent workoutPlan ID
            return null;
        }
        return workoutPlanRepo.save(workoutPlan);
    }

    public List<WorkoutPlan.Comment> getComments(String id) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id).orElse(null);
        if (workoutPlan != null) {
            return workoutPlan.getComments();
        }
        return null;
    }

    public WorkoutPlan addComment(String id, WorkoutPlan.Comment comment) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id).orElse(null);
        if (workoutPlan != null) {
            List<WorkoutPlan.Comment> comments = workoutPlan.getComments();
            comments.add(comment);
            workoutPlan.setComments(comments);
            return workoutPlanRepo.save(workoutPlan);
        }
        return null;
    }
}
