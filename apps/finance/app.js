// Dedicated Finance & SPP Mobile Application Logic
import { store } from '../../src/store/dataStore.js';
import {
  openReceiptModal,
  openWhatsAppReminderModal,
  closeModal
} from '../../src/components/Modal.js';

window.openReceiptModal = openReceiptModal;
window.openWhatsAppReminderModal = openWhatsAppReminderModal;
window.closeModal = closeModal;

store.data.activeRole = 'billing';
store.data.currentUser = { ...store.data.users.billing, role: 'billing' };

let currentTab = 'home';

const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

window.setTab = (tab) => {
  currentTab = tab;
  updateNavState();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function updateNavState() {
  const tabs = ['home', 'invoices', 'payroll'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === currentTab) {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all text-amber-400 bg-amber-500/10 font-bold scale-105';
      } else {
        btn.className = 'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all text-slate-400 hover:text-white font-medium';
      }
    }
  });
}

function renderCurrentView() {
  const container = document.getElementById('app-view');
  if (!container) return;

  const billingData = store.data.billingData;
  const invoices = billingData.invoices;
  const payouts = billingData.tutorPayouts;
  const stats = billingData.stats;

  if (currentTab === 'invoices') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">🧾 Tagihan & SPP Siswa</h2>
        <div class="space-y-3">
          ${invoices.map(inv => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-bold text-indigo-300">${inv.id}</span>
                <span class="badge-tag ${inv.status === 'Lunas' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                  ${inv.status}
                </span>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">${inv.studentName}</h3>
                <p class="text-xs text-slate-400">${inv.packageName} • <strong class="text-emerald-400">${formatRupiah(inv.amount)}</strong></p>
              </div>
              <div class="flex gap-2">
                ${inv.status === 'Lunas' ? `
                  <button onclick="window.openReceiptModal('${inv.id}')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
                    Cetak Kwitansi Lunas
                  </button>
                ` : `
                  <button onclick="window.openWhatsAppReminderModal('${inv.id}')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md">
                    <span>💬</span> Kirim Pengingat WhatsApp
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentTab === 'payroll') {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <h2 class="text-lg font-extrabold text-white">💼 Penggajian & Honor Tutor</h2>
        <div class="space-y-3">
          ${payouts.map(p => `
            <div class="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-lg">
              <div class="flex items-center justify-between">
                <span class="badge-tag ${p.status === 'Sudah Ditransfer' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                  ${p.status}
                </span>
                <span class="text-sm font-black text-emerald-400">${formatRupiah(p.totalPayout)}</span>
              </div>
              <h3 class="text-sm font-bold text-white">${p.tutorName}</h3>
              <p class="text-xs text-slate-400">${p.completedSessionsThisMonth} Sesi Selesai • ${p.bankAccount}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // HOME VIEW
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in">
        <!-- Revenue Card -->
        <div class="bg-gradient-to-r from-amber-950/60 to-yellow-950/60 border border-amber-500/30 p-5 rounded-3xl space-y-1">
          <div class="text-xs text-amber-300 font-bold uppercase">Total Pemasukan Les</div>
          <div class="text-3xl font-black text-white">${formatRupiah(stats.totalRevenueMonth)}</div>
          <div class="text-xs text-emerald-400 font-semibold pt-1">Laba Bersih: ${formatRupiah(stats.netProfit)}</div>
        </div>

        <!-- 2 Grid Stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl text-center">
            <div class="text-lg font-black text-amber-400">${formatRupiah(stats.totalPendingInvoices)}</div>
            <div class="text-[10px] text-slate-400 mt-1">Tagihan Tertunggak</div>
          </div>
          <div class="bg-slate-900/90 border border-indigo-500/30 p-4 rounded-2xl text-center">
            <div class="text-lg font-black text-indigo-400">${formatRupiah(stats.totalTutorPayouts)}</div>
            <div class="text-[10px] text-slate-400 mt-1">Total Honor Tutor</div>
          </div>
        </div>

        <!-- Invoices List Quick Preview -->
        <div class="space-y-3 pt-1">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-white">Status Tagihan Terkini</h3>
            <button onclick="window.setTab('invoices')" class="text-xs text-amber-400 font-semibold">Semua Invoice →</button>
          </div>

          <div class="space-y-2.5">
            ${invoices.map(inv => `
              <div class="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-white">${inv.studentName}</h4>
                  <p class="text-[11px] text-slate-400">${inv.id} • ${formatRupiah(inv.amount)}</p>
                </div>
                <span class="badge-tag ${inv.status === 'Lunas' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                  ${inv.status}
                </span>
              </div>
            `).join('')}
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
