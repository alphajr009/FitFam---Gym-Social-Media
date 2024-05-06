package com.example.backend.controller;

import com.example.backend.model.Status;
import com.example.backend.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/story")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @PostMapping("/createStory")
    public ResponseEntity<String> createStory(@RequestParam("image") MultipartFile image,
                                              @RequestParam("userid") String userId,
                                              @RequestParam("description") String description,
                                              @RequestParam("runDistance") String runDistance,
                                              @RequestParam("numberOfPushups") String numberOfPushups,
                                              @RequestParam("weightLifted") String weightLifted,
                                              @RequestParam("caloriesBurned") String caloriesBurned,
                                              @RequestParam("workoutType") String workoutType,
                                              @RequestParam("workoutTime") String workoutTime) {
        try {
            String uploadsDir = "status/";

            String fileName = image.getOriginalFilename();

            Status status = new Status(runDistance, numberOfPushups, weightLifted, caloriesBurned,
                    workoutType, description, userId);

            Status createdStory = statusService.addStatus(status);

            String storyId = createdStory.getId();
            String filePath = uploadsDir + storyId + ".jpg"; // Change the file path

            Path path = Paths.get(filePath);
            Files.write(path, image.getBytes());

            status.setImageUrl(filePath);
            statusService.updateStatus(status);

            return ResponseEntity.ok("Story created successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error creating story: " + e.getMessage());
        }
    }

    @GetMapping("/getAllStatus")
    public ResponseEntity<List<Status>> getAllStatus() {
        List<Status> allStatus = statusService.getAllStatus();
        return ResponseEntity.ok(allStatus);
    }


}
