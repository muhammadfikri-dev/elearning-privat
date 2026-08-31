package com.privatgo.models;

import java.util.ArrayList;
import java.util.List;

public class Quiz {
    private String id;
    private String title;
    private String subject;
    private int durationMinutes;
    private int passScore;
    private int myScore;
    private boolean isCompleted;
    private List<QuizQuestion> questions;

    public Quiz(String id, String title, String subject, int durationMinutes, int passScore, int myScore, boolean isCompleted) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.durationMinutes = durationMinutes;
        this.passScore = passScore;
        this.myScore = myScore;
        this.isCompleted = isCompleted;
        this.questions = new ArrayList<>();
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public int getDurationMinutes() { return durationMinutes; }
    public int getPassScore() { return passScore; }
    public int getMyScore() { return myScore; }
    public void setMyScore(int score) { this.myScore = score; }
    public boolean isCompleted() { return isCompleted; }
    public void setCompleted(boolean completed) { this.isCompleted = completed; }
    public List<QuizQuestion> getQuestions() { return questions; }
    public void setQuestions(List<QuizQuestion> questions) { this.questions = questions; }
}
