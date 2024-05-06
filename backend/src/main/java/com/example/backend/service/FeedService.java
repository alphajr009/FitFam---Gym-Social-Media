package com.example.backend.service;

import com.example.backend.model.Feed;
import com.example.backend.repository.FeedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedService {

    private final FeedRepo feedRepo;

    @Autowired
    public FeedService(FeedRepo feedRepo) {this.feedRepo = feedRepo;}

    public Feed createFeed(Feed feed){return feedRepo.save(feed);}

    public Iterable<Feed> getAllFeeds(){ return feedRepo.findAll();}

    public void deleteFeed(String id) {
        feedRepo.deleteById(id);
    }

    public Feed getFeedById(String id) {
        return feedRepo.findById(id).orElse(null);
    }

    public Feed updateFeed(Feed feed) {
        if (feed.getId() == null || !feedRepo.existsById(feed.getId())){
            return null;
        }
        return feedRepo.save(feed);
    }
}
