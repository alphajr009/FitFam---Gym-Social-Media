package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "feed")
public class Feed {

    @Id
    private String id;
    private String title;
    private String userID;
    private String description;

    private boolean isVideo;
   // private int likes;
    private List<String> likedUsers;
    private List<Comment> comments;
    private LocalDateTime timestamp;

    private Integer likes = 0;

    public Feed() {
    }

    public Feed(String id, String title, String userID, String description, int likes, List<String> likedUsers, List<Comment> comments, LocalDateTime timestamp) {
        this.id = id;
        this.title = title;
        this.userID = userID;
        this.description = description;
        this.likes = likes;
        this.likedUsers = likedUsers;
        this.comments = comments;
        this.timestamp = timestamp;
        this.isVideo = isVideo;
    }

    public Feed (String description,String userID){
        this.userID = userID;
        this.description = description;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isVideo() {
        return isVideo;
    }

    public void setVideo(boolean video) {
        isVideo = video;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<String> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(List<String> likedUsers) {
        this.likedUsers = likedUsers;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Feed{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", userID='" + userID + '\'' +
                ", description='" + description + '\'' +
                ", likes=" + likes +
                ", isVideo=" + isVideo +
                ", likedUsers=" + likedUsers +
                ", comments=" + comments +
                ", timestamp=" + timestamp +
                '}';
    }

    public static class Comment {
        private String name;
        private String content;

        public Comment() {
        }

        public Comment(String name, String content) {
            this.name = name;
            this.content = content;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        @Override
        public String toString() {
            return "Comment{" +
                    "name='" + name + '\'' +
                    ", content='" + content + '\'' +
                    '}';
        }
    }
}
