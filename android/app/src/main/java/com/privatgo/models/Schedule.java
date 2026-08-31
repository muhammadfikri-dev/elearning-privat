package com.privatgo.models;

public class Schedule {
    private String id;
    private String title;
    private String subject;
    private String tutorName;
    private String studentName;
    private String date;
    private String time;
    private String platform;
    private String meetUrl;
    private String note;
    private String status;

    public Schedule(String id, String title, String subject, String tutorName, String studentName, String date, String time, String platform, String meetUrl, String note, String status) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.tutorName = tutorName;
        this.studentName = studentName;
        this.date = date;
        this.time = time;
        this.platform = platform;
        this.meetUrl = meetUrl;
        this.note = note;
        this.status = status;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getTutorName() { return tutorName; }
    public String getStudentName() { return studentName; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getPlatform() { return platform; }
    public String getMeetUrl() { return meetUrl; }
    public String getNote() { return note; }
    public String getStatus() { return status; }
}
