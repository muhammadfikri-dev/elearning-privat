package com.privatgo.models;

public class Student {
    private String id;
    private String name;
    private String grade;
    private String school;
    private String packageName;
    private String targetUniv;
    private String tutorName;
    private String parentPhone;
    private int completedSessions;

    public Student(String id, String name, String grade, String school, String packageName, String targetUniv, String tutorName, String parentPhone, int completedSessions) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.school = school;
        this.packageName = packageName;
        this.targetUniv = targetUniv;
        this.tutorName = tutorName;
        this.parentPhone = parentPhone;
        this.completedSessions = completedSessions;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getGrade() { return grade; }
    public String getSchool() { return school; }
    public String getPackageName() { return packageName; }
    public String getTargetUniv() { return targetUniv; }
    public String getTutorName() { return tutorName; }
    public String getParentPhone() { return parentPhone; }
    public int getCompletedSessions() { return completedSessions; }
}
