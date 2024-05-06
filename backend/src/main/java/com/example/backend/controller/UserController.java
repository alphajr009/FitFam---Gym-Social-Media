package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User with this email already exists.");
        }
        User registeredUser = userService.registerUser(user);
        if (registeredUser != null) {
            return ResponseEntity.ok("User Registered Successfully");
        } else {
            return ResponseEntity.badRequest().body("User Registration Failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(400).body("Password incorrect");
        }

        // Construct the response object similar to JavaScript code
        Map<String, Object> temp = new HashMap<>();
        temp.put("name", existingUser.getName());
        temp.put("email", existingUser.getEmail());
        temp.put("gender", existingUser.getGender());
        temp.put("_id", existingUser.getId());
        temp.put("isAdmin", existingUser.isAdmin());

        return ResponseEntity.ok(temp);
    }

    @PostMapping("/getuserbyid")
    public ResponseEntity<?> getUserById(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userid");

        try {
            User user = userService.findById(userId);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }


    @PatchMapping("/updateuser")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("_id");
        String name = requestBody.get("name");
        String city = requestBody.get("city");
        String gender = requestBody.get("gender");
        String phone = requestBody.get("phone");
        String address = requestBody.get("address");

        try {
            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            user.setName(name);
            user.setCity(city);
            user.setGender(gender);
            user.setPhoneNumber(phone);
            user.setAddress(address);

            userService.updateUser(user);
            return ResponseEntity.ok("User details updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }




}
