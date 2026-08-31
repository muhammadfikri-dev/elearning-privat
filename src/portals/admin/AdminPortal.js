// Super Admin Portal Component (PrivatGo Master Admin)
import { store } from '../../store/dataStore.js';

export function renderAdminPortal(activeTab) {
  const students = store.data.users.students;
  const tutors = store.data.users.tutors;
  const courses = store.data.courses;
  const schedules = store.data.schedules;

  switch (activeTab) {
    case 'students':
      return renderAdminStudents(students);
    case 'tutors':
      return renderAdminTutors(tutors);
    case 'courses':
      return renderAdminCourses(courses);
    case 'sessions':
      return renderAdminSessions(schedules);
    case 'logs':
      return renderAdminLogs();
    case 'dashboard':
    default:
      return renderAdminDashboard(students, tutors, schedules, courses);
  }
}

// 1. Admin Dashboard
function renderAdminDashboard(students, tutors, schedules, courses) {
  return `
    <div class="space-y-6">
      <div class="glass-card p-6 bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-indigo-950/50 border border-purple-500/20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="badge-tag bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs mb-2">
              ⚡ Super Admin Control Center
            </span>
            <h2 class="text-2xl font-extrabold text-white">
              Pusat Kendali Lembaga Les Privat
            </h2>
            <p class="text-xs text-slate-300 mt-1">
              Monitoring operasional akademik, alokasi tutor, data siswa, dan mutu bimbingan belajar
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.navigateTab('students')" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md">
              + Tambah Siswa Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="glass-card p-4 text-center border-l-4 border-l-purple-500">
          <div class="text-2xl font-extrabold text-white">18</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Total Siswa Terdaftar</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-emerald-500">
          <div class="text-2xl font-extrabold text-emerald-400">3 Guru</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Tutor Berpengalaman</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-indigo-500">
          <div class="text-2xl font-extrabold text-indigo-400">78 Sesi</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Sesi Les Bulan Ini</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-amber-500">
          <div class="text-2xl font-extrabold text-amber-400">⭐ 4.94</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Indeks Kepuasan Siswa</div>
        </div>
      </div>

      <!-- Master Students Table -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>👥</span> Manajemen Siswa Aktif
          </h3>
          <button onclick="window.navigateTab('students')" class="text-xs text-purple-400 hover:underline">Kelola Data Siswa →</button>
        </div>

        <div class="glass-card overflow-hidden">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th class="py-3 px-4">Nama Siswa</th>
                <th class="py-3 px-4">Tingkat Kelas</th>
                <th class="py-3 px-4">Paket Belajar</th>
                <th class="py-3 px-4">Tutor Pembimbing</th>
                <th class="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${students.map(s => `
                <tr class="hover:bg-slate-800/40">
                  <td class="py-3 px-4 font-bold text-white">${s.name}</td>
                  <td class="py-3 px-4 text-slate-300">${s.grade} (${s.school})</td>
                  <td class="py-3 px-4 text-indigo-300 font-medium">${s.package}</td>
                  <td class="py-3 px-4 text-emerald-400 font-medium">${s.tutorName}</td>
                  <td class="py-3 px-4 text-center">
                    <span class="badge-tag bg-emerald-500/20 text-emerald-300 text-[10px]">Aktif</span>
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

// 2. Admin Students
function renderAdminStudents(students) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>👥</span> Master Data Siswa Privat
          </h2>
          <p class="text-xs text-slate-400 mt-1">Daftar murid, kontak orang tua, dan paket langganan</p>
        </div>
        <button onclick="alert('Form pendaftaran murid baru terbuka.')" class="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md">
          + Daftarkan Murid Baru
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${students.map(s => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center gap-3">
              <img src="${s.avatar}" class="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40" />
              <div>
                <h3 class="text-sm font-bold text-white">${s.name}</h3>
                <p class="text-xs text-slate-400">${s.grade} • ${s.school}</p>
              </div>
            </div>
            <div class="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <div><strong>Email:</strong> ${s.email}</div>
              <div><strong>No HP Siswa:</strong> ${s.phone}</div>
              <div><strong>No HP Ortu:</strong> ${s.parentPhone}</div>
              <div><strong>Tutor:</strong> <span class="text-emerald-400 font-semibold">${s.tutorName}</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. Admin Tutors
function renderAdminTutors(tutors) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>👨‍🏫</span> Data Pengajar & Guru Privat
          </h2>
          <p class="text-xs text-slate-400 mt-1">Daftar tutor aktif, kualifikasi, dan rating mengajar</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        ${tutors.map(t => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center gap-3">
              <img src="${t.avatar}" class="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/40" />
              <div>
                <h3 class="text-sm font-bold text-white">${t.name}</h3>
                <p class="text-xs text-slate-400">${t.university}</p>
              </div>
            </div>
            <div class="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div><strong>Spesialisasi:</strong> ${t.specialization}</div>
              <div><strong>Rating:</strong> <span class="text-amber-400 font-bold">⭐ ${t.rating} / 5.0</span></div>
              <div><strong>Total Jam Les:</strong> ${t.totalSessions} Sesi</div>
              <div><strong>Tarif per Sesi:</strong> <span class="text-emerald-400 font-semibold">Rp ${t.hourlyRate.toLocaleString('id-ID')}</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 4. Admin Courses
function renderAdminCourses(courses) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📚</span> Program Pembelajaran & Kurikulum
        </h2>
        <p class="text-xs text-slate-400 mt-1">Daftar mata pelajaran les privat yang tersedia</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${courses.map(c => `
          <div class="glass-card p-5 space-y-2 border border-slate-700">
            <span class="badge-tag bg-purple-500/20 text-purple-300 text-[10px]">${c.category}</span>
            <h3 class="text-base font-bold text-white">${c.title}</h3>
            <p class="text-xs text-slate-400">${c.description}</p>
            <div class="text-xs text-indigo-400 font-medium pt-2">Tutor Koordinator: ${c.tutorName}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. Admin Sessions
function renderAdminSessions(schedules) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📅</span> Matriks Jadwal Sesi Les Se-Lembaga
        </h2>
        <p class="text-xs text-slate-400 mt-1">Monitoring seluruh sesi tatap muka online yang sedang dan akan berjalan</p>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full text-xs text-left">
          <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
            <tr>
              <th class="py-3 px-4">Waktu</th>
              <th class="py-3 px-4">Siswa</th>
              <th class="py-3 px-4">Tutor</th>
              <th class="py-3 px-4">Mata Pelajaran & Topik</th>
              <th class="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            ${schedules.map(s => `
              <tr class="hover:bg-slate-800/40">
                <td class="py-3 px-4 font-semibold text-white">${s.date}<br><span class="text-[11px] text-slate-400">${s.time}</span></td>
                <td class="py-3 px-4 text-indigo-300 font-bold">${s.studentName}</td>
                <td class="py-3 px-4 text-emerald-400 font-medium">${s.tutorName}</td>
                <td class="py-3 px-4 text-slate-200">${s.title} (${s.subject})</td>
                <td class="py-3 px-4 text-center">
                  <span class="badge-tag ${s.status === 'upcoming' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700 text-slate-400'} text-[10px]">
                    ${s.status === 'upcoming' ? 'Akan Berlangsung' : 'Selesai'}
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

// 6. Admin Logs
function renderAdminLogs() {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>🛡️</span> Audit Log & Laporan Sistem
        </h2>
        <p class="text-xs text-slate-400 mt-1">Riwayat aktivitas keamanan dan sinkronisasi data aplikasi</p>
      </div>

      <div class="glass-card p-6 space-y-3 font-mono text-xs text-slate-300 bg-slate-950/80">
        <div class="text-emerald-400">[INFO] Sistem PrivatGo siap deploy: Android APK & Windows EXE via GitHub Actions CI/CD</div>
        <div class="text-slate-400">[2026-09-01 01:30:12] Sesi les Matematika Siswa Kevin Pratama tersinkronisasi.</div>
        <div class="text-slate-400">[2026-09-01 01:25:40] Tagihan INV-2026-089 berstatus LUNAS diverifikasi.</div>
        <div class="text-slate-400">[2026-09-01 01:10:00] Backup database lokal tersimpan di browser storage.</div>
      </div>
    </div>
  `;
}
