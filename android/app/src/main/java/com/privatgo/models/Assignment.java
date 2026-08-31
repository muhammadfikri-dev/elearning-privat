package com.privatgo.models;

public class Assignment {
    private String id;
    private String title;
    private String subject;
    private String studentName;
    private String deadline;
    private String status; // 'pending', 'submitted', 'graded'
    private int score;
    private String feedback;
    private String studentSubmission;

    public Assignment(String id, String title, String subject, String studentName, String deadline, String status, int score, String feedback, String studentSubmission) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.studentName = studentName;
        this.deadline = deadline;
        this.status = status;
        this.score = score;
        this.feedback = feedback;
        this.studentSubmission = studentSubmission;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getStudentName() { return studentName; }
    public String getDeadline() { return deadline; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public String getStudentSubmission() { return studentSubmission; }
    public void setStudentSubmission(String studentSubmission) { this.studentSubmission = studentSubmission; }
}
