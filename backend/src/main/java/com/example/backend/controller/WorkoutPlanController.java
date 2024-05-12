package com.example.backend.controller;

import com.example.backend.model.WorkoutPlan;
import com.example.backend.service.WorkoutPlanService;
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
@RequestMapping("/api/v1/workoutplans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/create")
    public WorkoutPlan createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return workoutPlanService.createWorkoutPlan(workoutPlan);
    }

    @GetMapping("/getAll")
    public Iterable<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanService.getAllWorkoutPlans();
    }

    @GetMapping("/{id}")
    public WorkoutPlan getWorkoutPlanById(@PathVariable String id) {
        return workoutPlanService.getWorkoutPlanById(id);
    }

    @PutMapping("/edit/{id}")
    public WorkoutPlan updateWorkoutPlan(@RequestBody WorkoutPlan workoutPlan, @PathVariable (name="id") String id) {
        workoutPlan.setId(id);
        return workoutPlanService.updateWorkoutPlan(workoutPlan);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteWorkoutPlan(@PathVariable (name="id") String id) {
        workoutPlanService.deleteWorkoutPlan(id);
    }

    @PostMapping("addWorkout")
    public ResponseEntity<String> addWorkout(
            @RequestParam("userid") String userId,
            @RequestParam("description") String description,
            @RequestParam("images") List<MultipartFile> images){

        try {
            WorkoutPlan newWorkout = new WorkoutPlan();
            newWorkout.setUserID(userId);
            newWorkout.setDescription(description);

            WorkoutPlan savedWorkout = workoutPlanService.createWorkoutPlan(newWorkout);

            // Save images
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String fileName = savedWorkout.getId() + "-" + i + ".jpg";
                Path path = Paths.get("workout/" + fileName);
                Files.write(path, image.getBytes());
            }

            return ResponseEntity.status(HttpStatus.OK).body("WorkoutPlan Created Successfully");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create WorkoutPlan");
        }
    }

    @PostMapping("/{id}/addComment")
    public WorkoutPlan addComment(@PathVariable String id, @RequestBody WorkoutPlan.Comment comment) {
        return workoutPlanService.addComment(id, comment);
    }

    @GetMapping("/{id}/getComments")
    public List<WorkoutPlan.Comment> getComments(@PathVariable String id) {
        return workoutPlanService.getComments(id);
    }
}
