package com.privatgo.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import com.privatgo.models.*;
import java.util.ArrayList;
import java.util.List;

public class PrivatGoDatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "privatgo_local.db";
    private static final int DATABASE_VERSION = 2;

    private static PrivatGoDatabaseHelper instance;

    public static synchronized PrivatGoDatabaseHelper getInstance(Context context) {
        if (instance == null) {
            instance = new PrivatGoDatabaseHelper(context.getApplicationContext());
        }
        return instance;
    }

    public PrivatGoDatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT, category TEXT, tutor_name TEXT, progress INTEGER, completed_modules INTEGER, total_modules INTEGER)");
        db.execSQL("CREATE TABLE IF NOT EXISTS schedules (id TEXT PRIMARY KEY, title TEXT, subject TEXT, tutor_name TEXT, student_name TEXT, date TEXT, time TEXT, platform TEXT, meet_url TEXT, note TEXT, status TEXT)");
        db.execSQL("CREATE TABLE IF NOT EXISTS quizzes (id TEXT PRIMARY KEY, title TEXT, subject TEXT, duration_minutes INTEGER, pass_score INTEGER, my_score INTEGER, is_completed INTEGER)");
        db.execSQL("CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, quiz_id TEXT, question_text TEXT, opt_a TEXT, opt_b TEXT, opt_c TEXT, opt_d TEXT, correct_opt TEXT, explanation TEXT)");
        db.execSQL("CREATE TABLE IF NOT EXISTS assignments (id TEXT PRIMARY KEY, title TEXT, subject TEXT, student_name TEXT, deadline TEXT, status TEXT, score INTEGER, feedback TEXT, student_submission TEXT)");
        db.execSQL("CREATE TABLE IF NOT EXISTS materials (id TEXT PRIMARY KEY, title TEXT, subject TEXT, type TEXT, file_size TEXT, duration TEXT, summary TEXT, content_url TEXT)");
        db.execSQL("CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY, name TEXT, grade TEXT, school TEXT, package_name TEXT, target_univ TEXT, tutor_name TEXT, parent_phone TEXT, completed_sessions INTEGER)");
        db.execSQL("CREATE TABLE IF NOT EXISTS tutors (id TEXT PRIMARY KEY, name TEXT, university TEXT, specialization TEXT, rating REAL, hourly_rate INTEGER, total_sessions INTEGER)");
        db.execSQL("CREATE TABLE IF NOT EXISTS invoices (id TEXT PRIMARY KEY, student_name TEXT, package_name TEXT, amount INTEGER, due_date TEXT, status TEXT, payment_method TEXT)");
        db.execSQL("CREATE TABLE IF NOT EXISTS payroll (id TEXT PRIMARY KEY, tutor_name TEXT, completed_sessions INTEGER, rate_per_session INTEGER, total_payout INTEGER, status TEXT, bank_account TEXT)");

        seedInitialDemoData(db);
    }

    private void seedInitialDemoData(SQLiteDatabase db) {
        // Safe Seed Courses using ContentValues
        insertCourseSafe(db, "crs_1", "Matematika IPA & UTBK SNBT", "SMA / SNBT", "Kak Sarah Amalia, M.Sc", 65, 9, 14);
        insertCourseSafe(db, "crs_2", "Fisika Mekanika & Listrik Dinamis", "SMA / SNBT", "Kak Sarah Amalia, M.Sc", 60, 6, 10);
        insertCourseSafe(db, "crs_3", "English Academic & IELTS Preparation", "Bahasa", "Kak Budi Prasetyo, S.Pd", 83, 10, 12);
        insertCourseSafe(db, "crs_4", "Python Programming & Data Science", "Coding", "Kak Amanda Clarissa, B.Eng", 75, 12, 16);

        // Safe Seed Schedules
        insertScheduleSafe(db, "sch_1", "Turunan Fungsi & Nilai Ekstrim", "Matematika SMA", "Kak Sarah Amalia, M.Sc", "Kevin Pratama", "Besok (02 Sep 2026)", "16:00 - 17:30 WIB", "Google Meet", "https://meet.google.com/abc-privat-sarah", "Siapkan modul kalkulus bab turunan parsial halaman 45.", "upcoming");
        insertScheduleSafe(db, "sch_2", "Hukum Kirchhoff & Jembatan Wheatstone", "Fisika SMA", "Kak Sarah Amalia, M.Sc", "Kevin Pratama", "Jumat, 04 Sep 2026", "19:00 - 20:30 WIB", "Zoom Online", "https://zoom.us/j/9876543210", "Membahas soal-soal latihan rangkaian listrik 2 loop.", "upcoming");
        insertScheduleSafe(db, "sch_3", "Integral Substitusi & Luas Daerah", "Matematika SMA", "Kak Sarah Amalia, M.Sc", "Kevin Pratama", "28 Agu 2026", "16:00 - 17:30 WIB", "Google Meet", "https://meet.google.com/abc-privat-sarah", "Siswa sangat memahami metode integral parsial.", "completed");

        // Safe Seed Quizzes & Questions
        insertQuizSafe(db, "qz_1", "Kuis Evaluasi 01: Turunan & Aplikasi Maksimum", "Matematika", 15, 75, 90, 1);
        insertQuizSafe(db, "qz_2", "Tryout SNBT 01: Penalaran Matematika & TPS", "UTBK SNBT", 30, 80, 0, 0);

        insertQuestionSafe(db, "qq_1", "qz_1", "Turunan pertama dari f(x) = 3x^2 + 5x - 7 adalah...", "6x + 5", "3x + 5", "6x - 7", "5x + 3", "A", "Turunan dari ax^n adalah n*ax^(n-1). Maka d/dx(3x^2 + 5x - 7) = 6x + 5.");
        insertQuestionSafe(db, "qq_2", "qz_1", "Jika f(x) = (2x + 1)(x - 3), nilai turunan pada x = 2 adalah...", "3", "5", "7", "9", "A", "f(x) = 2x^2 - 5x - 3 -> turunan f'(x) = 4x - 5. Untuk x=2: 4(2) - 5 = 3.");
        insertQuestionSafe(db, "qq_3", "qz_1", "Titik stasioner dari kurva y = x^2 - 4x + 5 terjadi pada x = ...", "1", "2", "3", "4", "B", "Syarat titik stasioner dy/dx = 0 -> 2x - 4 = 0 -> x = 2.");

        // Safe Seed Assignments
        insertAssignmentSafe(db, "asg_1", "Latihan Mandiri Bab 03: Rangkaian Listrik Loop Majemuk", "Fisika SMA", "Kevin Pratama", "03 Sep 2026", "pending", 0, "", "");
        insertAssignmentSafe(db, "asg_2", "Analisis Soal UTBK Integral Substitusi Trigonometri", "Matematika SMA", "Kevin Pratama", "29 Agu 2026", "graded", 95, "Langkah pengerjaan sangat rapi dan logis. Pertahankan ketelitian perhitungan integral tentu!", "Tugas_Kevin_Integral.pdf (Terlampir)");

        // Safe Seed Materials
        insertMaterialSafe(db, "mat_1", "Modul Lengkap: Kalkulus Integral & Luas Daerah Tertutup", "Matematika SMA", "pdf", "4.2 MB", "18 Halaman", "Rangkuman lengkap teori integral tentu, substitusi, parsial beserta 20 bank soal SNBT.", "https://privatgo.com/docs/kalkulus.pdf");
        insertMaterialSafe(db, "mat_2", "Video Pembahasan Eksklusif: Trik Cepat Hukum Kirchhoff", "Fisika SMA", "video", "78 MB", "14:20 Menit", "Video rekam layar interaktif tutor membahas trik menentukan arah arus pada rangkaian majemuk.", "https://privatgo.com/videos/kirchhoff.mp4");

        // Safe Seed Students
        insertStudentSafe(db, "std_1", "Kevin Pratama", "12 SMA IPA", "SMA Negeri 1", "Intensif SNBT 1-on-1 (12 Sesi)", "Teknik Informatika ITB", "Kak Sarah Amalia, M.Sc", "081234567890", 8);
        insertStudentSafe(db, "std_2", "Nadia Syahrini", "11 SMA IPA", "SMA Taruna Nusantara", "Paket Reguler Fisika (8 Sesi)", "Kedokteran UI", "Kak Sarah Amalia, M.Sc", "081399887766", 6);

        // Safe Seed Tutors
        insertTutorSafe(db, "tut_1", "Kak Sarah Amalia, M.Sc", "Institut Teknologi Bandung (ITB)", "Matematika & Fisika SMA / SNBT", 4.95, 150000, 142);
        insertTutorSafe(db, "tut_2", "Kak Budi Prasetyo, S.Pd", "Universitas Indonesia (UI)", "Bahasa Inggris & IELTS Academic", 4.90, 140000, 98);

        // Safe Seed Invoices
        insertInvoiceSafe(db, "INV-2026-0801", "Kevin Pratama", "Paket Intensif SNBT 1-on-1 (12 Sesi)", 1800000, "01 Agu 2026", "Lunas", "Transfer Bank BCA");
        insertInvoiceSafe(db, "INV-2026-0901", "Kevin Pratama", "Paket Intensif SNBT 1-on-1 (12 Sesi)", 1800000, "05 Sep 2026", "Menunggu Verifikasi", "QRIS Mandiri");
        insertInvoiceSafe(db, "INV-2026-0902", "Nadia Syahrini", "Paket Reguler Fisika SMA (8 Sesi)", 1200000, "07 Sep 2026", "Belum Bayar", "Transfer Bank BNI");

        // Safe Seed Payroll
        insertPayrollSafe(db, "PAY-2026-08", "Kak Sarah Amalia, M.Sc", 28, 150000, 4200000, "Sudah Ditransfer", "BCA 8830192831 a.n Sarah Amalia");
        insertPayrollSafe(db, "PAY-2026-09", "Kak Budi Prasetyo, S.Pd", 16, 140000, 2240000, "Menunggu Persetujuan", "Mandiri 1370019283 a.n Budi Prasetyo");
    }

    private void insertCourseSafe(SQLiteDatabase db, String id, String title, String category, String tutor, int progress, int completed, int total) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("title", title); cv.put("category", category); cv.put("tutor_name", tutor);
        cv.put("progress", progress); cv.put("completed_modules", completed); cv.put("total_modules", total);
        db.insertWithOnConflict("courses", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertScheduleSafe(SQLiteDatabase db, String id, String title, String subject, String tutor, String student, String date, String time, String platform, String url, String note, String status) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("title", title); cv.put("subject", subject); cv.put("tutor_name", tutor); cv.put("student_name", student);
        cv.put("date", date); cv.put("time", time); cv.put("platform", platform); cv.put("meet_url", url); cv.put("note", note); cv.put("status", status);
        db.insertWithOnConflict("schedules", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertQuizSafe(SQLiteDatabase db, String id, String title, String subject, int dur, int pass, int score, int completed) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("title", title); cv.put("subject", subject); cv.put("duration_minutes", dur); cv.put("pass_score", pass); cv.put("my_score", score); cv.put("is_completed", completed);
        db.insertWithOnConflict("quizzes", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertQuestionSafe(SQLiteDatabase db, String id, String quizId, String qText, String a, String b, String c, String d, String correct, String exp) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("quiz_id", quizId); cv.put("question_text", qText); cv.put("opt_a", a); cv.put("opt_b", b); cv.put("opt_c", c); cv.put("opt_d", d); cv.put("correct_opt", correct); cv.put("explanation", exp);
        db.insertWithOnConflict("quiz_questions", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertAssignmentSafe(SQLiteDatabase db, String id, String title, String subject, String student, String deadline, String status, int score, String feedback, String sub) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("title", title); cv.put("subject", subject); cv.put("student_name", student); cv.put("deadline", deadline); cv.put("status", status); cv.put("score", score); cv.put("feedback", feedback); cv.put("student_submission", sub);
        db.insertWithOnConflict("assignments", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertMaterialSafe(SQLiteDatabase db, String id, String title, String subject, String type, String size, String dur, String summary, String url) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("title", title); cv.put("subject", subject); cv.put("type", type); cv.put("file_size", size); cv.put("duration", dur); cv.put("summary", summary); cv.put("content_url", url);
        db.insertWithOnConflict("materials", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertStudentSafe(SQLiteDatabase db, String id, String name, String grade, String school, String pkg, String target, String tutor, String phone, int sessions) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("name", name); cv.put("grade", grade); cv.put("school", school); cv.put("package_name", pkg); cv.put("target_univ", target); cv.put("tutor_name", tutor); cv.put("parent_phone", phone); cv.put("completed_sessions", sessions);
        db.insertWithOnConflict("students", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertTutorSafe(SQLiteDatabase db, String id, String name, String univ, String spec, double rating, long rate, int sessions) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("name", name); cv.put("university", univ); cv.put("specialization", spec); cv.put("rating", rating); cv.put("hourly_rate", (int) rate); cv.put("total_sessions", sessions);
        db.insertWithOnConflict("tutors", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertInvoiceSafe(SQLiteDatabase db, String id, String student, String pkg, long amount, String due, String status, String method) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("student_name", student); cv.put("package_name", pkg); cv.put("amount", (int) amount); cv.put("due_date", due); cv.put("status", status); cv.put("payment_method", method);
        db.insertWithOnConflict("invoices", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    private void insertPayrollSafe(SQLiteDatabase db, String id, String tutor, int sessions, long rate, long total, String status, String bank) {
        ContentValues cv = new ContentValues();
        cv.put("id", id); cv.put("tutor_name", tutor); cv.put("completed_sessions", sessions); cv.put("rate_per_session", (int) rate); cv.put("total_payout", (int) total); cv.put("status", status); cv.put("bank_account", bank);
        db.insertWithOnConflict("payroll", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS courses");
        db.execSQL("DROP TABLE IF EXISTS schedules");
        db.execSQL("DROP TABLE IF EXISTS quizzes");
        db.execSQL("DROP TABLE IF EXISTS quiz_questions");
        db.execSQL("DROP TABLE IF EXISTS assignments");
        db.execSQL("DROP TABLE IF EXISTS materials");
        db.execSQL("DROP TABLE IF EXISTS students");
        db.execSQL("DROP TABLE IF EXISTS tutors");
        db.execSQL("DROP TABLE IF EXISTS invoices");
        db.execSQL("DROP TABLE IF EXISTS payroll");
        onCreate(db);
    }

    // Queries
    public List<Course> getAllCourses() {
        List<Course> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM courses", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Course(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getInt(4), c.getInt(5), c.getInt(6)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<Schedule> getAllSchedules() {
        List<Schedule> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM schedules ORDER BY id DESC", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Schedule(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getString(8), c.getString(9), c.getString(10)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public void insertSchedule(Schedule s) {
        try {
            SQLiteDatabase db = getWritableDatabase();
            insertScheduleSafe(db, s.getId(), s.getTitle(), s.getSubject(), s.getTutorName(), s.getStudentName(), s.getDate(), s.getTime(), s.getPlatform(), s.getMeetUrl(), s.getNote(), s.getStatus());
        } catch (Exception e) { e.printStackTrace(); }
    }

    public List<Quiz> getAllQuizzes() {
        List<Quiz> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM quizzes", null);
            if (c.moveToFirst()) {
                do {
                    Quiz q = new Quiz(c.getString(0), c.getString(1), c.getString(2), c.getInt(3), c.getInt(4), c.getInt(5), c.getInt(6) == 1);
                    q.setQuestions(getQuestionsForQuiz(q.getId()));
                    list.add(q);
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<QuizQuestion> getQuestionsForQuiz(String quizId) {
        List<QuizQuestion> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM quiz_questions WHERE quiz_id = ?", new String[]{quizId});
            if (c.moveToFirst()) {
                do {
                    list.add(new QuizQuestion(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getString(8)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public void updateQuizScore(String quizId, int score) {
        try {
            SQLiteDatabase db = getWritableDatabase();
            ContentValues cv = new ContentValues();
            cv.put("my_score", score);
            cv.put("is_completed", 1);
            db.update("quizzes", cv, "id = ?", new String[]{quizId});
        } catch (Exception e) { e.printStackTrace(); }
    }

    public List<Assignment> getAllAssignments() {
        List<Assignment> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM assignments", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Assignment(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getInt(6), c.getString(7), c.getString(8)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public void updateAssignmentGrade(String assignmentId, int score, String feedback) {
        try {
            SQLiteDatabase db = getWritableDatabase();
            ContentValues cv = new ContentValues();
            cv.put("score", score);
            cv.put("feedback", feedback);
            cv.put("status", "graded");
            db.update("assignments", cv, "id = ?", new String[]{assignmentId});
        } catch (Exception e) { e.printStackTrace(); }
    }

    public void submitAssignment(String assignmentId, String submissionText) {
        try {
            SQLiteDatabase db = getWritableDatabase();
            ContentValues cv = new ContentValues();
            cv.put("student_submission", submissionText);
            cv.put("status", "submitted");
            db.update("assignments", cv, "id = ?", new String[]{assignmentId});
        } catch (Exception e) { e.printStackTrace(); }
    }

    public List<Material> getAllMaterials() {
        List<Material> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM materials", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Material(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<Student> getAllStudents() {
        List<Student> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM students", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Student(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getInt(8)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<Tutor> getAllTutors() {
        List<Tutor> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM tutors", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Tutor(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getDouble(4), c.getLong(5), c.getInt(6)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<Invoice> getAllInvoices() {
        List<Invoice> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM invoices", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Invoice(c.getString(0), c.getString(1), c.getString(2), c.getLong(3), c.getString(4), c.getString(5), c.getString(6)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public void markInvoicePaid(String invoiceId) {
        try {
            SQLiteDatabase db = getWritableDatabase();
            ContentValues cv = new ContentValues();
            cv.put("status", "Lunas");
            db.update("invoices", cv, "id = ?", new String[]{invoiceId});
        } catch (Exception e) { e.printStackTrace(); }
    }

    public List<Payroll> getAllPayroll() {
        List<Payroll> list = new ArrayList<>();
        try {
            SQLiteDatabase db = getReadableDatabase();
            Cursor c = db.rawQuery("SELECT * FROM payroll", null);
            if (c.moveToFirst()) {
                do {
                    list.add(new Payroll(c.getString(0), c.getString(1), c.getInt(2), c.getLong(3), c.getLong(4), c.getString(5), c.getString(6)));
                } while (c.moveToNext());
            }
            c.close();
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }
}
