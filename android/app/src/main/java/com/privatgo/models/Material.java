package com.privatgo.models;

public class Material {
    private String id;
    private String title;
    private String subject;
    private String type; // 'pdf', 'video'
    private String fileSize;
    private String duration;
    private String summary;
    private String contentUrl;

    public Material(String id, String title, String subject, String type, String fileSize, String duration, String summary, String contentUrl) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.type = type;
        this.fileSize = fileSize;
        this.duration = duration;
        this.summary = summary;
        this.contentUrl = contentUrl;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getType() { return type; }
    public String getFileSize() { return fileSize; }
    public String getDuration() { return duration; }
    public String getSummary() { return summary; }
    public String getContentUrl() { return contentUrl; }
}
