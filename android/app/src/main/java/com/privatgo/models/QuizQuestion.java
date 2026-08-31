package com.privatgo.models;

public class QuizQuestion {
    private String id;
    private String quizId;
    private String questionText;
    private String optA;
    private String optB;
    private String optC;
    private String optD;
    private String correctOpt;
    private String explanation;

    public QuizQuestion(String id, String quizId, String questionText, String optA, String optB, String optC, String optD, String correctOpt, String explanation) {
        this.id = id;
        this.quizId = quizId;
        this.questionText = questionText;
        this.optA = optA;
        this.optB = optB;
        this.optC = optC;
        this.optD = optD;
        this.correctOpt = correctOpt;
        this.explanation = explanation;
    }

    public String getId() { return id; }
    public String getQuizId() { return quizId; }
    public String getQuestionText() { return questionText; }
    public String getOptA() { return optA; }
    public String getOptB() { return optB; }
    public String getOptC() { return optC; }
    public String getOptD() { return optD; }
    public String getCorrectOpt() { return correctOpt; }
    public String getExplanation() { return explanation; }
}
