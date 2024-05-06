package com.example.backend.service;

import com.example.backend.model.MealPlan;
import com.example.backend.repository.MealPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.List;

@Service
public class MealPlanService {

    private final MealPlanRepo mealPlanRepo;

    @Autowired
    public MealPlanService(MealPlanRepo mealPlanRepo) {
        this.mealPlanRepo = mealPlanRepo;
    }

    public MealPlan createMealPlan(MealPlan mealPlan) {
        return mealPlanRepo.save(mealPlan);
    }

    public Iterable<MealPlan> getAllMealPlans() {
        return mealPlanRepo.findAll();
    }

    public void deleteMealPlan(String id) {
        mealPlanRepo.deleteById(id); // Assuming mealPlanRepo.deleteById accepts Long directly
    }

    public MealPlan getMealPlanById(String id) {
        return mealPlanRepo.findById(id).orElse(null); // Assuming mealPlanRepo.findById accepts Long directly
    }

    public MealPlan updateMealPlan(MealPlan mealPlan) {
        if (mealPlan.getId() == null || !mealPlanRepo.existsById(mealPlan.getId())) {
            // Handle invalid or non-existent mealPlan ID
            return null;
        }
        return mealPlanRepo.save(mealPlan);
    }

    public List<MealPlan.Comment> getComments(String id) {
        MealPlan mealPlan = mealPlanRepo.findById(id).orElse(null);
        if (mealPlan != null) {
            return mealPlan.getComments();
        }
        return null;
    }

    public MealPlan addComment(String id, MealPlan.Comment comment) {
        MealPlan mealPlan = mealPlanRepo.findById(id).orElse(null);
        if (mealPlan != null) {
            List<MealPlan.Comment> comments = mealPlan.getComments();
            comments.add(comment);
            mealPlan.setComments(comments);
            return mealPlanRepo.save(mealPlan);
        }
        return null;
    }
}
