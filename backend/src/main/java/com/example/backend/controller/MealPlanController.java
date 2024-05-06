package com.example.backend.controller;

import com.example.backend.model.MealPlan;
import com.example.backend.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/mealplans")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @PostMapping("/create")
    public MealPlan createMealPlan(@RequestBody MealPlan mealPlan) {
        return mealPlanService.createMealPlan(mealPlan);
    }

    @GetMapping("/getAll")
    public Iterable<MealPlan> getAllMealPlans() {
        return mealPlanService.getAllMealPlans();
    }

    @GetMapping("/{id}")
    public MealPlan getMealPlanById(@PathVariable String id) {
        return mealPlanService.getMealPlanById(id);
    }

    @PutMapping("/edit/{id}")
    public MealPlan updateMealPlan(@RequestBody MealPlan mealPlan, @PathVariable (name="id") String id) {
        mealPlan.setId(id);
        return mealPlanService.updateMealPlan(mealPlan);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteMealPlan(@PathVariable (name="id") String id) {
        mealPlanService.deleteMealPlan(id);
    }

    @PostMapping("addMeal")
    public ResponseEntity<String> addMeal(
            @RequestParam("userid") String userId,
            @RequestParam("description") String description,
            @RequestParam("images") List<MultipartFile> images){

        try {
            MealPlan newMeal = new MealPlan();
            newMeal.setUserID(userId);
            newMeal.setDescription(description);

            MealPlan savedMeal = mealPlanService.createMealPlan(newMeal);

            // Save images
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String fileName = savedMeal.getId() + "-" + i + ".jpg";
                Path path = Paths.get("meal/" + fileName);
                Files.write(path, image.getBytes());
            }

            return ResponseEntity.status(HttpStatus.OK).body("MealPlan Created Successfully");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create MealPlan");
        }
    }

    @PostMapping("/{id}/addComment")
    public MealPlan addComment(@PathVariable String id, @RequestBody MealPlan.Comment comment) {
        return mealPlanService.addComment(id, comment);
    }

    @GetMapping("/{id}/getComments")
    public List<MealPlan.Comment> getComments(@PathVariable String id) {
        return mealPlanService.getComments(id);
    }
}
