// Dedicated Tutor Mobile Application Logic
import { store } from '../../src/store/dataStore.js';
import {
  openCreateScheduleModal,
  openGradingModal,
  closeModal
} from '../../src/components/Modal.js';

window.openCreateScheduleModal = openCreateScheduleModal;
window.openGradingModal = openGradingModal;
window.closeModal = closeModal;

// Force active role to tutor
store.data.activeRole = 'tutor';
store.data.currentUser = { ...store.data.users.tutors[0], role: 'tutor' };

let currentTab = 'home';

window.setTab = (tab) => {
  currentTab = tab;
  updateNavState();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function updateNavState() {
  const tabs = ['home', 'schedule', 'grading', 'materials', 'students'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === currentTab) {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all text-emerald-400 bg-emerald-500/10 font-bold scale-105';
      } else {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all text-slate-400 hover:text-white font-medium';
      }
    }
  });
}

function renderCurrentView() {
  const container = document.getElementById('app-view');
  if (!container) return;

  const data = store.data;
  const students = data.users.students;
  const schedules = data.schedules;
  const assignments = data.assignments;
  const materials = data.materials;

  if (currentTab === 'schedule') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-extrabold text-white">📅 Jadwal Mengajar Les</h2>
          <button onclick="window.openCreateScheduleModal()" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
            + Tambah Sesi
          </button>
        </div>

        <div class="space-y-3">
          ${schedules.map(s => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${s.status === 'upcoming' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'} text-[10px]">
                  ${s.status === 'upcoming' ? 'Akan Berlangsung' : 'Selesai'}
                </span>
                <span class="text-xs font-bold text-slate-300">${s.date} (${s.time})</span>
              </div>
              <h3 class="text-sm font-bold text-white">${s.title}</h3>
              <p class="text-xs text-slate-400">Murid: <strong class="text-white">${s.studentName}</strong> • ${s.subject}</p>
              <a href="${s.meetUrl}" target="_blank" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 no-underline shadow-md">
                <span>📹</span> Buka Ruang Kelas ${s.platform}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'grading') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">✍️ Koreksi & Nilai Tugas Siswa</h2>
        <div class="space-y-3">
          ${assignments.map(a => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${a.status === 'graded' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                  ${a.status === 'graded' ? '✓ Sudah Dinilai' : '⏳ Perlu Koreksi'}
                </span>
                <span class="text-xs text-slate-400">${a.subject}</span>
              </div>
              <h3 class="text-sm font-bold text-white">${a.title}</h3>
              <p class="text-xs text-slate-400">Siswa: <strong class="text-white">Kevin Pratama</strong></p>
              ${a.feedback ? `
                <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div class="flex justify-between font-bold text-slate-300 mb-0.5">
                    <span>Ulasan Anda:</span>
                    <span class="text-emerald-400 font-bold">Skor: ${a.score}/100</span>
                  </div>
                  <p class="text-slate-400 italic">"${a.feedback}"</p>
                </div>
              ` : ''}
              <button onclick="window.openGradingModal('${a.id}')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
                ${a.status === 'graded' ? 'Perbarui Nilai / Ulasan' : 'Beri Nilai Sekarang →'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'materials') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📁 Modul & Bahan Ajar Anda</h2>
        <div class="space-y-3">
          ${materials.map(m => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
              <span class="badge-tag ${m.type === 'pdf' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'} text-[10px]">
                ${m.type.toUpperCase()}
              </span>
              <h3 class="text-sm font-bold text-white">${m.title}</h3>
              <p class="text-xs text-slate-400">${m.summary}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'students') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">👥 Siswa Bimbingan Aktif</h2>
        <div class="space-y-3">
          ${students.map(s => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-lg">
              <div class="flex items-center gap-3">
                <img src="${s.avatar}" class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50" />
                <div>
                  <h3 class="text-sm font-bold text-white">${s.name}</h3>
                  <p class="text-xs text-slate-400">${s.grade} • ${s.school}</p>
                </div>
              </div>
              <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div><strong>Program:</strong> ${s.package}</div>
                <div><strong>Sesi Les:</strong> ${s.completedSessions} Sesi Selesai</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // HOME VIEW
    const pendingCount = assignments.filter(a => a.status === 'submitted').length;
    const nextSession = schedules.find(s => s.status === 'upcoming');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Tutor Stats 3-Grid -->
        <div class="grid grid-cols-3 gap-2.5 text-center">
          <div class="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-emerald-400">${students.length}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Siswa Aktif</div>
          </div>
          <div class="bg-slate-900/90 border border-indigo-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-indigo-400">28</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Sesi Bulan Ini</div>
          </div>
          <div class="bg-slate-900/90 border border-amber-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-amber-400">${pendingCount}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Tugas Baru</div>
          </div>
        </div>

        <!-- Next Tutoring Class -->
        ${nextSession ? `
          <div class="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/60 border border-emerald-500/40 p-5 rounded-3xl shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <span class="badge-tag bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                Jadwal Mengajar Berikutnya
              </span>
              <span class="text-xs font-bold text-slate-300">${nextSession.date}</span>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-white">${nextSession.title}</h3>
              <p class="text-xs text-slate-400 mt-0.5">Siswa: <strong class="text-white">${nextSession.studentName}</strong> (${nextSession.time})</p>
            </div>
            <a href="${nextSession.meetUrl}" target="_blank" class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/40 no-underline">
              <span>📹</span> Mulai Sesi Tatap Muka Online
            </a>
          </div>
        ` : ''}

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-3 pt-1">
          <button onclick="window.openCreateScheduleModal()" class="p-4 bg-slate-900/90 border border-emerald-500/30 rounded-2xl text-left space-y-1 hover:border-emerald-500/60 transition-all">
            <div class="text-xl">📅</div>
            <div class="text-xs font-bold text-white">Buat Jadwal Baru</div>
            <div class="text-[10px] text-emerald-400">Atur sesi privat →</div>
          </button>

          <button onclick="window.setTab('grading')" class="p-4 bg-slate-900/90 border border-amber-500/30 rounded-2xl text-left space-y-1 hover:border-amber-500/60 transition-all">
            <div class="text-xl">✍️</div>
            <div class="text-xs font-bold text-white">Koreksi Tugas</div>
            <div class="text-[10px] text-amber-400">Input nilai murid →</div>
          </button>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCurrentView();
});
renderCurrentView();
