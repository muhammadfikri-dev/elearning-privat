package com.privatgo.models;

public class Tutor {
    private String id;
    private String name;
    private String university;
    private String specialization;
    private double rating;
    private long hourlyRate;
    private int totalSessions;

    public Tutor(String id, String name, String university, String specialization, double rating, long hourlyRate, int totalSessions) {
        this.id = id;
        this.name = name;
        this.university = university;
        this.specialization = specialization;
        this.rating = rating;
        this.hourlyRate = hourlyRate;
        this.totalSessions = totalSessions;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getUniversity() { return university; }
    public String getSpecialization() { return specialization; }
    public double getRating() { return rating; }
    public long getHourlyRate() { return hourlyRate; }
    public int getTotalSessions() { return totalSessions; }
}
