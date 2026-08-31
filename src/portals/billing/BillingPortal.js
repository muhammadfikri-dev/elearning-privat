// Billing & Finance Dedicated App (PrivatGo Finance Suite)
// Aplikasi Terpisah untuk Manajemen Keuangan, SPP Les, Verifikasi Pembayaran & Penggajian Tutor
import { store } from '../../store/dataStore.js';
import { openReceiptModal, openWhatsAppReminderModal } from '../../components/Modal.js';

export function renderBillingPortal(activeTab) {
  const billingData = store.data.billingData;
  const invoices = billingData.invoices;
  const payouts = billingData.tutorPayouts;
  const stats = billingData.stats;
  const students = store.data.users.students;

  switch (activeTab) {
    case 'invoices':
      return renderBillingInvoices(invoices, students);
    case 'verification':
      return renderBillingVerification(invoices);
    case 'payroll':
      return renderBillingPayroll(payouts);
    case 'reports':
      return renderBillingReports(stats, invoices);
    case 'whatsapp_reminder':
      return renderBillingWhatsApp(invoices);
    case 'dashboard':
    default:
      return renderBillingDashboard(stats, invoices, payouts);
  }
}

const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

// 1. Finance Dashboard
function renderBillingDashboard(stats, invoices, payouts) {
  const pendingInvoices = invoices.filter(i => i.status !== 'Lunas');

  return `
    <div class="space-y-6">
      <!-- Finance Banner -->
      <div class="glass-card p-6 bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-yellow-950/50 border border-amber-500/20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="badge-tag bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs mb-2">
              💳 Aplikasi Terpisah: PrivatGo Finance & Billing App
            </span>
            <h2 class="text-2xl font-extrabold text-white">
              Sistem Keuangan & Tagihan SPP Les Terpadu
            </h2>
            <p class="text-xs text-slate-300 mt-1">
              Kelola tagihan les privat, verifikasi bukti transfer, penggajian tutor, dan laporan keuangan
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.showCreateInvoiceForm()" class="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 flex items-center gap-2">
              <span>🧾</span> Terbitkan Tagihan Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Financial Metrics 4-Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="glass-card p-4 border-l-4 border-l-emerald-500">
          <div class="text-xs text-slate-400 font-bold uppercase">Total Pemasukan</div>
          <div class="text-xl md:text-2xl font-extrabold text-emerald-400 mt-1">${formatRupiah(stats.totalRevenueMonth)}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">Bulan Agustus - September 2026</div>
        </div>
        <div class="glass-card p-4 border-l-4 border-l-amber-500">
          <div class="text-xs text-slate-400 font-bold uppercase">Tagihan Tertunggak</div>
          <div class="text-xl md:text-2xl font-extrabold text-amber-400 mt-1">${formatRupiah(stats.totalPendingInvoices)}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">${pendingInvoices.length} Siswa Menunggu Bayar</div>
        </div>
        <div class="glass-card p-4 border-l-4 border-l-indigo-500">
          <div class="text-xs text-slate-400 font-bold uppercase">Honor Tutor Terbayar</div>
          <div class="text-xl md:text-2xl font-extrabold text-indigo-400 mt-1">${formatRupiah(stats.totalTutorPayouts)}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">Berdasarkan Sesi Selesai</div>
        </div>
        <div class="glass-card p-4 border-l-4 border-l-cyan-500">
          <div class="text-xs text-slate-400 font-bold uppercase">Laba Bersih Operasional</div>
          <div class="text-xl md:text-2xl font-extrabold text-cyan-400 mt-1">${formatRupiah(stats.netProfit)}</div>
          <div class="text-[10px] text-slate-400 mt-0.5">Margin Keuntungan 50%</div>
        </div>
      </div>

      <!-- Quick Action: Verification Box -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>🔍</span> Tagihan & Bukti Bayar Perlu Tindakan Segera
          </h3>
          <button onclick="window.navigateTab('verification')" class="text-xs text-amber-400 hover:underline">Lihat Semua Verifikasi →</button>
        </div>

        <div class="glass-card overflow-hidden">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-800 text-slate-300 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th class="py-3 px-4">No Invoice</th>
                <th class="py-3 px-4">Siswa / Orang Tua</th>
                <th class="py-3 px-4">Paket Les</th>
                <th class="py-3 px-4">Nominal</th>
                <th class="py-3 px-4">Jatuh Tempo</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-center">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${invoices.map(inv => {
                const isPaid = inv.status === 'Lunas';
                const isPendingVerif = inv.status === 'Menunggu Verifikasi';
                return `
                  <tr class="hover:bg-slate-800/40">
                    <td class="py-3 px-4 font-mono font-bold text-indigo-300">${inv.id}</td>
                    <td class="py-3 px-4 font-semibold text-white">${inv.studentName}<br><span class="text-[11px] text-slate-400">${inv.parentName}</span></td>
                    <td class="py-3 px-4 text-slate-300">${inv.packageName}</td>
                    <td class="py-3 px-4 font-bold text-white">${formatRupiah(inv.amount)}</td>
                    <td class="py-3 px-4 text-slate-400 font-medium">${inv.dueDate}</td>
                    <td class="py-3 px-4 text-center">
                      <span class="badge-tag ${
                        isPaid ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        isPendingVerif ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse' :
                        'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      } text-[10px] border">
                        ${inv.status}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-center space-x-1.5">
                      ${isPaid ? `
                        <button onclick="window.openReceiptModal('${inv.id}')" class="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold">
                          Kwitansi
                        </button>
                      ` : isPendingVerif ? `
                        <button onclick="window.verifyInvoiceAction('${inv.id}', true)" class="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold">
                          Verifikasi ✓
                        </button>
                      ` : `
                        <button onclick="window.openWhatsAppReminderModal('${inv.id}')" class="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold">
                          Ingatkan WA
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// 2. Invoices Management
function renderBillingInvoices(invoices, students) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>🧾</span> Kelola Tagihan & Invoice SPP Les
          </h2>
          <p class="text-xs text-slate-400 mt-1">Daftar seluruh invoice siswa dan pencatatan pembayaran bulanan</p>
        </div>

        <button onclick="window.showCreateInvoiceForm()" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5">
          <span>➕</span> Buat Tagihan SPP Baru
        </button>
      </div>

      <!-- Create Invoice Box Form (Hidden toggle) -->
      <div id="create_invoice_box" class="glass-card p-5 border border-amber-500/30 hidden space-y-4">
        <h3 class="text-sm font-bold text-white">Form Penerbitan Tagihan Siswa</h3>
        <form onsubmit="window.handleCreateInvoiceSubmit(event)" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Pilih Siswa:</label>
              <select id="inv_student_select" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                ${students.map(s => `<option value="${s.id}" data-name="${s.name}" data-parent="${s.name === 'Kevin Pratama' ? 'Ibu Ratna' : 'Orang Tua'}" data-phone="${s.parentPhone}">${s.name} (${s.grade})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1">Paket Bimbingan Les:</label>
              <select id="inv_package_select" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
                <option value="Paket Intensif SNBT UTBK (12 Sesi)">Paket Intensif SNBT UTBK (12 Sesi) - Rp 1.800.000</option>
                <option value="Paket Reguler SMP / SMA (8 Sesi)">Paket Reguler SMP / SMA (8 Sesi) - Rp 1.200.000</option>
                <option value="Paket Coding & Web Dev (8 Sesi)">Paket Coding & Web Dev (8 Sesi) - Rp 1.400.000</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-300 mb-1">Nominal Tagihan (Rp):</label>
              <input type="number" id="inv_amount_input" required value="1800000" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold" />
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1">Tanggal Jatuh Tempo:</label>
              <input type="date" id="inv_due_date_input" required value="2026-09-10" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="document.getElementById('create_invoice_box').classList.add('hidden')" class="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Batal</button>
            <button type="submit" class="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold shadow-md">Terbitkan Invoice ✓</button>
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${invoices.map(inv => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs font-bold text-indigo-400">${inv.id}</span>
              <span class="badge-tag ${inv.status === 'Lunas' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                ${inv.status}
              </span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">${inv.studentName}</h3>
              <p class="text-xs text-slate-400">${inv.packageName}</p>
            </div>
            <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-400">Total Biaya:</span>
                <span class="font-bold text-white">${formatRupiah(inv.amount)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Jatuh Tempo:</span>
                <span class="text-amber-400 font-semibold">${inv.dueDate}</span>
              </div>
            </div>
            <div class="flex gap-2 pt-1">
              ${inv.status === 'Lunas' ? `
                <button onclick="window.openReceiptModal('${inv.id}')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
                  Cetak Kwitansi Resmi
                </button>
              ` : `
                <button onclick="window.openWhatsAppReminderModal('${inv.id}')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5">
                  <span>💬</span> Kirim Pengingat WA
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.showCreateInvoiceForm = () => {
  const box = document.getElementById('create_invoice_box');
  if (box) box.classList.toggle('hidden');
};

window.handleCreateInvoiceSubmit = (e) => {
  e.preventDefault();
  const select = document.getElementById('inv_student_select');
  const opt = select.options[select.selectedIndex];

  const newInv = {
    studentId: select.value,
    studentName: opt.getAttribute('data-name'),
    parentName: opt.getAttribute('data-parent'),
    parentPhone: opt.getAttribute('data-phone'),
    packageName: document.getElementById('inv_package_select').value,
    subject: 'Bimbingan 1-on-1',
    amount: Number(document.getElementById('inv_amount_input').value),
    dueDate: document.getElementById('inv_due_date_input').value,
    paymentMethod: 'BCA / Mandiri Transfer'
  };

  store.createInvoice(newInv);
  alert('Tagihan invoice SPP baru berhasil diterbitkan!');
};

// 3. Payment Verification
function renderBillingVerification(invoices) {
  const pendingInvoices = invoices.filter(i => i.status === 'Menunggu Verifikasi' || i.status === 'Belum Bayar');

  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>🔍</span> Verifikasi Bukti Pembayaran Siswa
        </h2>
        <p class="text-xs text-slate-400 mt-1">Cek transfer bank dan aktivasi status lunas</p>
      </div>

      <div class="space-y-4">
        ${pendingInvoices.map(inv => `
          <div class="glass-card p-5 space-y-4 border border-slate-700">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-indigo-400">${inv.id}</span>
                  <span class="badge-tag bg-amber-500/20 text-amber-300 text-[10px]">${inv.status}</span>
                </div>
                <h3 class="text-base font-bold text-white mt-1">${inv.studentName} (${inv.parentName})</h3>
                <p class="text-xs text-slate-400">${inv.packageName} • Nominal: <strong class="text-emerald-400">${formatRupiah(inv.amount)}</strong></p>
              </div>

              <div class="flex gap-2">
                <button onclick="window.verifyInvoiceAction('${inv.id}', false)" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl text-xs font-semibold border border-rose-800/40">
                  Tolak
                </button>
                <button onclick="window.verifyInvoiceAction('${inv.id}', true)" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30">
                  Setujui & Tandai Lunas ✓
                </button>
              </div>
            </div>

            <div class="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-4 text-xs">
              <div class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-xl">
                💳
              </div>
              <div>
                <div class="font-bold text-slate-200">Metode: ${inv.paymentMethod}</div>
                <div class="text-slate-400 text-[11px]">Waktu Bayar: ${inv.paymentDate || 'Konfirmasi transfer terlampir'}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.verifyInvoiceAction = (invoiceId, isApproved) => {
  store.verifyPayment(invoiceId, isApproved);
  alert(isApproved ? 'Pembayaran berhasil diverifikasi! Kwitansi resmi telah diterbitkan.' : 'Bukti pembayaran ditolak.');
};

// 4. Tutor Payroll
function renderBillingPayroll(payouts) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>💼</span> Penggajian & Honorarium Tutor Privat
        </h2>
        <p class="text-xs text-slate-400 mt-1">Penghitungan otomatis fee per jam/sesi les yang berhasil terlaksana</p>
      </div>

      <div class="space-y-4">
        ${payouts.map(p => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span class="badge-tag ${p.status === 'Sudah Ditransfer' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'} text-[10px]">
                  ${p.status}
                </span>
                <h3 class="text-base font-bold text-white mt-1">${p.tutorName}</h3>
                <p class="text-xs text-slate-400">Rekening: <strong class="text-white">${p.bankAccount}</strong></p>
              </div>

              <div class="text-right">
                <div class="text-xs text-slate-400">Total Honor:</div>
                <div class="text-2xl font-black text-emerald-400">${formatRupiah(p.totalPayout)}</div>
              </div>
            </div>

            <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span class="text-slate-400">Jumlah Sesi:</span>
                <div class="font-bold text-white">${p.completedSessionsThisMonth} Sesi Selesai</div>
              </div>
              <div>
                <span class="text-slate-400">Tarif per Sesi:</span>
                <div class="font-bold text-white">${formatRupiah(p.ratePerSession)}</div>
              </div>
              <div>
                <span class="text-slate-400">Bonus Insentif:</span>
                <div class="font-bold text-amber-400">+ ${formatRupiah(p.bonusIncentive)}</div>
              </div>
            </div>

            ${p.status !== 'Sudah Ditransfer' ? `
              <div class="pt-2 flex justify-end">
                <button onclick="window.handleTransferPayroll('${p.id}')" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
                  Cairkan Honor Tutor Sekarang ✓
                </button>
              </div>
            ` : `
              <div class="text-[11px] text-emerald-400 font-semibold pt-1">
                ✓ Honor telah ditransfer pada ${p.transferDate}
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.handleTransferPayroll = (payoutId) => {
  store.processTutorPayout(payoutId);
  alert('Honor tutor berhasil ditransfer dan status diperbarui!');
};

// 5. Financial Reports
function renderBillingReports(stats, invoices) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span>📈</span> Laporan Arus Kas & Keuangan Lembaga
          </h2>
          <p class="text-xs text-slate-400 mt-1">Ringkasan laba rugi dan pembukuan les privat</p>
        </div>
        <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md">
          🖨️ Cetak Laporan Keuangan
        </button>
      </div>

      <div class="glass-card p-6 space-y-4">
        <h3 class="text-sm font-bold text-white">Ringkasan Pembukuan Periode Ini:</h3>
        <div class="divide-y divide-slate-800 text-xs">
          <div class="py-3 flex justify-between">
            <span class="text-slate-300">Total Penerimaan SPP & Paket Les:</span>
            <span class="font-bold text-emerald-400 text-sm">${formatRupiah(stats.totalRevenueMonth)}</span>
          </div>
          <div class="py-3 flex justify-between">
            <span class="text-slate-300">Total Beban Honor Guru (Tutor Payroll):</span>
            <span class="font-bold text-rose-400 text-sm">- ${formatRupiah(stats.totalTutorPayouts)}</span>
          </div>
          <div class="py-3 flex justify-between bg-slate-900/60 px-3 rounded-lg font-bold">
            <span class="text-white text-sm">SURPLUS BERSIH (PROFIT):</span>
            <span class="text-cyan-400 text-base">${formatRupiah(stats.netProfit)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 6. WhatsApp Reminders
function renderBillingWhatsApp(invoices) {
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span>📱</span> Generator Pengingat Tagihan WhatsApp
        </h2>
        <p class="text-xs text-slate-400 mt-1">Kirimkan format pesan penagihan resmi yang sopan dan terstruktur ke orang tua siswa</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${invoices.map(inv => `
          <div class="glass-card p-5 space-y-3 border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white text-sm">${inv.parentName}</span>
              <span class="badge-tag bg-emerald-500/20 text-emerald-300 text-[10px]">${inv.parentPhone}</span>
            </div>
            <div class="text-xs text-slate-400">
              Siswa: <strong class="text-white">${inv.studentName}</strong> • ${inv.packageName}
            </div>
            <div class="text-xs font-bold text-amber-400">
              Nominal: ${formatRupiah(inv.amount)} (Jatuh Tempo: ${inv.dueDate})
            </div>
            <button onclick="window.openWhatsAppReminderModal('${inv.id}')" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md">
              <span>💬</span> Buka Template & Kirim Pesan WA
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
