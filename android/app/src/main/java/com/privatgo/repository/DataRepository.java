package com.privatgo.repository;

import android.content.Context;
import com.privatgo.database.PrivatGoDatabaseHelper;
import com.privatgo.models.*;
import java.util.List;

public class DataRepository {
    private static DataRepository instance;
    private PrivatGoDatabaseHelper dbHelper;

    private DataRepository(Context context) {
        dbHelper = PrivatGoDatabaseHelper.getInstance(context);
    }

    public static synchronized DataRepository getInstance(Context context) {
        if (instance == null) {
            instance = new DataRepository(context);
        }
        return instance;
    }

    public List<Course> getCourses() { return dbHelper.getAllCourses(); }
    public List<Schedule> getSchedules() { return dbHelper.getAllSchedules(); }
    public void addSchedule(Schedule s) { dbHelper.insertSchedule(s); }
    public List<Quiz> getQuizzes() { return dbHelper.getAllQuizzes(); }
    public void saveQuizScore(String quizId, int score) { dbHelper.updateQuizScore(quizId, score); }
    public List<Assignment> getAssignments() { return dbHelper.getAllAssignments(); }
    public void gradeAssignment(String assignmentId, int score, String feedback) { dbHelper.updateAssignmentGrade(assignmentId, score, feedback); }
    public void submitAssignment(String assignmentId, String submissionText) { dbHelper.submitAssignment(assignmentId, submissionText); }
    public List<Material> getMaterials() { return dbHelper.getAllMaterials(); }
    public List<Student> getStudents() { return dbHelper.getAllStudents(); }
    public List<Tutor> getTutors() { return dbHelper.getAllTutors(); }
    public List<Invoice> getInvoices() { return dbHelper.getAllInvoices(); }
    public void payInvoice(String invoiceId) { dbHelper.markInvoicePaid(invoiceId); }
    public List<Payroll> getPayroll() { return dbHelper.getAllPayroll(); }
}
