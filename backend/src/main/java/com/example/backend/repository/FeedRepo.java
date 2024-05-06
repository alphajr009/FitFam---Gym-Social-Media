package com.example.backend.repository;

import com.example.backend.model.Feed;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedRepo extends MongoRepository<Feed, String> {
}
