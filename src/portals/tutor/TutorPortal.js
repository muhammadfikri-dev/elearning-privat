// Tutor Portal Component (PrivatGo Tutor Studio)
import { store } from '../../store/dataStore.js';
import { openCreateScheduleModal, openGradingModal } from '../../components/Modal.js';

export function renderTutorPortal(activeTab) {
  const tutor = store.data.currentUser;
  const students = store.data.users.students;
  const schedules = store.data.schedules;
  const materials = store.data.materials;
  const quizzes = store.data.quizzes;
  const assignments = store.data.assignments;
  const attendance = store.data.attendance;
  const reports = store.data.reports;

  switch (activeTab) {
    case 'materials':
      return renderTutorMaterials(materials);
    case 'schedule':
      return renderTutorSchedule(schedules);
    case 'quiz_manager':
      return renderTutorQuizManager(quizzes);
    case 'grading':
      return renderTutorGrading(assignments);
    case 'attendance':
      return renderTutorAttendance(attendance, students);
    case 'reports':
      return renderTutorReports(reports, students);
    case 'dashboard':
    default:
      return renderTutorDashboard(tutor, students, schedules, assignments);
  }
}

// 1. Tutor Dashboard
function renderTutorDashboard(tutor, students, schedules, assignments) {
  const pendingGrading = assignments.filter(a => a.status === 'submitted');

  return `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-teal-950/50 border border-emerald-500/20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="badge-tag bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs mb-2">
              👨‍🏫 Ruang Kerja Guru Privat
            </span>
            <h2 class="text-2xl font-extrabold text-white">
              Selamat Mengajar, <span class="text-emerald-400">${tutor.name}</span>! ✨
            </h2>
            <p class="text-xs text-slate-300 mt-1">
              Spesialisasi: ${tutor.specialization || 'Matematika & Fisika SMA'} • Rating: ⭐ 4.95 (142 Sesi Selesai)
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.openCreateScheduleModal()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2">
              <span>➕</span> Buat Jadwal Les Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="glass-card p-4 text-center border-l-4 border-l-emerald-500">
          <div class="text-2xl font-extrabold text-white">${students.length}</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Siswa Privat Aktif</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-indigo-500">
          <div class="text-2xl font-extrabold text-indigo-400">28 Sesi</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Sesi Bulan Ini</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-amber-500">
          <div class="text-2xl font-extrabold text-amber-400">${pendingGrading.length} Tugas</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Perlu Dinilai</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-cyan-500">
          <div class="text-2xl font-extrabold text-cyan-400">Rp 4.5jt</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Estimasi Honor Honorarium</div>
        </div>
      </div>

      <!-- Active Students Quick Grid -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>👥</span> Siswa Bimbingan Aktif Anda
          </h3>
          <span class="text-xs text-slate-400">Tersinkronisasi dengan Orang Tua</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${students.map(s => `
            <div class="glass-card p-4 space-y-3 border border-slate-700">
              <div class="flex items-center gap-3">
                <img src="${s.avatar}" class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40" />
                <div>
                  <h4 class="text-xs font-bold text-white">${s.name}</h4>
                  <p class="text-[11px] text-slate-400">${s.grade} • ${s.school}</p>
                </div>
              </div>
              <div class="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <div><strong>Program:</strong> ${s.package}</div>
                <div><strong>Sesi Les:</strong> ${s.completedSessions} Selesai</div>
              </div>
              <div class="flex gap-2">
                <button onclick="window.navigateTab('attendance')" class="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold">
                  Presensi
                </button>
                <button onclick="window.navigateTab('reports')" class="flex-1 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                  Isi Rapor
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Upcoming Sessions Table -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📹</span> Jadwal Mengajar Mendatang
          </h3>
          <button onclick="window.openCreateScheduleModal()" class="text-xs text-emerald-400 hover:underline">+ Tambah Sesi</button>
        </div>

        <div class="glass-card overflow-hidden">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th class="py-3 px-4">Siswa</th>
                <th class="py-3 px-4">Topik Materi</th>
                <th class="py-3 px-4">Waktu</th>
                <th class="py-3 px-4">Platform</th>
                <th class="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${schedules.map(sch => `
                <tr class="hover:bg-slate-800/40">
                  <td class="py-3 px-4 font-bold text-white">${sch.studentName}</td>
                  <td class="py-3 px-4 text-slate-300">${sch.title}</td>
                  <td class="py-3 px-4 text-slate-400 font-medium">${sch.date} (${sch.time})</td>
                  <td class="py-3 px-4 text-indigo-300">${sch.platform}</td>
                  <td class="py-3 px-4 text-center">
                    <a href="${sch.meetUrl}" target="_blank" class="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold no-underline inline-block">
                      Mulai Kelas
                    </a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// 2. Tutor Materials Manager
function renderTutorMaterials(materials) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📁</span> Manajemen Modul & Media Pembelajaran
          </h2>
          <p class="text-xs text-slate-400 mt-1">Unggah bahan ajar, rangkuman rumus, dan video pembahasan untuk murid</p>
        </div>

        <button onclick="window.showUploadMaterialForm()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
          <span>➕</span> Unggah Modul Baru
        </button>
      </div>

      <!-- Upload Form Container (Hidden by default, shown on button click) -->
      <div id="upload_material_box" class="glass-card p-5 border border-emerald-500/30 hidden space-y-4">
        <h3 class="text-sm font-bold text-white">Form Unggah Bahan Ajar Baru</h3>
        <form onsubmit="window.handleUploadMaterial(event)" class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-300 mb-1">Judul Modul / Video:</label>
            <input type="text" id="mat_title_input" required placeholder="Contoh: Modul 09: Matriks & Eliminasi Gauss" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Tipe Media:</label>
              <select id="mat_type_input" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                <option value="pdf">Dokumen PDF</option>
                <option value="video">Video Pembahasan</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1">Mata Pelajaran:</label>
              <select id="mat_subject_input" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                <option value="Matematika SMA">Matematika SMA</option>
                <option value="Fisika SMA">Fisika SMA</option>
                <option value="Bahasa Inggris">Bahasa Inggris (IELTS)</option>
                <option value="Coding Python">Coding Python</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-300 mb-1">Ringkasan Konsep:</label>
            <textarea id="mat_summary_input" required rows="2" placeholder="Tuliskan poin utama materi..." class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="document.getElementById('upload_material_box').classList.add('hidden')" class="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Batal</button>
            <button type="submit" class="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-md">Simpan & Publikasikan ✓</button>
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${materials.map(m => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="badge-tag ${m.type === 'pdf' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'} text-[10px]">
                ${m.type.toUpperCase()}
              </span>
              <span class="text-[11px] text-slate-400">${m.uploadDate}</span>
            </div>
            <h3 class="text-sm font-bold text-white">${m.title}</h3>
            <p class="text-xs text-slate-400">${m.summary}</p>
            <div class="pt-2 flex justify-between items-center text-xs">
              <span class="text-indigo-400 font-semibold">${m.subject}</span>
              <button onclick="alert('Modul ini aktif dan dapat diakses semua murid bimbingan Anda.')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px]">
                Kelola Akses
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.showUploadMaterialForm = () => {
  const box = document.getElementById('upload_material_box');
  if (box) box.classList.toggle('hidden');
};

window.handleUploadMaterial = (e) => {
  e.preventDefault();
  const newMat = {
    title: document.getElementById('mat_title_input').value,
    type: document.getElementById('mat_type_input').value,
    subject: document.getElementById('mat_subject_input').value,
    summary: document.getElementById('mat_summary_input').value,
    tutorName: store.data.currentUser.name || 'Kak Sarah Amalia, M.Sc',
    fileSize: '3.4 MB',
    downloadUrl: '#'
  };
  store.addMaterial(newMat);
  alert('Modul bahan ajar berhasil dipublikasikan ke siswa!');
};

// 3. Tutor Schedule Manager
function renderTutorSchedule(schedules) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📅</span> Manajemen Jadwal Les & Ketersediaan Slot
          </h2>
          <p class="text-xs text-slate-400 mt-1">Atur ketersediaan jam mengajar dan konfirmasi sesi tatap muka online</p>
        </div>
        <button onclick="window.openCreateScheduleModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
          + Tambah Sesi Les
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${schedules.map(s => `
          <div class="glass-card p-5 space-y-3 border-l-4 ${s.status === 'upcoming' ? 'border-l-emerald-500' : 'border-l-slate-600'}">
            <div class="flex items-center justify-between">
              <span class="badge-tag ${s.status === 'upcoming' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'} text-[10px]">
                ${s.status === 'upcoming' ? 'Akan Berlangsung' : 'Selesai'}
              </span>
              <span class="text-xs font-bold text-slate-300">${s.date} • ${s.time}</span>
            </div>
            <h3 class="text-base font-bold text-white">${s.title}</h3>
            <p class="text-xs text-slate-400">Murid: <strong class="text-white">${s.studentName}</strong> • ${s.subject}</p>
            <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400">
              <strong>Link Kelas:</strong> <a href="${s.meetUrl}" target="_blank" class="text-indigo-400 underline">${s.meetUrl}</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 4. Tutor Quiz Manager
function renderTutorQuizManager(quizzes) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>🎯</span> Pembuat Kuis & Bank Soal Latihan
          </h2>
          <p class="text-xs text-slate-400 mt-1">Buat kuis latihan dengan kunci jawaban dan pembahasan otomatis</p>
        </div>
      </div>

      <div class="space-y-4">
        ${quizzes.map(q => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="badge-tag bg-indigo-500/20 text-indigo-300 text-[10px]">${q.subject}</span>
              <span class="text-xs text-slate-400">${q.questions.length} Butir Soal • Batas: ${q.timeLimitMinutes} Menit</span>
            </div>
            <h3 class="text-base font-bold text-white">${q.title}</h3>
            <div class="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div class="font-bold text-slate-300">Daftar Soal Aktif:</div>
              ${q.questions.map((item, idx) => `
                <div class="bg-slate-900/60 p-2.5 rounded-lg text-slate-300">
                  <strong>${idx + 1}.</strong> ${item.question}
                  <div class="text-emerald-400 text-[11px] mt-1 font-semibold">Kunci: ${item.options[item.correctAnswerIndex]}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. Tutor Grading
function renderTutorGrading(assignments) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>✍️</span> Koreksi & Penilaian Tugas Siswa
        </h2>
        <p class="text-xs text-slate-400 mt-1">Periksa hasil latihan mandiri siswa dan berikan nilai serta feedback</p>
      </div>

      <div class="space-y-4">
        ${assignments.map(a => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <span class="badge-tag ${a.status === 'graded' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                    ${a.status === 'graded' ? 'Sudah Dinilai' : 'Perlu Dikoreksi'}
                  </span>
                  <span class="text-xs text-slate-400">Tugas: ${a.subject}</span>
                </div>
                <h3 class="text-base font-bold text-white mt-1">${a.title}</h3>
                <p class="text-xs text-slate-400 mt-0.5">Siswa: <strong class="text-white">Kevin Pratama</strong></p>
              </div>

              <div>
                <button onclick="window.openGradingModal('${a.id}')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
                  ${a.status === 'graded' ? 'Ubah Nilai / Masukan' : 'Beri Nilai & Koreksi →'}
                </button>
              </div>
            </div>

            ${a.feedback ? `
              <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                <div class="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Catatan Koreksi Anda:</span>
                  <span class="text-emerald-400 font-black">Nilai: ${a.score}/100</span>
                </div>
                <p class="text-slate-400 italic">"${a.feedback}"</p>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6. Tutor Attendance
function renderTutorAttendance(attendance, students) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📋</span> Jurnal Mengajar & Presensi Sesi
          </h2>
          <p class="text-xs text-slate-400 mt-1">Catat kehadiran murid dan rangkuman topik yang dibahas</p>
        </div>

        <button onclick="window.showLogAttendanceForm()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
          + Catat Sesi Hari Ini
        </button>
      </div>

      <!-- Quick Attendance Form -->
      <div id="log_attendance_box" class="glass-card p-5 border border-emerald-500/30 hidden space-y-4">
        <h3 class="text-sm font-bold text-white">Input Jurnal & Presensi Sesi Les</h3>
        <form onsubmit="window.handleRecordAttendance(event)" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Pilih Siswa:</label>
              <select id="att_student_name" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                ${students.map(s => `<option value="${s.name}">${s.name} (${s.grade})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1">Mata Pelajaran:</label>
              <select id="att_subject_input" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                <option value="Matematika SMA">Matematika SMA</option>
                <option value="Fisika SMA">Fisika SMA</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-300 mb-1">Topik Materi yang Dibahas:</label>
            <input type="text" id="att_topic_input" required placeholder="Contoh: Latihan 15 Soal Integral Tertentu dan Volume Benda Putar" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" onclick="document.getElementById('log_attendance_box').classList.add('hidden')" class="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Batal</button>
            <button type="submit" class="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-md">Simpan Jurnal Mengajar ✓</button>
          </div>
        </form>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
            <tr>
              <th class="py-3 px-4">Tanggal</th>
              <th class="py-3 px-4">Siswa</th>
              <th class="py-3 px-4">Topik Sesi</th>
              <th class="py-3 px-4">Mapel</th>
              <th class="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            ${attendance.map(a => `
              <tr class="hover:bg-slate-800/40">
                <td class="py-3 px-4 font-semibold text-white">${a.date}</td>
                <td class="py-3 px-4 text-indigo-300 font-bold">${a.studentName}</td>
                <td class="py-3 px-4 text-slate-300">${a.topic}</td>
                <td class="py-3 px-4 text-slate-400">${a.subject}</td>
                <td class="py-3 px-4 text-center">
                  <span class="badge-tag bg-emerald-500/20 text-emerald-300 text-[10px]">✓ Hadir Tepat Waktu</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.showLogAttendanceForm = () => {
  const box = document.getElementById('log_attendance_box');
  if (box) box.classList.toggle('hidden');
};

window.handleRecordAttendance = (e) => {
  e.preventDefault();
  const record = {
    studentName: document.getElementById('att_student_name').value,
    subject: document.getElementById('att_subject_input').value,
    topic: document.getElementById('att_topic_input').value,
    tutorName: store.data.currentUser.name || 'Kak Sarah Amalia, M.Sc',
    status: 'Hadir',
    studentPunctuality: 'Tepat Waktu',
    ratingFromTutor: 5
  };
  store.recordAttendance(record);
  alert('Jurnal mengajar dan presensi sesi berhasil disimpan!');
};

// 7. Tutor Reports
function renderTutorReports(reports, students) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📊</span> Input Rapor & Jurnal Evaluasi Siswa
        </h2>
        <p class="text-xs text-slate-400 mt-1">Laporan akademik ini dapat dilihat langsung oleh siswa dan orang tua mereka</p>
      </div>

      <div class="glass-card p-6 space-y-4 border border-emerald-500/30">
        <div class="flex items-center justify-between">
          <div class="font-bold text-sm text-white">Siswa: Kevin Pratama (12 SMA)</div>
          <span class="badge-tag bg-indigo-500/20 text-indigo-300 text-xs">Periode: Agustus 2026</span>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Catatan Evaluasi Guru untuk Orang Tua:</label>
          <textarea rows="4" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed">${reports.tutorNote}</textarea>
        </div>

        <div class="pt-2 flex justify-end">
          <button onclick="alert('Catatan evaluasi siswa berhasil diperbarui dan disinkronkan ke portal orang tua!')" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
            Simpan Rapor Siswa ✓
          </button>
        </div>
      </div>
    </div>
  `;
}
