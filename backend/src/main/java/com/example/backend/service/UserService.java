package com.example.backend.service;

import com.example.backend.model.User;

public interface UserService {
    User registerUser(User user);

    User findByEmail(String email);

    User findById(String userId);

    void updateUser(User user);
}
