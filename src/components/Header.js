// Header Component
export function renderHeader(state, onRoleChange, onThemeToggle, onNotificationClick) {
  const user = state.currentUser || {};
  const activeRole = state.activeRole;

  const roleLabels = {
    student: { title: 'Portal Siswa (PrivatGo)', badge: 'Siswa / Murid', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    tutor: { title: 'Tutor Studio (PrivatGo)', badge: 'Guru / Tutor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    parent: { title: 'Parent Portal (PrivatGo)', badge: 'Orang Tua Siswa', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    admin: { title: 'Super Admin Portal', badge: 'Super Admin', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    billing: { title: 'Finance & SPP App (Terpisah)', badge: 'Aplikasi Keuangan', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' }
  };

  const currentRoleInfo = roleLabels[activeRole] || roleLabels.student;

  return `
    <header class="glass-card sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-white/10 mb-6 backdrop-blur-md">
      <!-- Left: Logo & Portal Title -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3 cursor-pointer" onclick="window.switchPortal('${activeRole}')">
          <div class="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                PrivatGo
              </h1>
              <span class="badge-tag border text-xs ${currentRoleInfo.color}">
                ${currentRoleInfo.badge}
              </span>
            </div>
            <p class="text-xs text-slate-400 font-medium hidden md:block">
              Platform Les Privat & E-Learning Terpadu
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Role Switcher, Quick Stats & User Profile -->
      <div class="flex items-center gap-3 md:gap-5">
        <!-- Role Switcher Dropdown / Quick Buttons -->
        <div class="relative">
          <div class="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button onclick="window.switchPortal('student')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeRole === 'student' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
              🎓 Siswa
            </button>
            <button onclick="window.switchPortal('tutor')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeRole === 'tutor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
              👨‍🏫 Tutor
            </button>
            <button onclick="window.switchPortal('parent')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeRole === 'parent' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
              👨‍👩‍👧 Ortu
            </button>
            <button onclick="window.switchPortal('admin')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeRole === 'admin' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
              ⚡ Admin
            </button>
            <button onclick="window.switchPortal('billing')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeRole === 'billing' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
              💳 Finance (App 5)
            </button>
          </div>
        </div>

        <!-- Role-Specific XP/Stats Badge -->
        ${activeRole === 'student' ? `
          <div class="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
            <span class="text-lg">🔥</span>
            <div>
              <div class="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Streak Belajar</div>
              <div class="text-xs font-bold text-white">${user.streakDays || 14} Hari Berturut-turut</div>
            </div>
          </div>
        ` : ''}

        ${activeRole === 'tutor' ? `
          <div class="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <span class="text-lg">⭐</span>
            <div>
              <div class="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Rating Mengajar</div>
              <div class="text-xs font-bold text-white">4.95 / 5.0 (142 Sesi)</div>
            </div>
          </div>
        ` : ''}

        ${activeRole === 'billing' ? `
          <div class="hidden lg:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
            <span class="text-lg">💰</span>
            <div>
              <div class="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Pemasukan Bulan Ini</div>
              <div class="text-xs font-bold text-emerald-400">Rp 28.500.000</div>
            </div>
          </div>
        ` : ''}

        <!-- User Profile Avatar & Info -->
        <div class="flex items-center gap-3 pl-2 border-l border-slate-700/60">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" 
               alt="${user.name}" 
               class="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40" />
          <div class="hidden sm:block text-left">
            <div class="text-xs font-bold text-white truncate max-w-[130px]">${user.name || 'Pengguna'}</div>
            <div class="text-[11px] text-slate-400 truncate max-w-[130px]">${user.grade || user.roleTitle || user.specialization || currentRoleInfo.badge}</div>
          </div>
        </div>
      </div>
    </header>
  `;
}
