# 🎓 PrivatGo - Platform E-Learning & Les Privat Terpadu Multiplatform

Platform E-Learning modern dan interaktif yang dirancang khusus untuk operasional **Les Privat 1-on-1 dan Kelas Intensif**. Dibangun dengan arsitektur multi-role terisolasi, persistensi database lokal, dan integrasi **GitHub Actions CI/CD** untuk kompilasi otomatis aplikasi **Android (APK)** dan **Windows Desktop (EXE)** di cloud tanpa membebani laptop pengguna.

---

## 🌟 5 Portal & Aplikasi Terpisah

Aplikasi ini memisahkan alur kerja untuk setiap pemangku kepentingan dalam ekosistem les privat:

### 1. 🎓 Portal Siswa (Student Learning App)
- **Dashboard & Gamifikasi**: Level belajar, XP point, hitung mundur sesi les terdekat, dan streak belajar harian.
- **Modul & Materi**: Akses bank materi PDF, video pembahasan, dan rangkuman rumus cepat per mata pelajaran (Matematika, Fisika, IELTS, Coding).
- **Jadwal & Live Class**: Sesi 1-on-1 dengan integrasi tautan langsung ke **Google Meet** dan **Zoom Online**, serta fitur pengajuan *reschedule*.
- **Kuis Interaktif**: *Quiz engine* dengan penghitung waktu mundur (*timer*), navigasi nomor soal, penilaian otomatis, efek selebrasi kuis, dan pembahasan tuntas.
- **Tugas & PR**: Pengumpulan tugas, lampiran berkas pengerjaan, dan menerima nilai beserta ulasan koreksi detail dari guru.
- **Presensi & Absensi**: Rekap kehadiran 100% dan histori topik yang telah dipelajari di setiap pertemuan.
- **Rapor & Evaluasi Perkembangan**: Grafik visual pemahaman konsep materi per bab dan catatan evaluasi resmi dari tutor.
- **Tanya Guru**: Obrolan (*chat*) langsung dengan guru privat untuk konsultasi soal sulit.

### 2. 👨‍🏫 Portal Tutor (Teacher Studio)
- **Dashboard Pengajar**: Statistik jam mengajar, sesi aktif hari ini, murid bimbingan, dan tugas yang menunggu dikoreksi.
- **Manajemen Modul & Bahan Ajar**: Unggah modul PDF baru, tautan video, ringkasan konsep, dan pengaturan akses murid.
- **Manajemen Jadwal Les**: Atur ketersediaan slot mengajar, buat jadwal sesi baru, tautan ruang kelas daring, dan persetujuan jadwal pengganti.
- **Pembuat Kuis & Bank Soal**: Pembuatan kuis latihan dengan kunci jawaban dan pembahasan otomatis.
- **Koreksi & Penilaian Tugas**: Periksa jawaban tugas siswa, input skor (0–100), dan berikan masukan edukatif.
- **Jurnal Mengajar & Presensi**: Pencatatan kehadiran siswa dan log materi yang dipelajari pada setiap pertemuan.
- **Pengisian Rapor Siswa**: Input evaluasi berkala dan rekomendasi pendampingan belajar untuk orang tua.

### 3. 👨‍👩‍👧 Portal Orang Tua (Parent Monitor)
- **Pantauan Belajar Anak**: Pemantauan nilai rata-rata, rekap kehadiran les, dan jadwal pertemuan les mendatang secara transparan.
- **Jurnal Catatan Guru**: Membaca catatan perkembangan, kekuatan, dan area perbaikan anak langsung dari guru privat.
- **Kalender Aktivitas Les**: Memastikan anak mengikuti sesi belajar tepat waktu.
- **Konsultasi Langsung**: Tombol cepat untuk menghubungi guru privat atau admin lembaga via WhatsApp.

### 4. ⚡ Portal Super Admin (Academic & Operations)
- **Pusat Kendali Lembaga**: Monitoring total siswa, tutor aktif, total jam les se-lembaga, dan indeks kepuasan siswa.
- **Master Data Siswa & Tutor**: Manajemen data profil, spesialisasi guru, dan alokasi murid bimbingan.
- **Matriks Seluruh Jadwal**: Pemantauan langsung seluruh kelas yang sedang dan akan berjalan di lembaga les.
- **Audit Log Sistem**: Log aktivitas sistem dan pencatatan riwayat operasional.

