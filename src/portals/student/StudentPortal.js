// Student Portal Component (PrivatGo Student App)
import { store } from '../../store/dataStore.js';
import { openQuizRunner, openMaterialViewer, openAssignmentSubmission } from '../../components/Modal.js';

export function renderStudentPortal(activeTab) {
  const user = store.data.currentUser;
  const courses = store.data.courses;
  const materials = store.data.materials;
  const schedules = store.data.schedules;
  const quizzes = store.data.quizzes;
  const assignments = store.data.assignments;
  const attendance = store.data.attendance;
  const reports = store.data.reports;
  const messages = store.data.chatMessages;

  switch (activeTab) {
    case 'materials':
      return renderStudentMaterials(materials, courses);
    case 'schedule':
      return renderStudentSchedule(schedules);
    case 'quiz':
      return renderStudentQuiz(quizzes);
    case 'assignments':
      return renderStudentAssignments(assignments);
    case 'attendance':
      return renderStudentAttendance(attendance);
    case 'report':
      return renderStudentReport(reports);
    case 'chat':
      return renderStudentChat(messages);
    case 'dashboard':
    default:
      return renderStudentDashboard(user, schedules, courses, quizzes, assignments);
  }
}

// 1. Student Dashboard
function renderStudentDashboard(user, schedules, courses, quizzes, assignments) {
  const upcomingSession = schedules.find(s => s.status === 'upcoming') || schedules[0];
  const pendingAssignment = assignments.find(a => a.status === 'pending');
  const activeQuiz = quizzes[0];

  return `
    <div class="space-y-6">
      <!-- Hero Welcome & Gamification Banner -->
      <div class="glass-card p-6 md:p-8 bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-purple-900/50 border border-indigo-500/20 relative overflow-hidden">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <span>🚀</span> Level ${user.level || 7} Scholar • ${user.xpPoints || 3450} XP
            </div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white">
              Semangat Belajar, <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">${user.name}</span>! 👋
            </h2>
            <p class="text-sm text-slate-300 mt-2 max-w-xl">
              Target SNBT UTBK 2027 tinggal beberapa bulan lagi. Tingkatkan pemahaman materi matematika & fisika hari ini!
            </p>
          </div>

          <!-- XP & Streak Quick Box -->
          <div class="flex items-center gap-3">
            <div class="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl text-center min-w-[120px]">
              <div class="text-2xl">🔥</div>
              <div class="text-lg font-black text-amber-400 mt-1">${user.streakDays || 14} Hari</div>
              <div class="text-[10px] text-slate-400 uppercase font-bold">Streak Belajar</div>
            </div>
            <div class="bg-slate-900/80 border border-indigo-500/30 p-4 rounded-2xl text-center min-w-[120px]">
              <div class="text-2xl">⏱️</div>
              <div class="text-lg font-black text-indigo-400 mt-1">${user.learningHours || 42.5} Jam</div>
              <div class="text-[10px] text-slate-400 uppercase font-bold">Total Les Privat</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Session Spotlight (Google Meet / Zoom Integration) -->
      ${upcomingSession ? `
        <div class="glass-card p-6 border-l-4 border-l-indigo-500 bg-slate-900/90">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl flex-shrink-0 text-indigo-400">
                🎥
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-tag bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px]">
                    Sesi Les Terdekat
                  </span>
                  <span class="text-xs text-slate-400">${upcomingSession.date} • ${upcomingSession.time}</span>
                </div>
                <h3 class="text-base md:text-lg font-bold text-white mt-1">${upcomingSession.title}</h3>
                <p class="text-xs text-slate-400 mt-0.5">Tutor: <strong class="text-indigo-300">${upcomingSession.tutorName}</strong> • Platform: <strong class="text-cyan-300">${upcomingSession.platform}</strong></p>
                <p class="text-xs text-slate-400 mt-1 italic">"${upcomingSession.note}"</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <a href="${upcomingSession.meetUrl}" target="_blank" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all no-underline">
                <span class="text-sm">📹</span> Masuk Ruang Les Online
              </a>
              <button onclick="alert('Permintaan reschedule telah dikirim ke ${upcomingSession.tutorName}. Kak Sarah akan mengonfirmasi jadwal pengganti.')" class="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700">
                Minta Reschedule
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3 Key Action Cards: Materi, Kuis, Tugas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Card 1: Kuis Interaktif -->
        <div class="glass-card p-5 space-y-3 border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="badge-tag bg-purple-500/20 text-purple-300 text-[10px]">Kuis Siap Dikerjakan</span>
            <span class="text-xs font-bold text-purple-400">⏱️ ${activeQuiz.timeLimitMinutes} Menit</span>
          </div>
          <h4 class="text-sm font-bold text-white">${activeQuiz.title}</h4>
          <p class="text-xs text-slate-400">Uji kemampuan integral kamu sebelum sesi les besok bersama Kak Sarah.</p>
          <div class="pt-2">
            <button onclick="window.openQuizRunner('${activeQuiz.id}')" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2">
              <span>✍️</span> Mulai Kuis Interaktif
            </button>
          </div>
        </div>

        <!-- Card 2: Tugas Mandiri -->
        <div class="glass-card p-5 space-y-3 border border-amber-500/20 hover:border-amber-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="badge-tag bg-amber-500/20 text-amber-300 text-[10px]">Tugas Rumah</span>
            <span class="text-xs text-slate-400">Deadline: 03 Sep</span>
          </div>
          <h4 class="text-sm font-bold text-white">${pendingAssignment ? pendingAssignment.title : 'Tugas Mandiri Fisika'}</h4>
          <p class="text-xs text-slate-400">Kerjakan 5 soal rangkaian RLC arus bolak-balik.</p>
          <div class="pt-2">
            <button onclick="window.openAssignmentSubmission('${pendingAssignment ? pendingAssignment.id : 'asg_2'}')" class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center justify-center gap-2">
              <span>📤</span> Kumpulkan Jawaban Tugas
            </button>
          </div>
        </div>

        <!-- Card 3: Rapor Evaluasi Bulanan -->
        <div class="glass-card p-5 space-y-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="badge-tag bg-emerald-500/20 text-emerald-300 text-[10px]">Rapor Agustus 2026</span>
            <span class="text-xs font-bold text-emerald-400">Nilai: 92.4 (A)</span>
          </div>
          <h4 class="text-sm font-bold text-white">Evaluasi & Catatan Kak Sarah</h4>
          <p class="text-xs text-slate-400">"Kevin menunjukkan progres luar biasa dalam tipe soal HOTS Matematika."</p>
          <div class="pt-2">
            <button onclick="window.navigateTab('report')" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2">
              <span>📊</span> Lihat Rapor Lengkap
            </button>
          </div>
        </div>
      </div>

      <!-- Courses List -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span>📚</span> Mata Pelajaran & Program Les Kamu
          </h3>
          <button onclick="window.navigateTab('materials')" class="text-xs text-indigo-400 hover:underline">Lihat Semua Modul →</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${courses.map(c => `
            <div class="glass-card p-5 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">${c.category}</span>
                  <h4 class="text-sm font-bold text-white mt-0.5">${c.title}</h4>
                  <p class="text-xs text-slate-400 mt-1">Tutor: ${c.tutorName}</p>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-indigo-400">${c.progress}%</span>
                </div>
              </div>

              <div>
                <div class="w-full bg-slate-800 rounded-full h-1.5">
                  <div class="bg-indigo-500 h-1.5 rounded-full" style="width: ${c.progress}%"></div>
                </div>
                <div class="flex justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>${c.completedModules} dari ${c.totalModules} Modul Selesai</span>
                  <span>Target: 100%</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 2. Student Materials
function renderStudentMaterials(materials, courses) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📖</span> Bank Modul & Video Pembelajaran
          </h2>
          <p class="text-xs text-slate-400 mt-1">Akses semua modul PDF, rumus praktis, dan rekaman video pembahasan sesi les</p>
        </div>

        <!-- Filter Mapel -->
        <div class="flex gap-2">
          <button class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold">Semua</button>
          <button class="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">Matematika</button>
          <button class="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">Fisika</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${materials.map(m => `
          <div class="glass-card p-5 space-y-4 border border-slate-700/60 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${m.type === 'pdf' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'} text-[10px] border">
                  ${m.type === 'pdf' ? '📄 Modul PDF' : '🎥 Video Pembahasan'}
                </span>
                <span class="text-[11px] text-slate-400">${m.uploadDate}</span>
              </div>
              <h3 class="text-sm font-bold text-white">${m.title}</h3>
              <p class="text-xs text-slate-400 leading-relaxed">${m.summary}</p>
              <div class="text-[11px] text-indigo-400 font-medium">Tutor: ${m.tutorName} • ${m.subject}</div>
            </div>

            <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 font-mono">${m.fileSize || m.duration}</span>
              <button onclick="window.openMaterialViewer('${m.id}')" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5">
                ${m.type === 'pdf' ? 'Buka Dokumen PDF →' : 'Tonton Video →'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. Student Schedule
function renderStudentSchedule(schedules) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📅</span> Jadwal Sesi Les Privat 1-on-1
          </h2>
          <p class="text-xs text-slate-400 mt-1">Jadwal tatap muka online dengan guru privat kamu</p>
        </div>
      </div>

      <div class="space-y-4">
        ${schedules.map(s => {
          const isUpcoming = s.status === 'upcoming';
          return `
            <div class="glass-card p-5 border-l-4 ${isUpcoming ? 'border-l-indigo-500' : 'border-l-slate-600'} space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge-tag ${isUpcoming ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-700 text-slate-400'} text-[10px] border">
                      ${isUpcoming ? 'Akan Datang' : 'Sesi Selesai'}
                    </span>
                    <span class="text-xs font-bold text-slate-300">${s.date} • ${s.time}</span>
                  </div>
                  <h3 class="text-base font-bold text-white mt-1">${s.title}</h3>
                  <p class="text-xs text-slate-400 mt-0.5">Tutor: <strong class="text-indigo-300">${s.tutorName}</strong> • ${s.subject}</p>
                </div>

                <div class="flex items-center gap-2">
                  ${isUpcoming ? `
                    <a href="${s.meetUrl}" target="_blank" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 no-underline flex items-center gap-1.5">
                      <span>📹</span> Buka Room Les
                    </a>
                  ` : `
                    <span class="text-xs text-emerald-400 font-semibold">✓ Sesi Selesai (90 Menit)</span>
                  `}
                </div>
              </div>

              <div class="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <strong class="text-slate-300">Catatan Tutor:</strong> "${s.note}"
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// 4. Student Quiz
function renderStudentQuiz(quizzes) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>🎯</span> Kuis & Latihan Soal Interaktif
        </h2>
        <p class="text-xs text-slate-400 mt-1">Uji pemahaman topik dengan kuis otomatis berpengatur waktu dan pembahasan langsung</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${quizzes.map(q => `
          <div class="glass-card p-6 space-y-4 border border-indigo-500/20">
            <div class="flex items-center justify-between">
              <span class="badge-tag bg-indigo-500/20 text-indigo-300 text-[10px] border border-indigo-500/30">${q.subject}</span>
              <span class="text-xs font-mono font-bold text-amber-400">⏱️ ${q.timeLimitMinutes} Menit</span>
            </div>

            <div>
              <h3 class="text-base font-bold text-white">${q.title}</h3>
              <p class="text-xs text-slate-400 mt-1">Terdiri dari ${q.questions.length} soal pilihan ganda tipe pemahaman konsep & HOTS SNBT.</p>
            </div>

            <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span class="text-slate-400">Standar Kelulusan:</span>
                <div class="font-bold text-white">${q.passScore} Poin</div>
              </div>
              <div>
                <span class="text-slate-400">Nilai Tertinggi:</span>
                <div class="font-bold text-emerald-400">${q.myScore ? q.myScore + ' (Selesai)' : q.highestScore + ' (Target)'}</div>
              </div>
            </div>

            <button onclick="window.openQuizRunner('${q.id}')" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
              <span>✍️</span> ${q.isCompleted ? 'Kerjakan Ulang Kuis' : 'Mulai Kuis Sekarang'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. Student Assignments
function renderStudentAssignments(assignments) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📝</span> Tugas Mandiri & Latihan Soal
        </h2>
        <p class="text-xs text-slate-400 mt-1">Kumpulkan tugas kamu dan dapatkan koreksi detail serta masukan dari guru privat</p>
      </div>

      <div class="space-y-4">
        ${assignments.map(a => {
          const isGraded = a.status === 'graded';
          const isSubmitted = a.status === 'submitted';
          return `
            <div class="glass-card p-5 space-y-3 border border-slate-700/60">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge-tag ${
                      isGraded ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                      isSubmitted ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    } text-[10px] border">
                      ${isGraded ? '✓ Sudah Dinilai' : isSubmitted ? '⏳ Menunggu Koreksi Guru' : '⚠️ Perlu Dikerjakan'}
                    </span>
                    <span class="text-xs text-slate-400">Batas Waktu: ${a.dueDate}</span>
                  </div>
                  <h3 class="text-base font-bold text-white mt-1">${a.title}</h3>
                  <p class="text-xs text-slate-400 mt-0.5">Tutor: <strong class="text-indigo-300">${a.tutorName}</strong> • ${a.subject}</p>
                </div>

                <div>
                  ${isGraded ? `
                    <div class="text-right">
                      <div class="text-xs text-slate-400">Nilai Kamu:</div>
                      <div class="text-2xl font-black text-emerald-400">${a.score}/100</div>
                    </div>
                  ` : `
                    <button onclick="window.openAssignmentSubmission('${a.id}')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5">
                      <span>📤</span> ${isSubmitted ? 'Kirim Ulang Tugas' : 'Kumpulkan Tugas'}
                    </button>
                  `}
                </div>
              </div>

              ${a.feedback ? `
                <div class="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl text-xs space-y-1">
                  <div class="font-bold text-emerald-300">Koreksi & Masukan dari Kak Sarah:</div>
                  <p class="text-slate-200 leading-relaxed italic">"${a.feedback}"</p>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// 6. Student Attendance
function renderStudentAttendance(attendance) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📋</span> Presensi & Absensi Kehadiran Les
          </h2>
          <p class="text-xs text-slate-400 mt-1">Catatan transparansi kehadiran dan topik pembelajaran setiap sesi</p>
        </div>

        <div class="bg-slate-900/80 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-3">
          <span class="text-2xl">🎯</span>
          <div>
            <div class="text-xs font-bold text-white">Tingkat Kehadiran: 100%</div>
            <div class="text-[10px] text-emerald-400 font-semibold">Semua sesi diikuti tepat waktu</div>
          </div>
        </div>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-800/80 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
            <tr>
              <th class="py-3 px-4">Tanggal & Waktu</th>
              <th class="py-3 px-4">Mata Pelajaran</th>
              <th class="py-3 px-4">Topik Materi yang Dibahas</th>
              <th class="py-3 px-4">Tutor</th>
              <th class="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            ${attendance.map(a => `
              <tr class="hover:bg-slate-800/40">
                <td class="py-3 px-4 font-semibold text-white">${a.date}<br><span class="text-[11px] text-slate-400">${a.time}</span></td>
                <td class="py-3 px-4 text-slate-300">${a.subject}</td>
                <td class="py-3 px-4 text-slate-200 font-medium">${a.topic}</td>
                <td class="py-3 px-4 text-indigo-300 font-medium">${a.tutorName}</td>
                <td class="py-3 px-4 text-center">
                  <span class="badge-tag bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                    ✓ ${a.status} (${a.studentPunctuality})
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 7. Student Report
function renderStudentReport(reports) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📊</span> Rapor Evaluasi & Perkembangan Siswa
          </h2>
          <p class="text-xs text-slate-400 mt-1">Laporan akademik komprehensif periode ${reports.period}</p>
        </div>
        <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
          🖨️ Cetak Rapor
        </button>
      </div>

      <!-- Score Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="glass-card p-5 text-center bg-indigo-950/30 border border-indigo-500/30">
          <div class="text-xs text-slate-400 uppercase font-bold">Rata-Rata Nilai Keseluruhan</div>
          <div class="text-3xl font-extrabold text-indigo-400 mt-1">${reports.overallScore} / 100</div>
          <div class="text-xs text-emerald-400 font-semibold mt-1">Predikat: Sangat Memuaskan (A)</div>
        </div>
        <div class="glass-card p-5 text-center bg-emerald-950/30 border border-emerald-500/30">
          <div class="text-xs text-slate-400 uppercase font-bold">Kehadiran Les Privat</div>
          <div class="text-3xl font-extrabold text-emerald-400 mt-1">${reports.attendanceRate}</div>
          <div class="text-xs text-slate-400 mt-1">Kedisiplinan sangat baik</div>
        </div>
        <div class="glass-card p-5 text-center bg-purple-950/30 border border-purple-500/30">
          <div class="text-xs text-slate-400 uppercase font-bold">Target Belajar</div>
          <div class="text-3xl font-extrabold text-purple-400 mt-1">SNBT 720+</div>
          <div class="text-xs text-slate-400 mt-1">Peluang Lolos: 88%</div>
        </div>
      </div>

      <!-- Topic Mastery Breakdown -->
      <div class="glass-card p-6 space-y-4">
        <h3 class="text-sm font-bold text-white">Tingkat Penguasaan Konsep per Bab:</h3>
        <div class="space-y-3">
          ${reports.topicMastery.map(t => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-200">${t.topic}</span>
                <span class="text-indigo-400">${t.mastery}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full" style="width: ${t.mastery}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tutor Note & Evaluation -->
      <div class="glass-card p-6 space-y-3 bg-slate-900/90 border-l-4 border-l-indigo-500">
        <div class="font-bold text-sm text-white flex items-center gap-2">
          <span>👩‍🏫</span> Catatan Resmi Guru Privat (Kak Sarah Amalia, M.Sc):
        </div>
        <p class="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          "${reports.tutorNote}"
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div class="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl space-y-1.5">
            <div class="font-bold text-emerald-300">Kekuatan & Keunggulan Siswa:</div>
            <ul class="list-disc list-inside text-slate-300 space-y-1">
              ${reports.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <div class="bg-amber-950/30 border border-amber-800/40 p-3.5 rounded-xl space-y-1.5">
            <div class="font-bold text-amber-300">Area Fokus Peningkatan:</div>
            <ul class="list-disc list-inside text-slate-300 space-y-1">
              ${reports.growthAreas.map(g => `<li>${g}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 8. Student Chat with Tutor
function renderStudentChat(messages) {
  return `
    <div class="glass-card flex flex-col h-[600px] overflow-hidden border border-slate-700/80">
      <!-- Chat Header -->
      <div class="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                 class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50" />
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white">Kak Sarah Amalia, M.Sc</h3>
            <p class="text-[11px] text-emerald-400">Online • Tutor Matematika & Fisika</p>
          </div>
        </div>
        <div class="flex gap-2">
          <a href="https://meet.google.com/abc-privat-sarah" target="_blank" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold no-underline flex items-center gap-1">
            📹 Buka Meet
          </a>
        </div>
      </div>

      <!-- Messages Stream -->
      <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
        ${messages.map(m => {
          const isMe = m.senderRole === 'student';
          return `
            <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
              <div class="flex items-center gap-1 text-[10px] text-slate-400 mb-1 px-1">
                <span>${m.senderName}</span> • <span>${m.time}</span>
              </div>
              <div class="max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                isMe
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
              }">
                ${m.text}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Chat Input -->
      <form onsubmit="window.handleSendChatMessage(event)" class="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input type="text" id="chat-input-text" required placeholder="Tanyakan soal sulit atau konfirmasi les..." 
               class="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
        <button type="submit" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1">
          <span>Kirim</span> ✈️
        </button>
      </form>
    </div>
  `;
}

window.handleSendChatMessage = (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input-text');
  const text = input.value.trim();
  if (!text) return;
  store.sendMessage(text);
  input.value = '';
};
