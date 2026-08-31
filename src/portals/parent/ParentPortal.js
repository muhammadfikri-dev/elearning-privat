// Parent Portal Component (PrivatGo Parent App)
import { store } from '../../store/dataStore.js';

export function renderParentPortal(activeTab) {
  const parent = store.data.currentUser;
  const child = store.data.users.students[0];
  const schedules = store.data.schedules;
  const reports = store.data.reports;
  const attendance = store.data.attendance;

  switch (activeTab) {
    case 'progress':
      return renderParentProgress(child, reports);
    case 'schedule':
      return renderParentSchedule(schedules);
    case 'tutor_notes':
      return renderParentTutorNotes(attendance, reports);
    case 'consultation':
      return renderParentConsultation();
    case 'dashboard':
    default:
      return renderParentDashboard(parent, child, schedules, reports, attendance);
  }
}

// 1. Parent Dashboard
function renderParentDashboard(parent, child, schedules, reports, attendance) {
  const nextSession = schedules.find(s => s.status === 'upcoming') || schedules[0];

  return `
    <div class="space-y-6">
      <!-- Parent Header -->
      <div class="glass-card p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-blue-950/50 border border-cyan-500/20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="badge-tag bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs mb-2">
              👨‍👩‍👧 Portal Orang Tua Siswa
            </span>
            <h2 class="text-2xl font-extrabold text-white">
              Selamat Datang, <span class="text-cyan-400">${parent.name || 'Ibu Ratna Hendrawan'}</span>! 👋
            </h2>
            <p class="text-xs text-slate-300 mt-1">
              Memantau aktivitas belajar Ananda <strong class="text-white">${child.name}</strong> (${child.grade} - ${child.school})
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.navigateTab('consultation')" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center gap-2">
              <span>💬</span> Konsultasi dengan Tutor
            </button>
          </div>
        </div>
      </div>

      <!-- Child Status Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="glass-card p-4 text-center border-l-4 border-l-cyan-500">
          <div class="text-2xl font-extrabold text-white">${reports.overallScore}</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Rata-Rata Nilai</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-emerald-500">
          <div class="text-2xl font-extrabold text-emerald-400">100%</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Kehadiran Les</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-indigo-500">
          <div class="text-2xl font-extrabold text-indigo-400">${child.completedSessions} Sesi</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Sesi Les Selesai</div>
        </div>
        <div class="glass-card p-4 text-center border-l-4 border-l-amber-500">
          <div class="text-2xl font-extrabold text-amber-400">${child.streak} Hari</div>
          <div class="text-[11px] text-slate-400 font-medium mt-0.5">Disiplin Belajar</div>
        </div>
      </div>

      <!-- Next Scheduled Session -->
      ${nextSession ? `
        <div class="glass-card p-5 border-l-4 border-l-cyan-500 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="badge-tag bg-cyan-500/20 text-cyan-300 text-[10px]">Jadwal Les Berikutnya</span>
            <h3 class="text-base font-bold text-white mt-1">${nextSession.title}</h3>
            <p class="text-xs text-slate-400 mt-0.5">Waktu: <strong class="text-white">${nextSession.date} (${nextSession.time})</strong> • Tutor: <strong class="text-indigo-300">${nextSession.tutorName}</strong></p>
          </div>
          <a href="${nextSession.meetUrl}" target="_blank" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold no-underline inline-block text-center shadow-md">
            Cek Ruang Kelas
          </a>
        </div>
      ` : ''}

      <!-- Latest Tutor Note -->
      <div class="glass-card p-6 space-y-3 bg-slate-900/90 border border-slate-700">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>👩‍🏫</span> Catatan Guru Pembimbing untuk Orang Tua
          </h3>
          <span class="text-xs text-indigo-400 font-semibold">Kak Sarah Amalia, M.Sc</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          "${reports.tutorNote}"
        </p>
      </div>

      <!-- Recent Attendance History -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          <span>📋</span> Log Kehadiran & Materi Belajar Terbaru
        </h3>
        <div class="glass-card overflow-hidden">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th class="py-3 px-4">Tanggal</th>
                <th class="py-3 px-4">Materi yang Dipelajari</th>
                <th class="py-3 px-4">Mapel</th>
                <th class="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${attendance.slice(0, 3).map(a => `
                <tr class="hover:bg-slate-800/40">
                  <td class="py-3 px-4 font-semibold text-white">${a.date}</td>
                  <td class="py-3 px-4 text-slate-200 font-medium">${a.topic}</td>
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
    </div>
  `;
}

// 2. Parent Progress & Reports
function renderParentProgress(child, reports) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📈</span> Evaluasi Belajar Ananda ${child.name}
        </h2>
        <p class="text-xs text-slate-400 mt-1">Laporan komprehensif pemahaman topik kurikulum SNBT UTBK</p>
      </div>

      <div class="glass-card p-6 space-y-4">
        <h3 class="text-sm font-bold text-white">Tingkat Penguasaan Konsep Pelajaran:</h3>
        <div class="space-y-3">
          ${reports.topicMastery.map(t => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-200">${t.topic}</span>
                <span class="text-cyan-400">${t.mastery}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style="width: ${t.mastery}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 3. Parent Schedule
function renderParentSchedule(schedules) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📅</span> Kalender Jadwal Les Privat Anak
        </h2>
        <p class="text-xs text-slate-400 mt-1">Pantau jadwal dan link kelas daring</p>
      </div>

      <div class="space-y-4">
        ${schedules.map(s => `
          <div class="glass-card p-5 space-y-2 border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="badge-tag ${s.status === 'upcoming' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-slate-400'} text-[10px]">
                ${s.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
              </span>
              <span class="text-xs font-bold text-slate-300">${s.date} • ${s.time}</span>
            </div>
            <h3 class="text-base font-bold text-white">${s.title}</h3>
            <p class="text-xs text-slate-400">Tutor: <strong class="text-indigo-300">${s.tutorName}</strong> • ${s.subject}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 4. Parent Tutor Notes
function renderParentTutorNotes(attendance, reports) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📝</span> Jurnal Catatan Perkembangan Anak dari Guru
        </h2>
        <p class="text-xs text-slate-400 mt-1">Transparansi catatan evaluasi di setiap pertemuan les</p>
      </div>

      <div class="glass-card p-6 space-y-4 border border-cyan-500/30">
        <h3 class="text-sm font-bold text-white">Rekomendasi Pendampingan di Rumah:</h3>
        <p class="text-xs text-slate-300 leading-relaxed italic bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          "${reports.tutorNote}"
        </p>

        <div class="pt-2 text-xs text-slate-400">
          <strong class="text-emerald-400">Tips untuk Orang Tua:</strong> Luangkan waktu 15 menit setiap malam untuk menanyakan tantangan soal matematika yang dihadapi anak agar rasa percaya diri anak semakin terbentuk menjelang ujian.
        </div>
      </div>
    </div>
  `;
}

// 5. Parent Consultation
function renderParentConsultation() {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>💬</span> Konsultasi Akademik & Bimbingan
        </h2>
        <p class="text-xs text-slate-400 mt-1">Hubungi guru privat atau tim akademik PrivatGo kapan saja</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="glass-card p-6 space-y-4 border border-emerald-500/30">
          <div class="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" class="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/40" />
            <div>
              <h3 class="text-sm font-bold text-white">Kak Sarah Amalia, M.Sc</h3>
              <p class="text-xs text-slate-400">Tutor Utama Matematika & Fisika</p>
            </div>
          </div>
          <p class="text-xs text-slate-300">Hubungi langsung untuk konsultasi perkembangan materi anak atau penyesuaian jadwal les.</p>
          <a href="https://wa.me/6281233445566?text=Halo%20Kak%20Sarah,%20saya%20orang%20tua%20dari%20Kevin%20ingin%20konsultasi%20jadwal%20les" target="_blank" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 no-underline shadow-md">
            <span>💬</span> Chat WhatsApp Kak Sarah
          </a>
        </div>

        <div class="glass-card p-6 space-y-4 border border-indigo-500/30">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              CS
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Customer Care PrivatGo</h3>
              <p class="text-xs text-slate-400">Bantuan Akademik & Administrasi</p>
            </div>
          </div>
          <p class="text-xs text-slate-300">Pertanyaan seputar paket les, ganti guru, atau layanan akademik lainnya.</p>
          <a href="https://wa.me/6281200001111?text=Halo%20Admin%20PrivatGo,%20saya%20ingin%20konsultasi%20paket%20les" target="_blank" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 no-underline shadow-md">
            <span>💬</span> Hubungi Admin PrivatGo
          </a>
        </div>
      </div>
    </div>
  `;
}
