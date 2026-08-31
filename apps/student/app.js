// Dedicated Student Mobile Application Logic
import { store } from '../../src/store/dataStore.js';
import {
  openQuizRunner,
  openMaterialViewer,
  openAssignmentSubmission,
  closeModal
} from '../../src/components/Modal.js';

window.openQuizRunner = openQuizRunner;
window.openMaterialViewer = openMaterialViewer;
window.openAssignmentSubmission = openAssignmentSubmission;
window.closeModal = closeModal;

// Force active role to student in this app
store.data.activeRole = 'student';
store.data.currentUser = { ...store.data.users.students[0], role: 'student', xpPoints: 3450, level: 7, streakDays: 14, learningHours: 42.5 };

let currentTab = 'home';

window.setTab = (tab) => {
  currentTab = tab;
  updateNavState();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function updateNavState() {
  const tabs = ['home', 'schedule', 'materials', 'quiz', 'report'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === currentTab) {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all text-indigo-400 bg-indigo-500/10 font-bold scale-105';
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
  const user = data.currentUser;
  const schedules = data.schedules;
  const courses = data.courses;
  const quizzes = data.quizzes;
  const assignments = data.assignments;
  const materials = data.materials;
  const reports = data.reports;

  if (currentTab === 'schedule') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-extrabold text-white">📅 Jadwal Les Privat 1-on-1</h2>
          <span class="text-xs text-indigo-400 font-semibold">${schedules.length} Sesi Terdaftar</span>
        </div>

        <div class="space-y-3">
          ${schedules.map(s => {
            const isUpcoming = s.status === 'upcoming';
            return `
              <div class="bg-slate-900/90 border ${isUpcoming ? 'border-indigo-500/40' : 'border-slate-800'} p-4 rounded-2xl space-y-3 shadow-lg">
                <div class="flex items-center justify-between">
                  <span class="badge-tag ${isUpcoming ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-800 text-slate-400'} text-[10px] border">
                    ${isUpcoming ? 'Akan Datang' : 'Selesai'}
                  </span>
                  <span class="text-xs font-bold text-slate-300">${s.date} • ${s.time}</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-white">${s.title}</h3>
                  <p class="text-xs text-slate-400 mt-0.5">Tutor: <strong class="text-indigo-300">${s.tutorName}</strong> • ${s.subject}</p>
                </div>
                <div class="bg-slate-950/60 p-2.5 rounded-xl text-xs text-slate-400 border border-slate-800/80">
                  <strong class="text-slate-300">Catatan:</strong> "${s.note}"
                </div>
                ${isUpcoming ? `
                  <a href="${s.meetUrl}" target="_blank" class="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 no-underline">
                    <span>📹</span> Masuk Ruang Kelas ${s.platform}
                  </a>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'materials') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📖 Bank Modul & Bahan Ajar</h2>
        <div class="space-y-3">
          ${materials.map(m => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${m.type === 'pdf' ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'} text-[10px] border border-white/10">
                  ${m.type === 'pdf' ? '📄 Modul PDF' : '🎥 Video Pembahasan'}
                </span>
                <span class="text-[11px] text-slate-400">${m.fileSize || m.duration}</span>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">${m.title}</h3>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">${m.summary}</p>
              </div>
              <button onclick="window.openMaterialViewer('${m.id}')" class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5">
                ${m.type === 'pdf' ? 'Buka & Baca Dokumen PDF →' : 'Tonton Video Rekaman →'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'quiz') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">🎯 Kuis & Latihan Interaktif</h2>
        <div class="space-y-3">
          ${quizzes.map(q => `
            <div class="bg-slate-900/90 border border-purple-500/30 p-5 rounded-2xl space-y-3 shadow-xl">
              <div class="flex items-center justify-between">
                <span class="badge-tag bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30">${q.subject}</span>
                <span class="text-xs font-bold text-amber-400">⏱️ ${q.timeLimitMinutes} Menit</span>
              </div>
              <h3 class="text-sm font-bold text-white">${q.title}</h3>
              <p class="text-xs text-slate-400">${q.questions.length} Soal Pilihan Ganda & Pembahasan Langsung.</p>
              <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs flex justify-between">
                <span class="text-slate-400">Passing Grade: <strong class="text-white">${q.passScore} Poin</strong></span>
                <span class="text-emerald-400 font-bold">${q.myScore ? 'Nilai: ' + q.myScore : 'Belum Dikerjakan'}</span>
              </div>
              <button onclick="window.openQuizRunner('${q.id}')" class="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2">
                <span>✍️</span> ${q.isCompleted ? 'Kerjakan Ulang Kuis' : 'Mulai Kerjakan Kuis Sekarang'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'report') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">📊 Rapor & Kemajuan Belajar</h2>
        
        <!-- Score Card -->
        <div class="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 p-5 rounded-2xl text-center">
          <div class="text-xs text-indigo-300 font-bold uppercase">Rata-Rata Nilai Akademik</div>
          <div class="text-4xl font-extrabold text-white mt-1">${reports.overallScore} <span class="text-xs text-emerald-400 font-semibold">(Predikat A)</span></div>
          <div class="text-xs text-slate-400 mt-1">Kehadiran: <strong class="text-white">${reports.attendanceRate}</strong></div>
        </div>

        <!-- Topic Mastery -->
        <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Penguasaan Topik Bab:</h3>
          ${reports.topicMastery.map(t => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-300">${t.topic}</span>
                <span class="text-indigo-400">${t.mastery}%</span>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-1.5">
                <div class="bg-indigo-500 h-1.5 rounded-full" style="width: ${t.mastery}%"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Tutor Notes -->
        <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <h3 class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Catatan Guru Pembimbing:</h3>
          <p class="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            "${reports.tutorNote}"
          </p>
        </div>
      </div>
    `;
  } else {
    // HOME VIEW
    const nextSession = schedules.find(s => s.status === 'upcoming') || schedules[0];
    const pendingAsg = assignments.find(a => a.status === 'pending') || assignments[0];
    const activeQz = quizzes[0];

    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Next Live Session Spotlight -->
        ${nextSession ? `
          <div class="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/60 border border-indigo-500/40 p-5 rounded-3xl shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <span class="badge-tag bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                Sesi Terdekat
              </span>
              <span class="text-xs font-bold text-slate-300">${nextSession.date} • ${nextSession.time}</span>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-white">${nextSession.title}</h3>
              <p class="text-xs text-slate-400 mt-0.5">Tutor: <strong class="text-indigo-300">${nextSession.tutorName}</strong> • ${nextSession.subject}</p>
            </div>
            <a href="${nextSession.meetUrl}" target="_blank" class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/40 no-underline">
              <span>📹</span> Masuk Ruang Les Online (${nextSession.platform})
            </a>
          </div>
        ` : ''}

        <!-- Quick 2 Grid: Kuis & Tugas -->
        <div class="grid grid-cols-2 gap-3">
          <div onclick="window.openQuizRunner('${activeQz.id}')" class="bg-slate-900/90 border border-purple-500/30 p-4 rounded-2xl space-y-2 cursor-pointer hover:border-purple-500/60 transition-all">
            <div class="text-xl">🎯</div>
            <h4 class="text-xs font-bold text-white line-clamp-1">${activeQz.title}</h4>
            <p class="text-[11px] text-purple-400 font-semibold">Mulai Kuis →</p>
          </div>

          <div onclick="window.openAssignmentSubmission('${pendingAsg.id}')" class="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl space-y-2 cursor-pointer hover:border-amber-500/60 transition-all">
            <div class="text-xl">📝</div>
            <h4 class="text-xs font-bold text-white line-clamp-1">${pendingAsg.title}</h4>
            <p class="text-[11px] text-amber-400 font-semibold">Kirim Tugas →</p>
          </div>
        </div>

        <!-- My Courses -->
        <div class="space-y-3 pt-1">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-white">Mata Pelajaran Les Kamu</h3>
            <button onclick="window.setTab('materials')" class="text-xs text-indigo-400 font-semibold">Semua Modul →</button>
          </div>

          <div class="space-y-2.5">
            ${courses.map(c => `
              <div class="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-white">${c.title}</h4>
                  <p class="text-[11px] text-slate-400 mt-0.5">Tutor: ${c.tutorName} • ${c.completedModules}/${c.totalModules} Modul</p>
                </div>
                <div class="text-right font-black text-indigo-400 text-xs">${c.progress}%</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderCurrentView();
});
renderCurrentView();
