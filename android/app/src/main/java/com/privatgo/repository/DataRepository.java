package com.privatgo.repository;

import com.privatgo.models.Course;
import com.privatgo.models.Schedule;
import java.util.ArrayList;
import java.util.List;

public class DataRepository {
    private static DataRepository instance;

    private List<Course> courses = new ArrayList<>();
    private List<Schedule> schedules = new ArrayList<>();

    private DataRepository() {
        seedData();
    }

    public static synchronized DataRepository getInstance() {
        if (instance == null) {
            instance = new DataRepository();
        }
        return instance;
    }

    private void seedData() {
        courses.add(new Course("crs_1", "Matematika IPA & UTBK SNBT", "SMA / SNBT", "Kak Sarah Amalia, M.Sc", 65, 9, 14));
        courses.add(new Course("crs_2", "Fisika Mekanika & Listrik", "SMA / SNBT", "Kak Sarah Amalia, M.Sc", 60, 6, 10));
        courses.add(new Course("crs_3", "English Academic IELTS", "Bahasa", "Kak Budi Prasetyo, S.Pd", 83, 10, 12));
        courses.add(new Course("crs_4", "Python Programming", "Coding", "Kak Amanda Clarissa, B.Eng", 75, 12, 16));

        schedules.add(new Schedule("sch_1", "Turunan & Maksimum Minimum", "Matematika SMA", "Kak Sarah Amalia, M.Sc", "Kevin Pratama", "Besok (02 Sep)", "16:00 - 17:30 WIB", "Google Meet", "https://meet.google.com/abc-privat-sarah", "Siapkan modul kalkulus halaman 45.", "upcoming"));
        schedules.add(new Schedule("sch_2", "Listrik Dinamis & Kirchhoff", "Fisika SMA", "Kak Sarah Amalia, M.Sc", "Kevin Pratama", "Jumat, 04 Sep", "19:00 - 20:30 WIB", "Zoom Online", "https://zoom.us/j/9876543210", "Membahas rangkaian 2 loop.", "upcoming"));
    }

    public List<Course> getCourses() { return courses; }
    public List<Schedule> getSchedules() { return schedules; }
}
