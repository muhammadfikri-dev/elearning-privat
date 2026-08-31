// PrivatGo Data Store & State Management
// Sistem penyimpanan lokal reaktif dengan persistensi LocalStorage

const STORAGE_KEY = 'privatgo_elearning_db_v1';

// Initial Mock Database Seed
const initialData = {
  activeRole: 'student', // 'student' | 'tutor' | 'parent' | 'admin' | 'billing'
  currentUser: {
    id: 'usr_student_1',
    name: 'Kevin Pratama',
    role: 'student',
    email: 'kevin.pratama@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    grade: 'Kelas 12 SMA (Persiapan SNBT/UTBK)',
    school: 'SMA Negeri 1 Jakarta',
    phone: '0812-9876-5432',
    parentName: 'Ibu Ratna Hendrawan',
    streakDays: 14,
    xpPoints: 3450,
    level: 7,
    learningHours: 42.5
  },
  users: {
    students: [
      {
        id: 'usr_student_1',
        name: 'Kevin Pratama',
        grade: '12 SMA',
        school: 'SMAN 1 Jakarta',
        email: 'kevin.pratama@gmail.com',
        phone: '0812-9876-5432',
        parentPhone: '0811-2345-6789',
        parentId: 'usr_parent_1',
        tutorId: 'usr_tutor_1',
        tutorName: 'Kak Sarah Amalia, M.Sc',
        package: 'Paket Intensif UTBK 12 Sesi/Bulan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        streak: 14,
        xp: 3450,
        completedSessions: 18,
        activeSubject: 'Matematika & Fisika'
      },
      {
        id: 'usr_student_2',
        name: 'Syifa Nadira',
        grade: '9 SMP',
        school: 'SMP Labschool',
        email: 'syifa.nadira@gmail.com',
        phone: '0813-1122-3344',
        parentPhone: '0812-4455-6677',
        parentId: 'usr_parent_2',
        tutorId: 'usr_tutor_2',
        tutorName: 'Kak Budi Prasetyo, S.Pd',
        package: 'Paket Reguler 8 Sesi/Bulan',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        streak: 8,
        xp: 2100,
        completedSessions: 12,
        activeSubject: 'Bahasa Inggris & IPA'
      },
      {
        id: 'usr_student_3',
        name: 'Raditya Arka',
        grade: '10 SMA',
        school: 'SMA Kanisius',
        email: 'raditya.arka@gmail.com',
        phone: '0815-9988-7766',
        parentPhone: '0813-8877-6655',
        parentId: 'usr_parent_3',
        tutorId: 'usr_tutor_3',
        tutorName: 'Kak Amanda Clarissa, B.Eng',
        package: 'Paket Coding & Web Dev (8 Sesi)',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        streak: 21,
        xp: 4800,
        completedSessions: 24,
        activeSubject: 'Python & Web Development'
      }
    ],
    tutors: [
      {
        id: 'usr_tutor_1',
        name: 'Kak Sarah Amalia, M.Sc',
        specialization: 'Matematika & Fisika SMA / SNBT',
        university: 'Institut Teknologi Bandung (ITB)',
        email: 'sarah.amalia@privatgo.id',
        phone: '0812-3344-5566',
        rating: 4.95,
        totalSessions: 142,
        activeStudents: 6,
        hourlyRate: 150000,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        zoomLink: 'https://meet.google.com/abc-privat-sarah'
      },
      {
        id: 'usr_tutor_2',
        name: 'Kak Budi Prasetyo, S.Pd',
        specialization: 'Bahasa Inggris (IELTS/TOEFL) & IPA SMP',
        university: 'Universitas Indonesia (UI)',
        email: 'budi.prasetyo@privatgo.id',
        phone: '0813-7788-9900',
        rating: 4.88,
        totalSessions: 98,
        activeStudents: 5,
        hourlyRate: 140000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        zoomLink: 'https://meet.google.com/def-privat-budi'
      },
      {
        id: 'usr_tutor_3',
        name: 'Kak Amanda Clarissa, B.Eng',
        specialization: 'Coding (Python, JS, Web) & Robotika',
        university: 'Nanyang Technological University (NTU)',
        email: 'amanda.clarissa@privatgo.id',
        phone: '0818-5544-3322',
        rating: 4.98,
        totalSessions: 165,
        activeStudents: 8,
        hourlyRate: 175000,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        zoomLink: 'https://meet.google.com/ghi-privat-amanda'
      }
    ],
    parents: [
      {
        id: 'usr_parent_1',
        name: 'Ibu Ratna Hendrawan',
        childName: 'Kevin Pratama',
        childId: 'usr_student_1',
        email: 'ratna.hendrawan@gmail.com',
        phone: '0811-2345-6789',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      }
    ],
    admin: {
      id: 'usr_admin_1',
      name: 'Super Admin PrivatGo',
      email: 'admin@privatgo.id',
      phone: '0812-0000-1111',
      roleTitle: 'Head of Academic & Tutoring Operations',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    billing: {
      id: 'usr_billing_1',
      name: 'Finance & Billing Specialist',
      email: 'finance@privatgo.id',
      phone: '0812-8899-0011',
      roleTitle: 'Head of Finance & Student Billing',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    }
  },
  courses: [
    {
      id: 'crs_math_12',
      title: 'Matematika IPA & Penalaran Kuantitatif SNBT',
      category: 'SMA / SNBT',
      icon: 'calculator',
      color: 'indigo',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      tutorId: 'usr_tutor_1',
      totalModules: 14,
      completedModules: 9,
      progress: 65,
      description: 'Penguasaan konsep Kalkulus, Matriks, Peluang, Trigonometri, dan Trik Cepat Soal SNBT UTBK.'
    },
    {
      id: 'crs_phys_12',
      title: 'Fisika Intensif: Mekanika & Listrik Magnet',
      category: 'SMA / SNBT',
      icon: 'zap',
      color: 'cyan',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      tutorId: 'usr_tutor_1',
      totalModules: 10,
      completedModules: 6,
      progress: 60,
      description: 'Bedah tuntas hukum Newton, Termodinamika, Gelombang, dan Listrik Statis/Dinamis.'
    },
    {
      id: 'crs_eng_ielts',
      title: 'English Academic & IELTS Preparation',
      category: 'Bahasa Asing',
      icon: 'book-open',
      color: 'emerald',
      tutorName: 'Kak Budi Prasetyo, S.Pd',
      tutorId: 'usr_tutor_2',
      totalModules: 12,
      completedModules: 10,
      progress: 83,
      description: 'Mastering Speaking band 7.5+, Academic Writing Task 1 & 2, Listening, dan Reading Strategies.'
    },
    {
      id: 'crs_coding_py',
      title: 'Python Programming & Web Fullstack Dasar',
      category: 'Programming',
      icon: 'code',
      color: 'amber',
      tutorName: 'Kak Amanda Clarissa, B.Eng',
      tutorId: 'usr_tutor_3',
      totalModules: 16,
      completedModules: 12,
      progress: 75,
      description: 'Dasar logika algoritma, OOP, mini project aplikasi kasir, dan pengenalan REST API.'
    }
  ],
  materials: [
    {
      id: 'mat_1',
      courseId: 'crs_math_12',
      title: 'Modul 08: Integral Parsial & Substitusi Trigonometri',
      type: 'pdf',
      subject: 'Matematika SMA',
      fileSize: '4.8 MB',
      uploadDate: '28 Agu 2026',
      downloadUrl: '#',
      summary: 'Rangkuman rumus integral substitusi, teknik integral parsial UDV, dan latihan 20 soal HOTS beserta kunci jawaban.',
      tutorName: 'Kak Sarah Amalia, M.Sc'
    },
    {
      id: 'mat_2',
      courseId: 'crs_math_12',
      title: 'Video Pembahasan: Cara Cepat Matriks & Transformasi Geometri',
      type: 'video',
      subject: 'Matematika SMA',
      duration: '38 Menit',
      uploadDate: '25 Agu 2026',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      summary: 'Video rekaman sesi les privat mengenai trik eliminasi determinan 3x3 dan rotasi matriks.',
      tutorName: 'Kak Sarah Amalia, M.Sc'
    },
    {
      id: 'mat_3',
      courseId: 'crs_phys_12',
      title: 'Modul Praktis: Hukum Termodinamika & Efisiensi Mesin Carnot',
      type: 'pdf',
      subject: 'Fisika SMA',
      fileSize: '3.2 MB',
      uploadDate: '20 Agu 2026',
      downloadUrl: '#',
      summary: 'Analisis grafik P-V pada proses Isotermal, Isokhorik, Isobarik, dan siklus Carnot.',
      tutorName: 'Kak Sarah Amalia, M.Sc'
    },
    {
      id: 'mat_4',
      courseId: 'crs_coding_py',
      title: 'Cheat Sheet: Struktur Data Python (List, Dict, Tuple, Set) & OOP',
      type: 'pdf',
      subject: 'Python Programming',
      fileSize: '2.1 MB',
      uploadDate: '26 Agu 2026',
      downloadUrl: '#',
      summary: 'Panduan referensi sintaks cepat Python 3.12, list comprehension, lambda, dan contoh inheritance class.',
      tutorName: 'Kak Amanda Clarissa, B.Eng'
    }
  ],
  schedules: [
    {
      id: 'sch_1',
      title: 'Sesi Privat: Turunan & Aplikasi Maksimum Minimum',
      subject: 'Matematika SMA',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      tutorId: 'usr_tutor_1',
      studentName: 'Kevin Pratama',
      studentId: 'usr_student_1',
      date: 'Besok (02 Sep 2026)',
      time: '16:00 - 17:30 WIB',
      timestamp: '2026-09-02T16:00:00',
      duration: '90 Menit',
      platform: 'Google Meet',
      meetUrl: 'https://meet.google.com/abc-privat-sarah',
      status: 'upcoming', // 'upcoming' | 'live' | 'completed' | 'rescheduled'
      note: 'Siapkan modul halaman 45 dan PR latihan 3 soal turunan fungsi trigonometri.'
    },
    {
      id: 'sch_2',
      title: 'Sesi Privat: Listrik Dinamis & Hukum Kirchhoff II',
      subject: 'Fisika SMA',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      tutorId: 'usr_tutor_1',
      studentName: 'Kevin Pratama',
      studentId: 'usr_student_1',
      date: 'Jumat, 04 Sep 2026',
      time: '19:00 - 20:30 WIB',
      timestamp: '2026-09-04T19:00:00',
      duration: '90 Menit',
      platform: 'Zoom Online',
      meetUrl: 'https://zoom.us/j/9876543210',
      status: 'upcoming',
      note: 'Membahas soal rangkaian 2 loop dan jembatan Wheatstone.'
    },
    {
      id: 'sch_3',
      title: 'Sesi Selesai: Matriks Determinan & Invers',
      subject: 'Matematika SMA',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      tutorId: 'usr_tutor_1',
      studentName: 'Kevin Pratama',
      studentId: 'usr_student_1',
      date: 'Senin, 31 Agu 2026',
      time: '16:00 - 17:30 WIB',
      timestamp: '2026-08-31T16:00:00',
      duration: '90 Menit',
      platform: 'Google Meet',
      meetUrl: 'https://meet.google.com/abc-privat-sarah',
      status: 'completed',
      note: 'Siswa sangat aktif dan memahami materi metode Sarrus & Adjoint 3x3.'
    }
  ],
  quizzes: [
    {
      id: 'qz_1',
      courseId: 'crs_math_12',
      title: 'Kuis Evaluasi Bab: Integral Substitusi & Parsial',
      subject: 'Matematika SMA',
      timeLimitMinutes: 25,
      totalQuestions: 5,
      passScore: 75,
      highestScore: 92,
      isCompleted: false,
      myScore: null,
      questions: [
        {
          id: 'q1',
          question: 'Hasil dari ∫ 2x (x² + 5)⁴ dx adalah...',
          options: [
            'A. 1/5 (x² + 5)⁵ + C',
            'B. 1/10 (x² + 5)⁵ + C',
            'C. (x² + 5)⁵ + C',
            'D. 2/5 (x² + 5)⁵ + C'
          ],
          correctAnswerIndex: 0,
          explanation: 'Misalkan u = x² + 5, maka du = 2x dx. Maka integral menjadi ∫ u⁴ du = 1/5 u⁵ + C = 1/5(x² + 5)⁵ + C.'
        },
        {
          id: 'q2',
          question: 'Nilai dari ∫ x cos(x) dx adalah...',
          options: [
            'A. x sin(x) - cos(x) + C',
            'B. x sin(x) + cos(x) + C',
            'C. -x sin(x) + cos(x) + C',
            'D. x cos(x) - sin(x) + C'
          ],
          correctAnswerIndex: 1,
          explanation: 'Gunakan integral parsial: u = x, dv = cos(x)dx. Maka du = dx, v = sin(x). ∫ u dv = uv - ∫ v du = x sin(x) - ∫ sin(x)dx = x sin(x) + cos(x) + C.'
        },
        {
          id: 'q3',
          question: 'Jika f\'(x) = 3x² - 4x + 1 dan f(2) = 5, maka persamaan f(x) adalah...',
          options: [
            'A. f(x) = x³ - 2x² + x + 3',
            'B. f(x) = x³ - 2x² + x + 5',
            'C. f(x) = 3x³ - 2x² + x - 1',
            'D. f(x) = x³ - 4x² + x + 7'
          ],
          correctAnswerIndex: 0,
          explanation: 'f(x) = ∫ (3x² - 4x + 1) dx = x³ - 2x² + x + C. f(2) = 2³ - 2(2²) + 2 + C = 8 - 8 + 2 + C = 5 => C = 3. Jadi f(x) = x³ - 2x² + x + 3.'
        },
        {
          id: 'q4',
          question: 'Luas daerah yang dibatasi kurva y = x² dan garis y = 4 adalah...',
          options: [
            'A. 16/3 satuan luas',
            'B. 32/3 satuan luas',
            'C. 8 satuan luas',
            'D. 64/3 satuan luas'
          ],
          correctAnswerIndex: 1,
          explanation: 'Titik potong x² = 4 => x = -2 sampai x = 2. Luas = ∫_{-2}^{2} (4 - x²) dx = [4x - x³/3]_{-2}^{2} = (8 - 8/3) - (-8 + 8/3) = 16/3 - (-16/3) = 32/3.'
        },
        {
          id: 'q5',
          question: 'Nilai dari ∫₀¹ (3x² + 2x) dx adalah...',
          options: [
            'A. 1',
            'B. 2',
            'C. 3',
            'D. 4'
          ],
          correctAnswerIndex: 1,
          explanation: '[x³ + x²]₀¹ = (1³ + 1²) - 0 = 1 + 1 = 2.'
        }
      ]
    }
  ],
  assignments: [
    {
      id: 'asg_1',
      title: 'Tugas Mandiri 04: Bedah 10 Soal Matriks & Determinan Ordo 3x3',
      subject: 'Matematika SMA',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      dueDate: '03 Sep 2026, 23:59 WIB',
      status: 'submitted', // 'pending' | 'submitted' | 'graded'
      score: 95,
      submissionDate: '31 Agu 2026, 20:15 WIB',
      feedback: 'Pengerjaan sangat rapi! Pada soal nomor 7 eliminasi Gauss-Jordan kamu sangat efisien. Pertahankan ketelitian ini untuk UTBK!',
      instructions: 'Kerjakan soal di buku tulis, foto atau scan PDF, dan upload ke form tugas ini.'
    },
    {
      id: 'asg_2',
      title: 'Latihan Fisika: Analisis Rangkaian Arus Bolak-Balik (RLC)',
      subject: 'Fisika SMA',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      dueDate: '05 Sep 2026, 23:59 WIB',
      status: 'pending',
      score: null,
      submissionDate: null,
      feedback: null,
      instructions: 'Hitung impedansi total, frekuensi resonansi, dan faktor daya rangkaian dari 5 soal terlampir.'
    }
  ],
  attendance: [
    {
      id: 'att_1',
      date: '31 Agu 2026',
      time: '16:00 - 17:30',
      subject: 'Matematika SMA',
      studentName: 'Kevin Pratama',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      topic: 'Metode Matriks & Invers Sarrus',
      status: 'Hadir',
      ratingFromTutor: 5,
      studentPunctuality: 'Tepat Waktu'
    },
    {
      id: 'att_2',
      date: '28 Agu 2026',
      time: '16:00 - 17:30',
      subject: 'Matematika SMA',
      studentName: 'Kevin Pratama',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      topic: 'Vektor Dimensi Tiga & Proyeksi Ortogonal',
      status: 'Hadir',
      ratingFromTutor: 5,
      studentPunctuality: 'Tepat Waktu'
    },
    {
      id: 'att_3',
      date: '25 Agu 2026',
      time: '19:00 - 20:30',
      subject: 'Fisika SMA',
      studentName: 'Kevin Pratama',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      topic: 'Gelombang Mekanik & Efek Doppler',
      status: 'Hadir',
      ratingFromTutor: 4,
      studentPunctuality: 'Tepat Waktu'
    },
    {
      id: 'att_4',
      date: '21 Agu 2026',
      time: '16:00 - 17:30',
      subject: 'Matematika SMA',
      studentName: 'Kevin Pratama',
      tutorName: 'Kak Sarah Amalia, M.Sc',
      topic: 'Persamaan Trigonometri Tingkat Lanjut',
      status: 'Hadir',
      ratingFromTutor: 5,
      studentPunctuality: 'Tepat Waktu'
    }
  ],
  reports: {
    studentId: 'usr_student_1',
    period: 'Agustus 2026',
    overallScore: 92.4,
    attendanceRate: '100% (8/8 Sesi Selesai)',
    tutorNote: 'Kevin menunjukkan progres luar biasa dalam pemecahan soal tipe HOTS Matematika dan Fisika. Kecepatan analisis meningkat 40%. Disarankan memperbanyak latihan manajemen waktu untuk persiapan simulasi Try Out SNBT mendatang.',
    strengths: [
      'Pemahaman konsep turunan & integral sangat kuat',
      'Kemampuan analisis rumus tanpa sekadar menghafal',
      'Aktif bertanya dan kritis dalam membedah variasi soal'
    ],
    growthAreas: [
      'Perlu lebih teliti pada perhitungan aljabar pecahan bertingkat',
      'Manajemen waktu pengerjaan soal di bawah 90 detik per soal'
    ],
    topicMastery: [
      { topic: 'Kalkulus & Turunan', mastery: 95 },
      { topic: 'Integral & Luas Daerah', mastery: 90 },
      { topic: 'Matriks & Transformasi', mastery: 92 },
      { topic: 'Fisika Mekanika', mastery: 88 },
      { topic: 'Listrik & Magnet', mastery: 85 }
    ]
  },
  chatMessages: [
    {
      id: 'msg_1',
      senderId: 'usr_tutor_1',
      senderName: 'Kak Sarah Amalia, M.Sc',
      senderRole: 'tutor',
      text: 'Halo Kevin! Tugas matriks kamu sudah Kak Sarah periksa ya. Nilaimu 95, penjelasannya sudah ada di portal tugas!',
      time: 'Kemarin, 20:30'
    },
    {
      id: 'msg_2',
      senderId: 'usr_student_1',
      senderName: 'Kevin Pratama',
      senderRole: 'student',
      text: 'Wah terima kasih banyak Kak Sarah! Untuk sesi besok sore jam 16:00 kita bahas integral parsial nomor 12 ya kak?',
      time: 'Kemarin, 20:45'
    },
    {
      id: 'msg_3',
      senderId: 'usr_tutor_1',
      senderName: 'Kak Sarah Amalia, M.Sc',
      senderRole: 'tutor',
      text: 'Siap Kevin, link Google Meet sudah Kakak update di menu Jadwal. Sampai jumpa besok sore ya!',
      time: 'Kemarin, 21:00'
    }
  ],
  // APP 5: Dedicated Billing & Finance Data
  billingData: {
    stats: {
      totalRevenueMonth: 28500000,
      totalPendingInvoices: 3600000,
      totalPaidInvoices: 24900000,
      totalTutorPayouts: 14250000,
      netProfit: 14250000,
      activeSubscriptions: 18
    },
    invoices: [
      {
        id: 'INV-2026-089',
        studentId: 'usr_student_1',
        studentName: 'Kevin Pratama',
        parentName: 'Ibu Ratna Hendrawan',
        parentPhone: '0811-2345-6789',
        packageName: 'Paket Intensif SNBT UTBK (12 Sesi / Bulan)',
        subject: 'Matematika & Fisika 1-on-1',
        amount: 1800000,
        invoiceDate: '25 Agu 2026',
        dueDate: '05 Sep 2026',
        status: 'Lunas', // 'Lunas' | 'Menunggu Verifikasi' | 'Belum Bayar' | 'Jatuh Tempo'
        paymentMethod: 'BCA Virtual Account (880123987654)',
        paymentDate: '28 Agu 2026, 14:20 WIB',
        receiptNumber: 'RCP-2026-0828-01',
        proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'INV-2026-090',
        studentId: 'usr_student_2',
        studentName: 'Syifa Nadira',
        parentName: 'Ibu Linda Kusumawati',
        parentPhone: '0812-4455-6677',
        packageName: 'Paket Reguler SMP (8 Sesi / Bulan)',
        subject: 'Bahasa Inggris & IPA',
        amount: 1200000,
        invoiceDate: '28 Agu 2026',
        dueDate: '05 Sep 2026',
        status: 'Menunggu Verifikasi',
        paymentMethod: 'Transfer Manual Bank Mandiri',
        paymentDate: '31 Agu 2026, 18:45 WIB',
        receiptNumber: null,
        proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'INV-2026-091',
        studentId: 'usr_student_3',
        studentName: 'Raditya Arka',
        parentName: 'Bapak Hendra Arka',
        parentPhone: '0813-8877-6655',
        packageName: 'Paket Coding & Web Dev (8 Sesi / Bulan)',
        subject: 'Python & Web Development',
        amount: 1400000,
        invoiceDate: '30 Agu 2026',
        dueDate: '08 Sep 2026',
        status: 'Belum Bayar',
        paymentMethod: 'Transfer Bank Mandiri / QRIS',
        paymentDate: null,
        receiptNumber: null,
        proofImage: null
      }
    ],
    tutorPayouts: [
      {
        id: 'PAY-TUTOR-01',
        tutorId: 'usr_tutor_1',
        tutorName: 'Kak Sarah Amalia, M.Sc',
        bankAccount: 'BCA 5420987112 a.n Sarah Amalia',
        completedSessionsThisMonth: 28,
        ratePerSession: 150000,
        bonusIncentive: 300000,
        totalPayout: 4500000,
        period: 'Agustus 2026',
        status: 'Sudah Ditransfer', // 'Sudah Ditransfer' | 'Siap Dicairkan' | 'Sedang Diproses'
        transferDate: '01 Sep 2026, 09:00 WIB'
      },
      {
        id: 'PAY-TUTOR-02',
        tutorId: 'usr_tutor_2',
        tutorName: 'Kak Budi Prasetyo, S.Pd',
        bankAccount: 'Bank Mandiri 1370019283741 a.n Budi Prasetyo',
        completedSessionsThisMonth: 22,
        ratePerSession: 140000,
        bonusIncentive: 200000,
        totalPayout: 3280000,
        period: 'Agustus 2026',
        status: 'Sudah Ditransfer',
        transferDate: '01 Sep 2026, 09:15 WIB'
      },
      {
        id: 'PAY-TUTOR-03',
        tutorId: 'usr_tutor_3',
        tutorName: 'Kak Amanda Clarissa, B.Eng',
        bankAccount: 'BCA 7710928374 a.n Amanda Clarissa',
        completedSessionsThisMonth: 32,
        ratePerSession: 175000,
        bonusIncentive: 500000,
        totalPayout: 6100000,
        period: 'Agustus 2026',
        status: 'Siap Dicairkan',
        transferDate: null
      }
    ]
  }
};

class DataStore {
  constructor() {
    this.data = this.loadData();
    this.listeners = [];
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Gagal membaca dari LocalStorage, menggunakan seed default:', e);
    }
    return JSON.parse(JSON.stringify(initialData));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Gagal menyimpan ke LocalStorage:', e);
    }
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try {
        fn(this.data);
      } catch (err) {
        console.error('Error on listener:', err);
      }
    });
  }

  // Active Role Switcher
  setRole(role) {
    this.data.activeRole = role;
    if (role === 'student') {
      this.data.currentUser = { ...this.data.users.students[0], role: 'student', xpPoints: this.data.users.students[0].xp || 3450, level: 7, streakDays: 14, learningHours: 42.5 };
    } else if (role === 'tutor') {
      this.data.currentUser = { ...this.data.users.tutors[0], role: 'tutor' };
    } else if (role === 'parent') {
      this.data.currentUser = { ...this.data.users.parents[0], role: 'parent' };
    } else if (role === 'admin') {
      this.data.currentUser = { ...this.data.users.admin, role: 'admin' };
    } else if (role === 'billing') {
      this.data.currentUser = { ...this.data.users.billing, role: 'billing' };
    }
    this.saveData();
  }

  // Schedules
  addSchedule(schedule) {
    const newSch = {
      id: 'sch_' + Date.now(),
      ...schedule,
      status: schedule.status || 'upcoming'
    };
    this.data.schedules.unshift(newSch);
    this.saveData();
    return newSch;
  }

  updateScheduleStatus(id, status) {
    const sch = this.data.schedules.find(s => s.id === id);
    if (sch) {
      sch.status = status;
      this.saveData();
    }
  }

  // Materials
  addMaterial(material) {
    const newMat = {
      id: 'mat_' + Date.now(),
      uploadDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...material
    };
    this.data.materials.unshift(newMat);
    this.saveData();
    return newMat;
  }

  // Quizzes
  submitQuizScore(quizId, score, answers) {
    const quiz = this.data.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.isCompleted = true;
      quiz.myScore = score;
      if (score > (quiz.highestScore || 0)) {
        quiz.highestScore = score;
      }
      // Award XP
      if (this.data.currentUser && this.data.currentUser.role === 'student') {
        this.data.currentUser.xpPoints = (this.data.currentUser.xpPoints || 3000) + score * 5;
      }
      this.saveData();
    }
  }

  // Assignments
  submitAssignment(assignmentId, notes) {
    const asg = this.data.assignments.find(a => a.id === assignmentId);
    if (asg) {
      asg.status = 'submitted';
      asg.submissionDate = new Date().toLocaleString('id-ID');
      asg.studentNotes = notes;
      this.saveData();
    }
  }

  gradeAssignment(assignmentId, score, feedback) {
    const asg = this.data.assignments.find(a => a.id === assignmentId);
    if (asg) {
      asg.status = 'graded';
      asg.score = score;
      asg.feedback = feedback;
      this.saveData();
    }
  }

  // Attendance
  recordAttendance(record) {
    const newAtt = {
      id: 'att_' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      ...record
    };
    this.data.attendance.unshift(newAtt);
    this.saveData();
    return newAtt;
  }

  // Chat
  sendMessage(text) {
    const msg = {
      id: 'msg_' + Date.now(),
      senderId: this.data.currentUser.id,
      senderName: this.data.currentUser.name,
      senderRole: this.data.activeRole,
      text: text,
      time: 'Baru saja'
    };
    this.data.chatMessages.push(msg);
    this.saveData();
    return msg;
  }

  // APP 5: Billing & Invoices
  createInvoice(invoice) {
    const newInv = {
      id: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
      invoiceDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Belum Bayar',
      receiptNumber: null,
      ...invoice
    };
    this.data.billingData.invoices.unshift(newInv);
    this.data.billingData.stats.totalPendingInvoices += Number(invoice.amount || 0);
    this.saveData();
    return newInv;
  }

  verifyPayment(invoiceId, isApproved) {
    const inv = this.data.billingData.invoices.find(i => i.id === invoiceId);
    if (inv) {
      if (isApproved) {
        inv.status = 'Lunas';
        inv.receiptNumber = 'RCP-' + Date.now().toString().slice(-8);
        inv.paymentDate = new Date().toLocaleString('id-ID');
        this.data.billingData.stats.totalPaidInvoices += Number(inv.amount || 0);
        this.data.billingData.stats.totalPendingInvoices = Math.max(0, this.data.billingData.stats.totalPendingInvoices - Number(inv.amount || 0));
        this.data.billingData.stats.totalRevenueMonth += Number(inv.amount || 0);
      } else {
        inv.status = 'Belum Bayar';
        inv.proofImage = null;
      }
      this.saveData();
    }
  }

  uploadPaymentProof(invoiceId, proofUrl) {
    const inv = this.data.billingData.invoices.find(i => i.id === invoiceId);
    if (inv) {
      inv.proofImage = proofUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80';
      inv.status = 'Menunggu Verifikasi';
      this.saveData();
    }
  }

  processTutorPayout(payoutId) {
    const pay = this.data.billingData.tutorPayouts.find(p => p.id === payoutId);
    if (pay) {
      pay.status = 'Sudah Ditransfer';
      pay.transferDate = new Date().toLocaleString('id-ID');
      this.saveData();
    }
  }

  resetAllData() {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.saveData();
  }
}

export const store = new DataStore();
