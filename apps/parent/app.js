// Dedicated Parent Mobile Application Logic
import { store } from '../../src/store/dataStore.js';

store.data.activeRole = 'parent';
store.data.currentUser = { ...store.data.users.parents[0], role: 'parent' };

let currentTab = 'home';

window.setTab = (tab) => {
  currentTab = tab;
  updateNavState();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function updateNavState() {
  const tabs = ['home', 'reports', 'schedule', 'consultation'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === currentTab) {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all text-cyan-400 bg-cyan-500/10 font-bold scale-105';
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
  const child = data.users.students[0];
  const schedules = data.schedules;
  const reports = data.reports;
  const attendance = data.attendance;

  if (currentTab === 'reports') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📊 Rapor Perkembangan Ananda ${child.name}</h2>
        
        <div class="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 p-5 rounded-2xl text-center">
          <div class="text-xs text-cyan-300 font-bold uppercase">Nilai Rata-Rata Bulan Ini</div>
          <div class="text-4xl font-extrabold text-white mt-1">${reports.overallScore}</div>
          <div class="text-xs text-emerald-400 font-semibold mt-1">Kehadiran 100% (8/8 Sesi Selesai)</div>
        </div>

        <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Pemahaman Konsep per Bab:</h3>
          ${reports.topicMastery.map(t => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-300">${t.topic}</span>
                <span class="text-cyan-400">${t.mastery}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full" style="width: ${t.mastery}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'schedule') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📅 Kalender Les Privat Anak</h2>
        <div class="space-y-3">
          ${schedules.map(s => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${s.status === 'upcoming' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'} text-[10px]">
                  ${s.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                </span>
                <span class="text-xs font-bold text-slate-300">${s.date} • ${s.time}</span>
              </div>
              <h3 class="text-sm font-bold text-white">${s.title}</h3>
              <p class="text-xs text-slate-400">Guru: <strong class="text-indigo-300">${s.tutorName}</strong> • ${s.subject}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'consultation') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">💬 Konsultasi Guru & Bantuan</h2>
        
        <div class="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
          <div class="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40" />
            <div>
              <h3 class="text-sm font-bold text-white">Kak Sarah Amalia, M.Sc</h3>
              <p class="text-xs text-slate-400">Tutor Utama Matematika & Fisika</p>
            </div>
          </div>
          <a href="https://wa.me/6281233445566?text=Halo%20Kak%20Sarah,%20saya%20orang%20tua%20dari%20Kevin" target="_blank" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 no-underline shadow-md">
            <span>💬</span> Chat WhatsApp Guru
          </a>
        </div>
      </div>
    `;
  } else {
    // HOME VIEW
    const nextSession = schedules.find(s => s.status === 'upcoming');

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- 3 Child Status Cards -->
        <div class="grid grid-cols-3 gap-2.5 text-center">
          <div class="bg-slate-900/90 border border-cyan-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-cyan-400">${reports.overallScore}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Rata-Rata Nilai</div>
          </div>
          <div class="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-emerald-400">100%</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Kehadiran Les</div>
          </div>
          <div class="bg-slate-900/90 border border-indigo-500/30 p-3 rounded-2xl">
            <div class="text-xl font-black text-indigo-400">${child.completedSessions}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Sesi Selesai</div>
          </div>
        </div>

        <!-- Next Lesson -->
        ${nextSession ? `
          <div class="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/60 border border-cyan-500/40 p-5 rounded-3xl shadow-xl space-y-2">
            <span class="badge-tag bg-cyan-500/20 text-cyan-300 text-[10px]">Jadwal Les Mendatang</span>
            <h3 class="text-base font-extrabold text-white">${nextSession.title}</h3>
            <p class="text-xs text-slate-300">Waktu: <strong>${nextSession.date} (${nextSession.time})</strong></p>
            <p class="text-xs text-slate-400">Tutor: <strong class="text-indigo-300">${nextSession.tutorName}</strong></p>
          </div>
        ` : ''}

        <!-- Latest Tutor Review -->
        <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Catatan Guru untuk Orang Tua:</h3>
            <span class="text-[11px] text-slate-400">Agustus 2026</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            "${reports.tutorNote}"
          </p>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCurrentView();
});
renderCurrentView();
