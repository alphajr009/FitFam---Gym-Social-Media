package com.example.backend.controller;


import com.example.backend.model.Feed;
import com.example.backend.service.FeedService;
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
@RequestMapping("/api/v1/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostMapping("/create")
    public Feed createFeed(@RequestBody Feed feed) {
        return feedService.createFeed(feed);
    }

    @GetMapping("/getAll")
    public Iterable<Feed> getAllFeeds() {
        return feedService.getAllFeeds();
    }

    @GetMapping("/{id}")
    public Feed getFeedById(@PathVariable String id) {
        return feedService.getFeedById(id);
    }

    @PutMapping("/edit/{id}")
    public Feed updateFeed(@RequestBody Feed feed, @PathVariable (name="id") String id) {
        feed.setId(id);
        return feedService.updateFeed(feed);

    }
    @DeleteMapping("/delete/{id}")
    public void deleteFeed(@PathVariable (name="id") String id) {
        feedService.deleteFeed(id);
    }

    @PostMapping("/addFeed")
    public ResponseEntity<String> addFeed(
            @RequestParam("userid") String userId,
            @RequestParam("description") String description,
            @RequestParam("images") List<MultipartFile> images){

        try {
            Feed newFeed = new Feed();
            newFeed.setUserID(userId);
            newFeed.setDescription(description);

            Feed savedFeed = feedService.createFeed(newFeed);

            // Save images
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String fileName = savedFeed.getId() + "-" + i + ".jpg";
                Path path = Paths.get("media/" + fileName);
                Files.write(path, image.getBytes());
            }

            return ResponseEntity.status(HttpStatus.OK).body("Feed Created Successfully");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create feed");
        }
    }


}
