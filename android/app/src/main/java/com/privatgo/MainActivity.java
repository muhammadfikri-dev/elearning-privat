package com.privatgo;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.privatgo.repository.DataRepository;

public class MainActivity extends AppCompatActivity {

    private MaterialToolbar toolbar;
    private BottomNavigationView bottomNav;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.top_toolbar);
        bottomNav = findViewById(R.id.bottom_navigation);

        toolbar.setTitle("PrivatGo");
        toolbar.setSubtitle("Platform Les Privat Terpadu");

        setupNavigation();
        loadStudentHomeView();
    }

    private void setupNavigation() {
        bottomNav.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.nav_student_home) {
                loadStudentHomeView();
                return true;
            } else if (itemId == R.id.nav_student_schedule) {
                toolbar.setTitle("Jadwal Les");
                Toast.makeText(this, "Membuka Jadwal Les Privat", Toast.LENGTH_SHORT).show();
                return true;
            } else if (itemId == R.id.nav_student_materials) {
                toolbar.setTitle("Modul & Bahan Ajar");
                Toast.makeText(this, "Membuka Modul Pembelajaran", Toast.LENGTH_SHORT).show();
                return true;
            } else if (itemId == R.id.nav_student_quiz) {
                toolbar.setTitle("Kuis Interaktif");
                Toast.makeText(this, "Membuka Bank Soal Kuis", Toast.LENGTH_SHORT).show();
                return true;
            } else if (itemId == R.id.nav_student_report) {
                toolbar.setTitle("Rapor Siswa");
                Toast.makeText(this, "Membuka Evaluasi Belajar", Toast.LENGTH_SHORT).show();
                return true;
            }
            return false;
        });
    }

    private void loadStudentHomeView() {
        toolbar.setTitle("PrivatGo Siswa");
        View homeView = getLayoutInflater().inflate(R.layout.fragment_student_home, null);
        
        View btnJoin = homeView.findViewById(R.id.btn_join_meet);
        if (btnJoin != null) {
            btnJoin.setOnClickListener(v -> {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://meet.google.com/abc-privat-sarah"));
                startActivity(browserIntent);
            });
        }

        android.widget.FrameLayout container = findViewById(R.id.fragment_container);
        if (container != null) {
            container.removeAllViews();
            container.addView(homeView);
        }
    }
}
