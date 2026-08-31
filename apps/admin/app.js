// Dedicated Super Admin Mobile Application Logic
import { store } from '../../src/store/dataStore.js';

store.data.activeRole = 'admin';
store.data.currentUser = { ...store.data.users.admin, role: 'admin' };

let currentTab = 'home';

window.setTab = (tab) => {
  currentTab = tab;
  updateNavState();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function updateNavState() {
  const tabs = ['home', 'students', 'tutors', 'sessions'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === currentTab) {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all text-purple-400 bg-purple-500/10 font-bold scale-105';
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
  const tutors = data.users.tutors;
  const schedules = data.schedules;

  if (currentTab === 'students') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">👥 Master Data Siswa</h2>
        <div class="space-y-3">
          ${students.map(s => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
              <div class="flex items-center gap-3">
                <img src="${s.avatar}" class="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50" />
                <div>
                  <h3 class="text-sm font-bold text-white">${s.name}</h3>
                  <p class="text-xs text-slate-400">${s.grade} • ${s.school}</p>
                </div>
              </div>
              <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div><strong>Program:</strong> ${s.package}</div>
                <div><strong>Tutor:</strong> <span class="text-emerald-400">${s.tutorName}</span></div>
                <div><strong>Kontak Ortu:</strong> ${s.parentPhone}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'tutors') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">👨‍🏫 Master Data Guru Privat</h2>
        <div class="space-y-3">
          ${tutors.map(t => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
              <div class="flex items-center gap-3">
                <img src="${t.avatar}" class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50" />
                <div>
                  <h3 class="text-sm font-bold text-white">${t.name}</h3>
                  <p class="text-xs text-slate-400">${t.university}</p>
                </div>
              </div>
              <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div><strong>Spesialisasi:</strong> ${t.specialization}</div>
                <div><strong>Rating:</strong> <span class="text-amber-400">⭐ ${t.rating}</span> • <strong>Total:</strong> ${t.totalSessions} Sesi</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'sessions') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📅 Matriks Seluruh Jadwal</h2>
        <div class="space-y-3">
          ${schedules.map(s => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-purple-400">${s.date} (${s.time})</span>
                <span class="badge-tag ${s.status === 'upcoming' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'} text-[10px]">
                  ${s.status}
                </span>
              </div>
              <h3 class="text-sm font-bold text-white">${s.studentName} & ${s.tutorName}</h3>
              <p class="text-xs text-slate-400">${s.title} (${s.subject})</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // HOME VIEW
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- 4 Grid Stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl text-center">
            <div class="text-2xl font-black text-purple-400">18</div>
            <div class="text-[11px] text-slate-400 mt-1 font-medium">Siswa Terdaftar</div>
          </div>
          <div class="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-2xl text-center">
            <div class="text-2xl font-black text-emerald-400">3</div>
            <div class="text-[11px] text-slate-400 mt-1 font-medium">Tutor Aktif</div>
          </div>
          <div class="bg-slate-900/90 border border-indigo-500/30 p-4 rounded-2xl text-center">
            <div class="text-2xl font-black text-indigo-400">78</div>
            <div class="text-[11px] text-slate-400 mt-1 font-medium">Sesi Les Bulan Ini</div>
          </div>
          <div class="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl text-center">
            <div class="text-2xl font-black text-amber-400">⭐ 4.94</div>
            <div class="text-[11px] text-slate-400 mt-1 font-medium">Indeks Kepuasan</div>
          </div>
        </div>

        <!-- Quick Activity Log -->
        <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-3">
          <h3 class="text-xs font-bold text-white uppercase tracking-wider">Aktivitas Operasional Terbaru</h3>
          <div class="space-y-2 text-xs text-slate-300">
            <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              ✓ Sesi les Matematika Kevin Pratama bersama Kak Sarah sukses terlaksana.
            </div>
            <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              ✓ Modul 08 Integral Parsial telah diakses oleh murid.
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCurrentView();
});
renderCurrentView();
