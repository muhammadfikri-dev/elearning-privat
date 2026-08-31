package com.privatgo.models;

public class Invoice {
    private String id;
    private String studentName;
    private String packageName;
    private long amount;
    private String dueDate;
    private String status; // 'Lunas', 'Menunggu Verifikasi', 'Belum Bayar'
    private String paymentMethod;

    public Invoice(String id, String studentName, String packageName, long amount, String dueDate, String status, String paymentMethod) {
        this.id = id;
        this.studentName = studentName;
        this.packageName = packageName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.paymentMethod = paymentMethod;
    }

    public String getId() { return id; }
    public String getStudentName() { return studentName; }
    public String getPackageName() { return packageName; }
    public long getAmount() { return amount; }
    public String getDueDate() { return dueDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPaymentMethod() { return paymentMethod; }
}
