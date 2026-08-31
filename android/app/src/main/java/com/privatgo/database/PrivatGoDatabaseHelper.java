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
    private static final int DATABASE_VERSION = 1;

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
        db.execSQL("CREATE TABLE courses (id TEXT PRIMARY KEY, title TEXT, category TEXT, tutor_name TEXT, progress INTEGER, completed_modules INTEGER, total_modules INTEGER)");
        db.execSQL("CREATE TABLE schedules (id TEXT PRIMARY KEY, title TEXT, subject TEXT, tutor_name TEXT, student_name TEXT, date TEXT, time TEXT, platform TEXT, meet_url TEXT, note TEXT, status TEXT)");
        db.execSQL("CREATE TABLE quizzes (id TEXT PRIMARY KEY, title TEXT, subject TEXT, duration_minutes INTEGER, pass_score INTEGER, my_score INTEGER, is_completed INTEGER)");
        db.execSQL("CREATE TABLE quiz_questions (id TEXT PRIMARY KEY, quiz_id TEXT, question_text TEXT, opt_a TEXT, opt_b TEXT, opt_c TEXT, opt_d TEXT, correct_opt TEXT, explanation TEXT)");
        db.execSQL("CREATE TABLE assignments (id TEXT PRIMARY KEY, title TEXT, subject TEXT, student_name TEXT, deadline TEXT, status TEXT, score INTEGER, feedback TEXT, student_submission TEXT)");
        db.execSQL("CREATE TABLE materials (id TEXT PRIMARY KEY, title TEXT, subject TEXT, type TEXT, file_size TEXT, duration TEXT, summary TEXT, content_url TEXT)");
        db.execSQL("CREATE TABLE students (id TEXT PRIMARY KEY, name TEXT, grade TEXT, school TEXT, package_name TEXT, target_univ TEXT, tutor_name TEXT, parent_phone TEXT, completed_sessions INTEGER)");
        db.execSQL("CREATE TABLE tutors (id TEXT PRIMARY KEY, name TEXT, university TEXT, specialization TEXT, rating REAL, hourly_rate INTEGER, total_sessions INTEGER)");
        db.execSQL("CREATE TABLE invoices (id TEXT PRIMARY KEY, student_name TEXT, package_name TEXT, amount INTEGER, due_date TEXT, status TEXT, payment_method TEXT)");
        db.execSQL("CREATE TABLE payroll (id TEXT PRIMARY KEY, tutor_name TEXT, completed_sessions INTEGER, rate_per_session INTEGER, total_payout INTEGER, status TEXT, bank_account TEXT)");

        seedInitialDemoData(db);
    }

    private void seedInitialDemoData(SQLiteDatabase db) {
        // Seed Courses
        db.execSQL("INSERT INTO courses VALUES ('crs_1', 'Matematika IPA & UTBK SNBT', 'SMA / SNBT', 'Kak Sarah Amalia, M.Sc', 65, 9, 14)");
        db.execSQL("INSERT INTO courses VALUES ('crs_2', 'Fisika Mekanika & Listrik Dinamis', 'SMA / SNBT', 'Kak Sarah Amalia, M.Sc', 60, 6, 10)");
        db.execSQL("INSERT INTO courses VALUES ('crs_3', 'English Academic & IELTS Preparation', 'Bahasa', 'Kak Budi Prasetyo, S.Pd', 83, 10, 12)");
        db.execSQL("INSERT INTO courses VALUES ('crs_4', 'Python Programming & Data Science', 'Coding', 'Kak Amanda Clarissa, B.Eng', 75, 12, 16)");

        // Seed Schedules
        db.execSQL("INSERT INTO schedules VALUES ('sch_1', 'Turunan Fungsi & Nilai Ekstrim', 'Matematika SMA', 'Kak Sarah Amalia, M.Sc', 'Kevin Pratama', 'Besok (02 Sep 2026)', '16:00 - 17:30 WIB', 'Google Meet', 'https://meet.google.com/abc-privat-sarah', 'Siapkan modul kalkulus bab turunan parsial halaman 45.', 'upcoming')");
        db.execSQL("INSERT INTO schedules VALUES ('sch_2', 'Hukum Kirchhoff & Jembatan Wheatstone', 'Fisika SMA', 'Kak Sarah Amalia, M.Sc', 'Kevin Pratama', 'Jumat, 04 Sep 2026', '19:00 - 20:30 WIB', 'Zoom Online', 'https://zoom.us/j/9876543210', 'Membahas soal-soal latihan rangkaian listrik 2 loop.', 'upcoming')");
        db.execSQL("INSERT INTO schedules VALUES ('sch_3', 'Integral Substitusi & Luas Daerah', 'Matematika SMA', 'Kak Sarah Amalia, M.Sc', 'Kevin Pratama', '28 Agu 2026', '16:00 - 17:30 WIB', 'Google Meet', 'https://meet.google.com/abc-privat-sarah', 'Siswa sangat memahami metode integral parsial.', 'completed')");

        // Seed Quizzes & Questions
        db.execSQL("INSERT INTO quizzes VALUES ('qz_1', 'Kuis Evaluasi 01: Turunan & Aplikasi Maksimum Minimum', 'Matematika', 15, 75, 90, 1)");
        db.execSQL("INSERT INTO quizzes VALUES ('qz_2', 'Tryout SNBT 01: Penalaran Matematika & TPS', 'UTBK SNBT', 30, 80, 0, 0)");

        db.execSQL("INSERT INTO quiz_questions VALUES ('qq_1', 'qz_1', 'Turunan pertama dari f(x) = 3x^2 + 5x - 7 adalah...', '6x + 5', '3x + 5', '6x - 7', '5x + 3', 'A', 'Turunan dari ax^n adalah n*ax^(n-1). Maka d/dx(3x^2 + 5x - 7) = 6x + 5.')");
        db.execSQL("INSERT INTO quiz_questions VALUES ('qq_2', 'qz_1', 'Jika f(x) = (2x + 1)(x - 3), nilai f\'(2) adalah...', '3', '5', '7', '9', 'A', 'f(x) = 2x^2 - 5x - 3 -> f\'(x) = 4x - 5. Untuk x=2: f\'(2) = 4(2) - 5 = 3.')");
        db.execSQL("INSERT INTO quiz_questions VALUES ('qq_3', 'qz_1', 'Titik stasioner dari kurva y = x^2 - 4x + 5 terjadi pada x = ...', '1', '2', '3', '4', 'B', 'Syarat titik stasioner adalah dy/dx = 0 -> 2x - 4 = 0 -> x = 2.')");

        // Seed Assignments
        db.execSQL("INSERT INTO assignments VALUES ('asg_1', 'Latihan Mandiri Bab 03: Rangkaian Listrik Loop Majemuk', 'Fisika SMA', 'Kevin Pratama', '03 Sep 2026', 'pending', 0, '', '')");
        db.execSQL("INSERT INTO assignments VALUES ('asg_2', 'Analisis Soal UTBK Integral Substitusi Trigonometri', 'Matematika SMA', 'Kevin Pratama', '29 Agu 2026', 'graded', 95, 'Langkah pengerjaan sangat rapi dan logis. Pertahankan ketelitian perhitungan integral tentu!', 'Tugas_Kevin_Integral.pdf (Terlampir)')");

        // Seed Materials
        db.execSQL("INSERT INTO materials VALUES ('mat_1', 'Modul Lengkap: Kalkulus Integral & Luas Daerah Tertutup', 'Matematika SMA', 'pdf', '4.2 MB', '18 Halaman', 'Rangkuman lengkap teori integral tentu, substitusi, parsial beserta 20 bank soal SNBT.', 'https://privatgo.com/docs/kalkulus.pdf')");
        db.execSQL("INSERT INTO materials VALUES ('mat_2', 'Video Pembahasan Eksklusif: Trik Cepat Hukum Kirchhoff', 'Fisika SMA', 'video', '78 MB', '14:20 Menit', 'Video rekam layar interaktif tutor membahas trik menentukan arah arus pada rangkaian majemuk.', 'https://privatgo.com/videos/kirchhoff.mp4')");

        // Seed Students
        db.execSQL("INSERT INTO students VALUES ('std_1', 'Kevin Pratama', '12 SMA IPA', 'SMA Negeri 1', 'Intensif SNBT 1-on-1 (12 Sesi)', 'Teknik Informatika ITB', 'Kak Sarah Amalia, M.Sc', '081234567890', 8)");
        db.execSQL("INSERT INTO students VALUES ('std_2', 'Nadia Syahrini', '11 SMA IPA', 'SMA Taruna Nusantara', 'Paket Reguler Fisika (8 Sesi)', 'Kedokteran UI', 'Kak Sarah Amalia, M.Sc', '081399887766', 6)");

        // Seed Tutors
        db.execSQL("INSERT INTO tutors VALUES ('tut_1', 'Kak Sarah Amalia, M.Sc', 'Institut Teknologi Bandung (ITB)', 'Matematika & Fisika SMA / SNBT', 4.95, 150000, 142)");
        db.execSQL("INSERT INTO tutors VALUES ('tut_2', 'Kak Budi Prasetyo, S.Pd', 'Universitas Indonesia (UI)', 'Bahasa Inggris & IELTS Academic', 4.90, 140000, 98)");

        // Seed Invoices
        db.execSQL("INSERT INTO invoices VALUES ('INV-2026-0801', 'Kevin Pratama', 'Paket Intensif SNBT 1-on-1 (12 Sesi)', 1800000, '01 Agu 2026', 'Lunas', 'Transfer Bank BCA')");
        db.execSQL("INSERT INTO invoices VALUES ('INV-2026-0901', 'Kevin Pratama', 'Paket Intensif SNBT 1-on-1 (12 Sesi)', 1800000, '05 Sep 2026', 'Menunggu Verifikasi', 'QRIS Mandiri')");
        db.execSQL("INSERT INTO invoices VALUES ('INV-2026-0902', 'Nadia Syahrini', 'Paket Reguler Fisika SMA (8 Sesi)', 1200000, '07 Sep 2026', 'Belum Bayar', 'Transfer Bank BNI')");

        // Seed Payroll
        db.execSQL("INSERT INTO payroll VALUES ('PAY-2026-08', 'Kak Sarah Amalia, M.Sc', 28, 150000, 4200000, 'Sudah Ditransfer', 'BCA 8830192831 a.n Sarah Amalia')");
        db.execSQL("INSERT INTO payroll VALUES ('PAY-2026-09', 'Kak Budi Prasetyo, S.Pd', 16, 140000, 2240000, 'Menunggu Persetujuan', 'Mandiri 1370019283 a.n Budi Prasetyo')");
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
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM courses", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Course(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getInt(4), c.getInt(5), c.getInt(6)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public List<Schedule> getAllSchedules() {
        List<Schedule> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM schedules ORDER BY id DESC", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Schedule(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getString(8), c.getString(9), c.getString(10)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public void insertSchedule(Schedule s) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("id", s.getId());
        cv.put("title", s.getTitle());
        cv.put("subject", s.getSubject());
        cv.put("tutor_name", s.getTutorName());
        cv.put("student_name", s.getStudentName());
        cv.put("date", s.getDate());
        cv.put("time", s.getTime());
        cv.put("platform", s.getPlatform());
        cv.put("meet_url", s.getMeetUrl());
        cv.put("note", s.getNote());
        cv.put("status", s.getStatus());
        db.insertWithOnConflict("schedules", null, cv, SQLiteDatabase.CONFLICT_REPLACE);
    }

    public List<Quiz> getAllQuizzes() {
        List<Quiz> list = new ArrayList<>();
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
        return list;
    }

    public List<QuizQuestion> getQuestionsForQuiz(String quizId) {
        List<QuizQuestion> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM quiz_questions WHERE quiz_id = ?", new String[]{quizId});
        if (c.moveToFirst()) {
            do {
                list.add(new QuizQuestion(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getString(8)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public void updateQuizScore(String quizId, int score) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("my_score", score);
        cv.put("is_completed", 1);
        db.update("quizzes", cv, "id = ?", new String[]{quizId});
    }

    public List<Assignment> getAllAssignments() {
        List<Assignment> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM assignments", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Assignment(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getInt(6), c.getString(7), c.getString(8)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public void updateAssignmentGrade(String assignmentId, int score, String feedback) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("score", score);
        cv.put("feedback", feedback);
        cv.put("status", "graded");
        db.update("assignments", cv, "id = ?", new String[]{assignmentId});
    }

    public void submitAssignment(String assignmentId, String submissionText) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("student_submission", submissionText);
        cv.put("status", "submitted");
        db.update("assignments", cv, "id = ?", new String[]{assignmentId});
    }

    public List<Material> getAllMaterials() {
        List<Material> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM materials", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Material(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public List<Student> getAllStudents() {
        List<Student> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM students", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Student(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getString(4), c.getString(5), c.getString(6), c.getString(7), c.getInt(8)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public List<Tutor> getAllTutors() {
        List<Tutor> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM tutors", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Tutor(c.getString(0), c.getString(1), c.getString(2), c.getString(3), c.getDouble(4), c.getLong(5), c.getInt(6)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public List<Invoice> getAllInvoices() {
        List<Invoice> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM invoices", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Invoice(c.getString(0), c.getString(1), c.getString(2), c.getLong(3), c.getString(4), c.getString(5), c.getString(6)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }

    public void markInvoicePaid(String invoiceId) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("status", "Lunas");
        db.update("invoices", cv, "id = ?", new String[]{invoiceId});
    }

    public List<Payroll> getAllPayroll() {
        List<Payroll> list = new ArrayList<>();
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("SELECT * FROM payroll", null);
        if (c.moveToFirst()) {
            do {
                list.add(new Payroll(c.getString(0), c.getString(1), c.getInt(2), c.getLong(3), c.getLong(4), c.getString(5), c.getString(6)));
            } while (c.moveToNext());
        }
        c.close();
        return list;
    }
}
