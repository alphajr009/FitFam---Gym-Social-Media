package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "status")
public class Status {

    @Id
    private String id;
    private String runDistance;
    private String numberPushups;
    private String weightLifted;
    private String uname;
    private String caloriesBurned;
    private String workoutType;
    private String description;

    private String workoutTime;
    private String userId;
    private Date expiredAt;

    public Status() {
        this.expiredAt = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000);
    }

    public Status(String runDistance, String numberPushups, String weightLifted,
                  String caloriesBurned, String workoutType, String description, String userId ,String uname , String workoutTime ) {
        this.runDistance = runDistance;
        this.numberPushups = numberPushups;
        this.weightLifted = weightLifted;
        this.caloriesBurned = caloriesBurned;
        this.workoutType = workoutType;
        this.description = description;
        this.uname = uname;
        this.userId = userId;
        this.expiredAt = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000); // Set expiration to 24 hours
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRunDistance() {
        return runDistance;
    }

    public void setRunDistance(String runDistance) {
        this.runDistance = runDistance;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getNumberPushups() {
        return numberPushups;
    }

    public void setNumberPushups(String numberPushups) {
        this.numberPushups = numberPushups;
    }

    public String getWeightLifted() {
        return weightLifted;
    }

    public void setWeightLifted(String weightLifted) {
        this.weightLifted = weightLifted;
    }


    public String getWorkoutTime() {
        return workoutTime;
    }

    public void setWorkoutTime(String workoutTime) {
        this.workoutTime = workoutTime;
    }

    public String getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(String caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public String getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(String workoutType) {
        this.workoutType = workoutType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(Date expiredAt) {
        this.expiredAt = expiredAt;
    }

    public void setImageUrl(String filePath) {
    }
}
