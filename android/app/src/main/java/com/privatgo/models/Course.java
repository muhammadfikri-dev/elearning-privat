package com.privatgo.models;

public class Course {
    private String id;
    private String title;
    private String category;
    private String tutorName;
    private int progress;
    private int completedModules;
    private int totalModules;

    public Course(String id, String title, String category, String tutorName, int progress, int completedModules, int totalModules) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.tutorName = tutorName;
        this.progress = progress;
        this.completedModules = completedModules;
        this.totalModules = totalModules;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getTutorName() { return tutorName; }
    public int getProgress() { return progress; }
    public int getCompletedModules() { return completedModules; }
    public int getTotalModules() { return totalModules; }
}
