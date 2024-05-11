package com.example.backend.service;

import com.example.backend.model.Feed;
import com.example.backend.repository.FeedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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


    public boolean likeFeed(String feedId, String userId) {
        Optional<Feed> optionalFeed = feedRepo.findById(feedId);
        if (optionalFeed.isPresent()) {
            Feed feed = optionalFeed.get();
            if (!feed.getLikedUsers().contains(userId)) {
                feed.getLikedUsers().add(userId);
                feed.setLikes(feed.getLikes() + 1);
                feedRepo.save(feed);
                return true; // Operation successful
            } else {
                return false; // User already liked this feed
            }
        } else {
            return false; // Feed not found
        }
    }

    public boolean unlikeFeed(String feedId, String userId) {
        Optional<Feed> optionalFeed = feedRepo.findById(feedId);
        if (optionalFeed.isPresent()) {
            Feed feed = optionalFeed.get();
            if (feed.getLikedUsers().contains(userId)) {
                feed.getLikedUsers().remove(userId);
                feed.setLikes(feed.getLikes() - 1);
                feedRepo.save(feed);
                return true; // Operation successful
            } else {
                return false; // User has not liked this feed
            }
        } else {
            return false; // Feed not found
        }
    }


}
