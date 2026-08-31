package com.privatgo;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.progressindicator.LinearProgressIndicator;
import com.privatgo.models.*;
import com.privatgo.repository.DataRepository;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private MaterialToolbar toolbar;
    private BottomNavigationView bottomNav;
    private FrameLayout container;
    private DataRepository repository;
    private String currentRole = "student";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.top_toolbar);
        bottomNav = findViewById(R.id.bottom_navigation);
        container = findViewById(R.id.fragment_container);

        repository = DataRepository.getInstance(this);

        detectApplicationRole();
        setupNavigationForRole();
    }

    private void detectApplicationRole() {
        String pkg = getPackageName();
        if (pkg.contains("tutor")) {
            currentRole = "tutor";
            toolbar.setTitle("PrivatGo Tutor Studio");
            toolbar.setSubtitle("Ruang Guru & Manajemen Bimbingan");
            bottomNav.getMenu().clear();
            bottomNav.inflateMenu(R.menu.bottom_nav_tutor);
        } else if (pkg.contains("parent")) {
            currentRole = "parent";
            toolbar.setTitle("PrivatGo Orang Tua");
            toolbar.setSubtitle("Pantauan Belajar Ananda");
            bottomNav.getMenu().clear();
            bottomNav.inflateMenu(R.menu.bottom_nav_parent);
        } else if (pkg.contains("admin")) {
            currentRole = "admin";
            toolbar.setTitle("PrivatGo Super Admin");
            toolbar.setSubtitle("Pusat Kendali Operasional");
            bottomNav.getMenu().clear();
            bottomNav.inflateMenu(R.menu.bottom_nav_admin);
        } else if (pkg.contains("finance")) {
            currentRole = "finance";
            toolbar.setTitle("PrivatGo Finance & SPP");
            toolbar.setSubtitle("Manajemen Tagihan & Penggajian");
            bottomNav.getMenu().clear();
            bottomNav.inflateMenu(R.menu.bottom_nav_finance);
        } else {
            currentRole = "student";
            toolbar.setTitle("PrivatGo Siswa");
            toolbar.setSubtitle("Belajar Les Privat Interaktif");
            bottomNav.getMenu().clear();
            bottomNav.inflateMenu(R.menu.bottom_nav_student);
        }
    }

    private void setupNavigationForRole() {
        if ("student".equals(currentRole)) {
            loadStudentHome();
            bottomNav.setOnItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_student_home) { loadStudentHome(); return true; }
                if (id == R.id.nav_student_schedule) { loadStudentSchedule(); return true; }
                if (id == R.id.nav_student_materials) { loadStudentMaterials(); return true; }
                if (id == R.id.nav_student_quiz) { loadStudentQuizzes(); return true; }
                if (id == R.id.nav_student_report) { loadStudentReport(); return true; }
                return false;
            });
        } else if ("tutor".equals(currentRole)) {
            loadTutorHome();
            bottomNav.setOnItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_tutor_home) { loadTutorHome(); return true; }
                if (id == R.id.nav_tutor_schedule) { loadStudentSchedule(); return true; }
                if (id == R.id.nav_tutor_grading) { loadTutorGrading(); return true; }
                if (id == R.id.nav_tutor_materials) { loadStudentMaterials(); return true; }
                return false;
            });
        } else if ("parent".equals(currentRole)) {
            loadParentHome();
            bottomNav.setOnItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_parent_home) { loadParentHome(); return true; }
                if (id == R.id.nav_parent_report) { loadStudentReport(); return true; }
                if (id == R.id.nav_parent_schedule) { loadStudentSchedule(); return true; }
                if (id == R.id.nav_parent_consult) { openWhatsAppConsultation(); return true; }
                return false;
            });
        } else if ("admin".equals(currentRole)) {
            loadAdminHome();
            bottomNav.setOnItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_admin_home) { loadAdminHome(); return true; }
                if (id == R.id.nav_admin_students) { loadAdminStudents(); return true; }
                if (id == R.id.nav_admin_tutors) { loadAdminTutors(); return true; }
                if (id == R.id.nav_admin_sessions) { loadStudentSchedule(); return true; }
                return false;
            });
        } else if ("finance".equals(currentRole)) {
            loadFinanceHome();
            bottomNav.setOnItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_finance_home) { loadFinanceHome(); return true; }
                if (id == R.id.nav_finance_invoices) { loadFinanceInvoices(); return true; }
                if (id == R.id.nav_finance_payroll) { loadFinancePayroll(); return true; }
                return false;
            });
        }
    }

    // STUDENT VIEWS
    private void loadStudentHome() {
        toolbar.setTitle("PrivatGo Siswa");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_home, null);
        
        View btnMeet = v.findViewById(R.id.btn_join_meet);
        if (btnMeet != null) {
            btnMeet.setOnClickListener(view -> {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://meet.google.com/abc-privat-sarah")));
            });
        }

        // Inflate Courses dynamically from SQLite
        LinearLayout rootLayout = (LinearLayout) ((androidx.core.widget.NestedScrollView) v).getChildAt(0);
        TextView title = new TextView(this);
        title.setText("Mata Pelajaran Les Kamu");
        title.setTextColor(getColor(R.color.text_primary));
        title.setTextSize(14f);
        title.setTypeface(null, android.graphics.Typeface.BOLD);
        title.setPadding(0, 16, 0, 12);
        rootLayout.addView(title);

        List<Course> courses = repository.getCourses();
        for (Course c : courses) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_course_card, rootLayout, false);
            ((TextView) card.findViewById(R.id.tv_course_title)).setText(c.getTitle());
            ((TextView) card.findViewById(R.id.tv_course_subtitle)).setText("Tutor: " + c.getTutorName() + " • " + c.getCompletedModules() + "/" + c.getTotalModules() + " Modul");
            ((TextView) card.findViewById(R.id.tv_course_percent)).setText(c.getProgress() + "%");
            ((LinearProgressIndicator) card.findViewById(R.id.pb_course_progress)).setProgress(c.getProgress());
            rootLayout.addView(card);
        }

        setContentViewInContainer(v);
    }

    private void loadStudentSchedule() {
        toolbar.setTitle("Jadwal Les Privat");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);

        List<Schedule> schedules = repository.getSchedules();
        for (Schedule s : schedules) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_schedule_card, list, false);
            ((TextView) card.findViewById(R.id.tv_schedule_title)).setText(s.getTitle());
            ((TextView) card.findViewById(R.id.tv_schedule_datetime)).setText(s.getDate() + " • " + s.getTime());
            ((TextView) card.findViewById(R.id.tv_schedule_participants)).setText("Tutor: " + s.getTutorName() + " • Murid: " + s.getStudentName());
            ((TextView) card.findViewById(R.id.tv_schedule_note)).setText("Catatan: " + s.getNote());
            ((TextView) card.findViewById(R.id.tv_schedule_badge)).setText(s.getStatus().equals("upcoming") ? "Akan Datang" : "Selesai");

            MaterialButton btn = card.findViewById(R.id.btn_open_meet);
            btn.setText("Masuk Ruang Kelas (" + s.getPlatform() + ")");
            btn.setOnClickListener(view -> {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(s.getMeetUrl())));
            });
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void loadStudentMaterials() {
        toolbar.setTitle("Bank Modul & Bahan Ajar");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_materials, null);
        LinearLayout list = v.findViewById(R.id.ll_materials_container);

        List<Material> materials = repository.getMaterials();
        for (Material m : materials) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_assignment_card, list, false);
            ((TextView) card.findViewById(R.id.tv_asg_title)).setText(m.getTitle());
            ((TextView) card.findViewById(R.id.tv_asg_badge)).setText(m.getType().equalsIgnoreCase("pdf") ? "📄 Dokumen PDF" : "🎥 Video Pembahasan");
            ((TextView) card.findViewById(R.id.tv_asg_deadline)).setText(m.getFileSize() + " • " + m.getDuration());
            ((TextView) card.findViewById(R.id.tv_asg_subject)).setText(m.getSummary());

            MaterialButton btn = card.findViewById(R.id.btn_action_asg);
            btn.setText(m.getType().equalsIgnoreCase("pdf") ? "Buka & Baca Modul PDF" : "Tonton Video Penjelasan");
            btn.setOnClickListener(view -> {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(m.getContentUrl())));
            });
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void loadStudentQuizzes() {
        toolbar.setTitle("Kuis & Tryout Interaktif");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_quiz, null);
        LinearLayout list = v.findViewById(R.id.ll_quiz_container);

        List<Quiz> quizzes = repository.getQuizzes();
        for (Quiz q : quizzes) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_quiz_card, list, false);
            ((TextView) card.findViewById(R.id.tv_quiz_title)).setText(q.getTitle());
            ((TextView) card.findViewById(R.id.tv_quiz_subject)).setText(q.getSubject());
            ((TextView) card.findViewById(R.id.tv_quiz_duration)).setText("⏱️ " + q.getDurationMinutes() + " Menit");
            ((TextView) card.findViewById(R.id.tv_quiz_pass)).setText("Passing Grade: " + q.getPassScore() + " Poin");
            ((TextView) card.findViewById(R.id.tv_quiz_score)).setText(q.isCompleted() ? "Nilai Kamu: " + q.getMyScore() + "/100" : "Belum Dikerjakan");

            MaterialButton btn = card.findViewById(R.id.btn_start_quiz);
            btn.setText(q.isCompleted() ? "Kerjakan Ulang Kuis" : "Mulai Kerjakan Kuis Sekarang");
            btn.setOnClickListener(view -> {
                Intent intent = new Intent(MainActivity.this, QuizRunnerActivity.class);
                intent.putExtra("quiz_id", q.getId());
                startActivity(intent);
            });
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void loadStudentReport() {
        toolbar.setTitle("Rapor & Evaluasi Belajar");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_report, null);
        setContentViewInContainer(v);
    }

    // TUTOR VIEWS
    private void loadTutorHome() {
        toolbar.setTitle("PrivatGo Tutor Studio");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_home, null);
        setContentViewInContainer(v);
    }

    private void loadTutorGrading() {
        toolbar.setTitle("Koreksi & Nilai Tugas Siswa");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);
        list.removeAllViews();

        List<Assignment> assignments = repository.getAssignments();
        for (Assignment a : assignments) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_assignment_card, list, false);
            ((TextView) card.findViewById(R.id.tv_asg_title)).setText(a.getTitle());
            ((TextView) card.findViewById(R.id.tv_asg_subject)).setText("Siswa: " + a.getStudentName() + " • " + a.getSubject());
            ((TextView) card.findViewById(R.id.tv_asg_deadline)).setText("Deadline: " + a.getDeadline());
            ((TextView) card.findViewById(R.id.tv_asg_badge)).setText(a.getStatus().equals("graded") ? "✓ Sudah Dinilai (" + a.getScore() + "/100)" : "⏳ Perlu Dikoreksi");

            MaterialButton btn = card.findViewById(R.id.btn_action_asg);
            btn.setText("Input Nilai & Ulasan Guru");
            btn.setOnClickListener(view -> {
                showGradingDialog(a);
            });
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void showGradingDialog(Assignment a) {
        EditText etScore = new EditText(this);
        etScore.setHint("Masukkan Skor Nilai (0 - 100)");
        etScore.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);

        new AlertDialog.Builder(this)
            .setTitle("Beri Nilai: " + a.getTitle())
            .setMessage("Siswa: " + a.getStudentName() + "\nLampiran: " + a.getStudentSubmission())
            .setView(etScore)
            .setPositiveButton("Simpan Nilai", (dialog, which) -> {
                String val = etScore.getText().toString();
                if (!val.isEmpty()) {
                    int score = Integer.parseInt(val);
                    repository.gradeAssignment(a.getId(), score, "Bagus! Pertahankan ketelitian.");
                    Toast.makeText(this, "Nilai berhasil disimpan di database!", Toast.LENGTH_SHORT).show();
                    loadTutorGrading();
                }
            })
            .setNegativeButton("Batal", null)
            .show();
    }

    // PARENT VIEWS
    private void loadParentHome() {
        toolbar.setTitle("Pantauan Belajar Kevin Pratama");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_report, null);
        setContentViewInContainer(v);
    }

    private void openWhatsAppConsultation() {
        Intent waIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/6281233445566?text=Halo%20Kak%20Sarah,%20saya%20orang%20tua%20dari%20Kevin%20ingin%20konsultasi%20belajar"));
        startActivity(waIntent);
    }

    // ADMIN VIEWS
    private void loadAdminHome() {
        toolbar.setTitle("Executive Overview Lembaga");
        loadStudentSchedule();
    }

    private void loadAdminStudents() {
        toolbar.setTitle("Master Data Siswa Bimbingan");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);
        list.removeAllViews();

        List<Student> students = repository.getStudents();
        for (Student s : students) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_course_card, list, false);
            ((TextView) card.findViewById(R.id.tv_course_title)).setText(s.getName() + " (" + s.getGrade() + ")");
            ((TextView) card.findViewById(R.id.tv_course_subtitle)).setText("Program: " + s.getPackageName() + "\nTutor: " + s.getTutorName() + " • Kontak: " + s.getParentPhone());
            ((TextView) card.findViewById(R.id.tv_course_percent)).setText(s.getCompletedSessions() + " Sesi");
            ((LinearProgressIndicator) card.findViewById(R.id.pb_course_progress)).setProgress(80);
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void loadAdminTutors() {
        toolbar.setTitle("Master Data Guru Privat");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);
        list.removeAllViews();

        List<Tutor> tutors = repository.getTutors();
        for (Tutor t : tutors) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_course_card, list, false);
            ((TextView) card.findViewById(R.id.tv_course_title)).setText(t.getName());
            ((TextView) card.findViewById(R.id.tv_course_subtitle)).setText("Alumni: " + t.getUniversity() + "\nSpesialisasi: " + t.getSpecialization() + " • " + t.getTotalSessions() + " Sesi");
            ((TextView) card.findViewById(R.id.tv_course_percent)).setText("⭐ " + t.getRating());
            ((LinearProgressIndicator) card.findViewById(R.id.pb_course_progress)).setProgress(95);
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    // FINANCE VIEWS
    private void loadFinanceHome() {
        toolbar.setTitle("Ringkasan Keuangan SPP");
        loadFinanceInvoices();
    }

    private void loadFinanceInvoices() {
        toolbar.setTitle("Manajemen Tagihan & Invoice SPP");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);
        list.removeAllViews();

        List<Invoice> invoices = repository.getInvoices();
        for (Invoice inv : invoices) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_invoice_card, list, false);
            ((TextView) card.findViewById(R.id.tv_inv_id)).setText(inv.getId());
            ((TextView) card.findViewById(R.id.tv_inv_badge)).setText(inv.getStatus());
            ((TextView) card.findViewById(R.id.tv_inv_student)).setText(inv.getStudentName());
            ((TextView) card.findViewById(R.id.tv_inv_package)).setText(inv.getPackageName() + " • Jatuh Tempo: " + inv.getDueDate());
            ((TextView) card.findViewById(R.id.tv_inv_amount)).setText(String.format("Rp %,d", inv.getAmount()));

            MaterialButton btn = card.findViewById(R.id.btn_action_inv);
            if ("Lunas".equals(inv.getStatus())) {
                btn.setText("Cetak Kwitansi Pembayaran Resmi");
                btn.setOnClickListener(view -> {
                    Toast.makeText(this, "Kwitansi resmi diterbitkan!", Toast.LENGTH_SHORT).show();
                });
            } else {
                btn.setText("Kirim Pengingat WhatsApp Wali Murid");
                btn.setOnClickListener(view -> {
                    String text = Uri.encode("Halo Bapak/Ibu wali dari " + inv.getStudentName() + ", mengingatkan tagihan SPP les nomor " + inv.getId() + " sebesar Rp " + inv.getAmount() + ".");
                    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/6281234567890?text=" + text)));
                });
            }
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void loadFinancePayroll() {
        toolbar.setTitle("Penggajian & Honor Tutor");
        View v = LayoutInflater.from(this).inflate(R.layout.fragment_student_schedule, null);
        LinearLayout list = v.findViewById(R.id.ll_schedule_container);
        list.removeAllViews();

        List<Payroll> payrollList = repository.getPayroll();
        for (Payroll p : payrollList) {
            View card = LayoutInflater.from(this).inflate(R.layout.item_invoice_card, list, false);
            ((TextView) card.findViewById(R.id.tv_inv_id)).setText(p.getId());
            ((TextView) card.findViewById(R.id.tv_inv_badge)).setText(p.getStatus());
            ((TextView) card.findViewById(R.id.tv_inv_student)).setText(p.getTutorName());
            ((TextView) card.findViewById(R.id.tv_inv_package)).setText(p.getCompletedSessions() + " Sesi Mengajar • " + p.getBankAccount());
            ((TextView) card.findViewById(R.id.tv_inv_amount)).setText(String.format("Rp %,d", p.getTotalPayout()));

            MaterialButton btn = card.findViewById(R.id.btn_action_inv);
            btn.setText("Transfer & Simpan Bukti Honor");
            btn.setOnClickListener(view -> {
                Toast.makeText(this, "Status honor berhasil diperbarui ke Sudah Ditransfer!", Toast.LENGTH_SHORT).show();
            });
            list.addView(card);
        }
        setContentViewInContainer(v);
    }

    private void setContentViewInContainer(View view) {
        container.removeAllViews();
        container.addView(view);
    }
}
