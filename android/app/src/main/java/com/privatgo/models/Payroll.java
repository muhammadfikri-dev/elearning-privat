package com.privatgo.models;

public class Payroll {
    private String id;
    private String tutorName;
    private int completedSessions;
    private long ratePerSession;
    private long totalPayout;
    private String status; // 'Sudah Ditransfer', 'Menunggu Persetujuan'
    private String bankAccount;

    public Payroll(String id, String tutorName, int completedSessions, long ratePerSession, long totalPayout, String status, String bankAccount) {
        this.id = id;
        this.tutorName = tutorName;
        this.completedSessions = completedSessions;
        this.ratePerSession = ratePerSession;
        this.totalPayout = totalPayout;
        this.status = status;
        this.bankAccount = bankAccount;
    }

    public String getId() { return id; }
    public String getTutorName() { return tutorName; }
    public int getCompletedSessions() { return completedSessions; }
    public long getRatePerSession() { return ratePerSession; }
    public long getTotalPayout() { return totalPayout; }
    public String getStatus() { return status; }
    public String getBankAccount() { return bankAccount; }
}