### 5. 💳 Aplikasi Terpisah: Billing & Keuangan SPP (Finance Suite)
- **Dashboard Finansial**: Total omset/pemasukan bulanan, tagihan tertunggak, beban honor tutor, dan estimasi laba bersih.
- **Manajemen Invoice & SPP**: Penerbitan nomor invoice resmi per siswa/paket bimbingan, tanggal jatuh tempo, dan status tagihan.
- **Verifikasi Pembayaran**: Pemeriksaan bukti transfer bank/QRIS yang diunggah serta verifikasi status lunas.
- **Generator Kwitansi Resmi**: Cetak atau unduh kwitansi resmi pembayaran les privat berformat PDF siap cetak.
- **Penggajian & Honorarium Tutor**: Penghitungan otomatis gaji guru berdasarkan jumlah sesi les yang telah terlaksana + bonus insentif.
- **Generator Pengingat Tagihan WhatsApp**: Menghasilkan pesan tagihan resmi terstruktur lengkap dengan rincian invoice dan nomor rekening tujuan, serta tombol kirim langsung via WhatsApp Web/App (`wa.me`).

---

## 🚀 Cara Menjalankan Aplikasi

### Opsi 1: Jalankan Langsung di Browser (Tanpa Install Apapun)
Cukup buka berkas `index.html` langsung menggunakan browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox). Seluruh fungsi portal, kuis interaktif, switch role, dan penyimpanan data sudah siap digunakan.

---

## ☁️ Kompilasi Android APK & Windows EXE di GitHub Actions

Sesuai permintaan, **Anda tidak perlu mengompilasi APK atau EXE di laptop ini**. GitHub Actions CI/CD telah dikonfigurasi penuh untuk melakukan proses kompilasi secara otomatis di server cloud GitHub.

### Langkah-langkah Build di GitHub Actions:

1. **Buat Repository Baru di GitHub**:
   - Buka [github.com](https://github.com) dan buat repository baru (misal: `elearning-privat`).

2. **Push Kode Proyek ke GitHub**:
   Jalankan perintah berikut di folder proyek ini:
   ```bash
   git add .
   git commit -m "feat: complete elearning privat suite with multiplatform CI/CD"
   git branch -M main
   git remote add origin https://github.com/<username-anda>/<nama-repo>.git
   git push -u origin main
   ```

3. **Proses Build Otomatis Berjalan di Cloud**:
   - Buka tab **Actions** di repository GitHub Anda.
   - Anda akan melihat workflow berikut berjalan secara otomatis:
     - 📱 `Build Android APK`: Mengompilasi `app-debug.apk` dan `app-release.apk` menggunakan runner Ubuntu + JDK 17 + Android SDK.
     - 💻 `Build Windows Application (.EXE)`: Mengompilasi file installer Windows `.exe` dan versi portable menggunakan runner Windows + Electron Builder.
     - 🌐 `Deploy to GitHub Pages`: Men-deploy web application secara live.

4. **Unduh File APK & EXE Hasil Build**:
   - Klik pada run workflow yang telah selesai di tab **Actions**.
   - Pada bagian **Artifacts** di bawah halaman, klik untuk mengunduh:
     - `PrivatGo-Android-APK-Debug` (File APK untuk diinstall di HP Android)
     - `PrivatGo-Windows-Setup` (File EXE installer untuk laptop/PC Windows)
   - Jika Anda membuat Git Tag (contoh: `git tag v1.0.0 && git push origin v1.0.0`), file `.apk` dan `.exe` akan otomatis dipublikasikan di halaman **Releases** GitHub!

---

## 📁 Struktur Direktori Proyek

```text
elearning-privat/
├── .github/
│   └── workflows/
│       ├── build-android.yml    # CI/CD otomatis compile Android APK
│       ├── build-windows.yml    # CI/CD otomatis compile Windows EXE
│       └── deploy-web.yml       # CI/CD deploy web ke GitHub Pages
├── android/                     # Konfigurasi native Android & Gradle
├── assets/
│   └── icons/
│       └── logo.svg             # Asset icon & branding
├── electron/
│   ├── main.js                  # Electron desktop main process
│   └── preload.js               # IPC bridge yang aman
├── src/
│   ├── app.js                   # Router utama & state controller
│   ├── components/
│   │   ├── Header.js            # Header dengan portal switcher
│   │   ├── Sidebar.js           # Navigasi dinamis tiap portal
│   │   └── Modal.js             # Modal kuis, tugas, jadwal, kwitansi, WA
│   ├── portals/
│   │   ├── student/             # Portal Siswa
│   │   ├── tutor/               # Portal Guru / Tutor
│   │   ├── parent/              # Portal Orang Tua
│   │   ├── admin/               # Portal Super Admin
│   │   └── billing/             # Portal Terpisah: Finance & SPP
│   ├── store/
│   │   └── dataStore.js         # Reactive store & database LocalStorage
│   └── styles/
│       └── custom.css           # Styling glassmorphism & print stylesheet
├── capacitor.config.json        # Konfigurasi Capacitor Android
├── index.html                   # Entry point aplikasi
├── manifest.json                # PWA manifest
├── package.json                 # Dependency & scripts build
├── vite.config.js               # Konfigurasi Vite bundler
└── README.md                    # Dokumentasi lengkap
```

---

<p align="center">
  Dibuat dengan ❤️ oleh <b>Muhammad Fikri Dev</b>
</p>
