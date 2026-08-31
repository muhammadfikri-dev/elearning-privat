// Sidebar Component with Role-Based Navigation
export function renderSidebar(activeRole, activeTab) {
  const menusByRole = {
    student: [
      { id: 'dashboard', label: 'Dashboard Belajar', icon: 'layout-dashboard', badge: 'Level 7' },
      { id: 'materials', label: 'Modul & Materi', icon: 'book-open', badge: '4 Modul' },
      { id: 'schedule', label: 'Jadwal & Live Class', icon: 'video', badge: 'Besok 16:00' },
      { id: 'quiz', label: 'Kuis Interaktif', icon: 'help-circle', badge: '1 Kuis Baru' },
      { id: 'assignments', label: 'Tugas & PR', icon: 'check-square', badge: '1 Menunggu' },
      { id: 'attendance', label: 'Presensi & Absensi', icon: 'user-check', badge: '100%' },
      { id: 'report', label: 'Rapor & Perkembangan', icon: 'bar-chart-2', badge: 'Nilai 92.4' },
      { id: 'chat', label: 'Tanya Kak Sarah', icon: 'message-circle', badge: 'Aktif' }
    ],
    tutor: [
      { id: 'dashboard', label: 'Studio Tutor', icon: 'layout-dashboard', badge: '4 Sesi Hari Ini' },
      { id: 'materials', label: 'Kelola Modul & Materi', icon: 'folder-plus', badge: 'Upload' },
      { id: 'schedule', label: 'Manajemen Jadwal Les', icon: 'calendar', badge: 'Atur Slot' },
      { id: 'quiz_manager', label: 'Pembuat Kuis & Soal', icon: 'file-text', badge: '5 Soal' },
      { id: 'grading', label: 'Koreksi & Nilai Tugas', icon: 'award', badge: '1 Perlu Dinilai' },
      { id: 'attendance', label: 'Input Log Presensi', icon: 'clipboard-list', badge: 'Input Jurnal' },
      { id: 'reports', label: 'Rapor Evaluasi Siswa', icon: 'trending-up', badge: 'Bulanan' }
    ],
    parent: [
      { id: 'dashboard', label: 'Dashboard Pantauan', icon: 'heart', badge: 'Kevin (12 SMA)' },
      { id: 'progress', label: 'Rapor & Nilai Anak', icon: 'award', badge: 'Rata-rata 92' },
      { id: 'schedule', label: 'Jadwal Les Mendatang', icon: 'calendar', badge: 'Besok' },
      { id: 'tutor_notes', label: 'Catatan & Jurnal Guru', icon: 'file-text', badge: 'Baru' },
      { id: 'consultation', label: 'Konsultasi Tutor / Admin', icon: 'message-square', badge: 'WhatsApp' }
    ],
    admin: [
      { id: 'dashboard', label: 'Overview Lembaga', icon: 'activity', badge: '18 Siswa Aktif' },
      { id: 'students', label: 'Manajemen Siswa', icon: 'users', badge: '3 Siswa Les' },
      { id: 'tutors', label: 'Manajemen Tutor & Guru', icon: 'briefcase', badge: '3 Tutor' },
      { id: 'courses', label: 'Mata Pelajaran & Paket', icon: 'layers', badge: '4 Program' },
      { id: 'sessions', label: 'Matriks Semua Jadwal', icon: 'calendar', badge: 'Live Monitor' },
      { id: 'logs', label: 'Audit Log & Laporan', icon: 'shield-check', badge: 'Sistem' }
    ],
    billing: [
      { id: 'dashboard', label: 'Dashboard Keuangan', icon: 'dollar-sign', badge: 'Omset Rp 28.5jt' },
      { id: 'invoices', label: 'Tagihan & Invoice SPP', icon: 'receipt', badge: '3 Invoice' },
      { id: 'verification', label: 'Verifikasi Pembayaran', icon: 'check-circle-2', badge: '1 Menunggu' },
      { id: 'payroll', label: 'Honor & Penggajian Tutor', icon: 'wallet', badge: 'Rp 14.2jt' },
      { id: 'reports', label: 'Laporan Arus Kas & Pajak', icon: 'file-spreadsheet', badge: 'Bulan Ini' },
      { id: 'whatsapp_reminder', label: 'Generator Pengingat WA', icon: 'send', badge: 'Otomatis' }
    ]
  };

  const navItems = menusByRole[activeRole] || menusByRole.student;

  const iconsSvg = {
    'layout-dashboard': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
    'book-open': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
    'video': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
    'help-circle': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    'check-square': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
    'user-check': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    'bar-chart-2': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    'message-circle': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    'folder-plus': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`,
    'calendar': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
    'file-text': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    'award': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>`,
    'clipboard-list': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
    'trending-up': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
    'heart': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    'message-square': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>`,
    'activity': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    'users': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    'briefcase': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
    'layers': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    'shield-check': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    'dollar-sign': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    'receipt': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>`,
    'check-circle-2': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    'wallet': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>`,
    'file-spreadsheet': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    'send': `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`
  };

  return `
    <aside class="w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0">
      <div class="glass-card p-3 md:p-4 space-y-1.5 sticky top-24">
        <div class="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Navigasi Menu</span>
          <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">${navItems.length} Menu</span>
        </div>

        <nav class="space-y-1">
          ${navItems.map(item => {
            const isActive = item.id === activeTab;
            const iconSvg = iconsSvg[item.icon] || iconsSvg['layout-dashboard'];
            return `
              <button onclick="window.navigateTab('${item.id}')" 
                      class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }">
                <div class="flex items-center gap-3">
                  <span class="${isActive ? 'text-white' : 'text-indigo-400'}">${iconSvg}</span>
                  <span class="truncate">${item.label}</span>
                </div>
                ${item.badge ? `
                  <span class="text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                  }">
                    ${item.badge}
                  </span>
                ` : ''}
              </button>
            `;
          }).join('')}
        </nav>

        <!-- Quick Info Box on Sidebar Footer -->
        <div class="pt-4 mt-4 border-t border-slate-800/80 px-2 text-center text-xs text-slate-400 hidden lg:block">
          <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div class="flex items-center justify-center gap-1.5 text-indigo-400 font-semibold mb-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Sistem Aktif 24/7
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Build siap multiplatform: Web, Android APK & Windows EXE via GitHub Actions.
            </p>
          </div>
        </div>
      </div>
    </aside>
  `;
}
