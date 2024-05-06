package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String gender;
    private String phoneNumber;
    private String password;
    private String city;
    private String address;
    private List<String> friends;
    private boolean isOnline = false;
    private boolean isSetup = false;
    private List<String> feed;
    private List<String> workOut;
    private String meal;
    private List<String> story;
    private boolean isAdmin = false;

    public User() {

    }

    public User(String name, String email, String gender, String phoneNumber, String password,
                String city, String address, List<String> friends, boolean isOnline, boolean isSetup,
                List<String> feed, List<String> workOut, String meal, List<String> story) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.city = city;
        this.address = address;
        this.friends = friends;
        this.isOnline = isOnline;
        this.isSetup = isSetup;
        this.feed = feed;
        this.workOut = workOut;
        this.meal = meal;
        this.story = story;
    }

    // Getters and setters
    // Omitted for brevity

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public boolean isSetup() {
        return isSetup;
    }

    public void setSetup(boolean setup) {
        isSetup = setup;
    }

    public List<String> getFeed() {
        return feed;
    }

    public void setFeed(List<String> feed) {
        this.feed = feed;
    }

    public List<String> getWorkOut() {
        return workOut;
    }

    public void setWorkOut(List<String> workOut) {
        this.workOut = workOut;
    }

    public String getMeal() {
        return meal;
    }

    public void setMeal(String meal) {
        this.meal = meal;
    }

    public List<String> getStory() {
        return story;
    }

    public void setStory(List<String> story) {
        this.story = story;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", gender='" + gender + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", friends=" + friends +
                ", isOnline=" + isOnline +
                ", isSetup=" + isSetup +
                ", feed=" + feed +
                ", workOut=" + workOut +
                ", meal='" + meal + '\'' +
                ", story=" + story +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
