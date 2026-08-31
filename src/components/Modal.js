// Modal Component & Interactive Dialogs
import { store } from '../store/dataStore.js';

let currentQuizState = {
  quizId: null,
  currentIndex: 0,
  selectedAnswers: {},
  timeLeftSeconds: 0,
  timerInterval: null
};

export function showModal(htmlContent) {
  let modalContainer = document.getElementById('global-modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'global-modal-container';
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        ${htmlContent}
      </div>
    </div>
  `;
}

export function closeModal() {
  if (currentQuizState.timerInterval) {
    clearInterval(currentQuizState.timerInterval);
    currentQuizState.timerInterval = null;
  }
  const modalContainer = document.getElementById('global-modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = '';
  }
}

// 1. Interactive Quiz Runner
export function openQuizRunner(quizId) {
  const quiz = store.data.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  currentQuizState = {
    quizId: quizId,
    currentIndex: 0,
    selectedAnswers: {},
    timeLeftSeconds: quiz.timeLimitMinutes * 60,
    timerInterval: null
  };

  renderQuizStep(quiz);

  currentQuizState.timerInterval = setInterval(() => {
    currentQuizState.timeLeftSeconds--;
    const timerElem = document.getElementById('quiz-timer-display');
    if (timerElem) {
      const minutes = Math.floor(currentQuizState.timeLeftSeconds / 60);
      const seconds = currentQuizState.timeLeftSeconds % 60;
      timerElem.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    if (currentQuizState.timeLeftSeconds <= 0) {
      clearInterval(currentQuizState.timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function renderQuizStep(quiz) {
  const q = quiz.questions[currentQuizState.currentIndex];
  const total = quiz.questions.length;
  const currentAnswer = currentQuizState.selectedAnswers[currentQuizState.currentIndex];

  const html = `
    <div class="p-5 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-b border-slate-700 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-white">${quiz.title}</h3>
        <p class="text-xs text-indigo-300">${quiz.subject} • Soal ${currentQuizState.currentIndex + 1} dari ${total}</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-black/40 border border-indigo-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
          <span class="text-amber-400">⏱️</span>
          <span id="quiz-timer-display" class="font-mono text-sm font-bold text-white">--:--</span>
        </div>
        <button onclick="window.closeModal()" class="text-slate-400 hover:text-white text-lg font-bold p-1">✕</button>
      </div>
    </div>

    <div class="p-6 overflow-y-auto space-y-6 flex-1">
      <!-- Progress Bar -->
      <div class="w-full bg-slate-800 rounded-full h-2">
        <div class="bg-indigo-500 h-2 rounded-full transition-all duration-300" style="width: ${((currentQuizState.currentIndex + 1) / total) * 100}%"></div>
      </div>

      <!-- Question Text -->
      <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-slate-100 text-sm md:text-base font-medium leading-relaxed">
        ${q.question}
      </div>

      <!-- Options -->
      <div class="space-y-3">
        ${q.options.map((opt, idx) => `
          <label class="flex items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
            currentAnswer === idx
              ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500'
              : 'bg-slate-800/40 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
          }">
            <input type="radio" name="quiz_opt" value="${idx}" ${currentAnswer === idx ? 'checked' : ''} 
                   onchange="window.selectQuizAnswer(${idx})" class="hidden" />
            <div class="w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              currentAnswer === idx ? 'border-indigo-400 bg-indigo-500' : 'border-slate-500'
            }">
              ${currentAnswer === idx ? '<span class="w-2 h-2 rounded-full bg-white"></span>' : ''}
            </div>
            <span class="text-sm font-medium">${opt}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
      <button onclick="window.prevQuizQuestion()" 
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              ${currentQuizState.currentIndex === 0 ? 'disabled' : ''}>
        ← Sebelumnya
      </button>

      <div class="flex gap-1.5">
        ${quiz.questions.map((_, i) => `
          <button onclick="window.jumpQuizQuestion(${i})" class="w-7 h-7 rounded-lg text-xs font-bold transition-all ${
            i === currentQuizState.currentIndex
              ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
              : currentQuizState.selectedAnswers[i] !== undefined
              ? 'bg-emerald-600/50 text-emerald-200'
              : 'bg-slate-800 text-slate-400'
          }">
            ${i + 1}
          </button>
        `).join('')}
      </div>

      ${currentQuizState.currentIndex === total - 1 ? `
        <button onclick="window.finishQuiz()" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30">
          Selesai & Kumpulkan ✓
        </button>
      ` : `
        <button onclick="window.nextQuizQuestion()" class="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white">
          Selanjutnya →
        </button>
      `}
    </div>
  `;

  showModal(html);
}

window.selectQuizAnswer = (idx) => {
  currentQuizState.selectedAnswers[currentQuizState.currentIndex] = idx;
  const quiz = store.data.quizzes.find(q => q.id === currentQuizState.quizId);
  renderQuizStep(quiz);
};

window.nextQuizQuestion = () => {
  const quiz = store.data.quizzes.find(q => q.id === currentQuizState.quizId);
  if (currentQuizState.currentIndex < quiz.questions.length - 1) {
    currentQuizState.currentIndex++;
    renderQuizStep(quiz);
  }
};

window.prevQuizQuestion = () => {
  const quiz = store.data.quizzes.find(q => q.id === currentQuizState.quizId);
  if (currentQuizState.currentIndex > 0) {
    currentQuizState.currentIndex--;
    renderQuizStep(quiz);
  }
};

window.jumpQuizQuestion = (i) => {
  const quiz = store.data.quizzes.find(q => q.id === currentQuizState.quizId);
  currentQuizState.currentIndex = i;
  renderQuizStep(quiz);
};

window.finishQuiz = () => {
  if (currentQuizState.timerInterval) {
    clearInterval(currentQuizState.timerInterval);
    currentQuizState.timerInterval = null;
  }

  const quiz = store.data.quizzes.find(q => q.id === currentQuizState.quizId);
  if (!quiz) return;

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (currentQuizState.selectedAnswers[idx] === q.correctAnswerIndex) {
      correctCount++;
    }
  });

  const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
  store.submitQuizScore(quiz.id, finalScore, currentQuizState.selectedAnswers);

  // Trigger celebration confetti if available
  if (window.confetti && finalScore >= 70) {
    window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }

  const isPassed = finalScore >= quiz.passScore;

  const resultHtml = `
    <div class="p-6 text-center space-y-5">
      <div class="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl ${
        isPassed ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
      }">
        ${isPassed ? '🎉' : '📖'}
      </div>

      <div>
        <h3 class="text-xl font-extrabold text-white">${isPassed ? 'Luar Biasa! Kamu Lulus Kuis!' : 'Terus Semangat Belajar!'}</h3>
        <p class="text-xs text-slate-400 mt-1">${quiz.title}</p>
      </div>

      <div class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 inline-block px-10">
        <div class="text-xs uppercase font-bold text-slate-400 tracking-wider">Nilai Akhir Kamu</div>
        <div class="text-4xl font-extrabold mt-1 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}">${finalScore}</div>
        <div class="text-xs text-slate-400 mt-1">Benar ${correctCount} dari ${quiz.questions.length} Soal • +${finalScore * 5} XP Belajar</div>
      </div>

      <div class="text-left bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-3 max-h-48 overflow-y-auto">
        <div class="font-bold text-slate-300">Ringkasan Pembahasan Soal:</div>
        ${quiz.questions.map((q, idx) => {
          const userAns = currentQuizState.selectedAnswers[idx];
          const isCorrect = userAns === q.correctAnswerIndex;
          return `
            <div class="p-2.5 rounded-lg ${isCorrect ? 'bg-emerald-950/40 border border-emerald-800/40' : 'bg-rose-950/40 border border-rose-800/40'}">
              <div class="flex items-center justify-between font-semibold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}">
                <span>Soal ${idx + 1}: ${isCorrect ? '✓ Jawaban Tepat' : '✗ Jawaban Belum Tepat'}</span>
              </div>
              <p class="text-slate-300 mt-1">${q.question}</p>
              <div class="text-slate-400 mt-1 text-[11px]"><strong class="text-indigo-300">Pembahasan:</strong> ${q.explanation}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="pt-3">
        <button onclick="window.closeModal()" class="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30">
          Tutup & Kembali ke Menu Kuis
        </button>
      </div>
    </div>
  `;

  showModal(resultHtml);
};

// 2. Material Viewer Modal
export function openMaterialViewer(materialId) {
  const mat = store.data.materials.find(m => m.id === materialId);
  if (!mat) return;

  const html = `
    <div class="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="p-2 rounded-lg ${mat.type === 'pdf' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'} font-bold text-xs">
          ${mat.type.toUpperCase()}
        </span>
        <div>
          <h3 class="text-sm font-bold text-white">${mat.title}</h3>
          <p class="text-[11px] text-slate-400">${mat.subject} • Tutor: ${mat.tutorName}</p>
        </div>
      </div>
      <button onclick="window.closeModal()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
    </div>

    <div class="p-6 space-y-4">
      ${mat.type === 'video' ? `
        <div class="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700">
          <iframe class="w-full h-full" src="${mat.videoUrl}" title="${mat.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      ` : `
        <div class="bg-slate-800/80 p-6 rounded-xl border border-slate-700 space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-20 bg-rose-950/60 border border-rose-700/60 rounded-lg flex flex-col items-center justify-center text-rose-400 shadow-inner">
              <span class="text-2xl">📄</span>
              <span class="text-[10px] font-bold mt-1">PDF DOC</span>
            </div>
            <div>
              <div class="text-sm font-bold text-white">${mat.title}</div>
              <div class="text-xs text-slate-400 mt-1">Ukuran File: ${mat.fileSize || '3.5 MB'} • Diupload: ${mat.uploadDate}</div>
              <div class="mt-3 flex gap-2">
                <button onclick="alert('File modul ${mat.title} berhasil diunduh ke perangkat Anda!')" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  📥 Download Modul PDF
                </button>
              </div>
            </div>
          </div>
          <div class="text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
            <strong class="text-indigo-400">Ringkasan Materi:</strong> ${mat.summary}
          </div>
        </div>
      `}
    </div>
  `;

  showModal(html);
}

// 3. Assignment Submission Modal
export function openAssignmentSubmission(assignmentId) {
  const asg = store.data.assignments.find(a => a.id === assignmentId);
  if (!asg) return;

  const html = `
    <div class="p-5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-white">Kumpulkan Tugas</h3>
        <p class="text-xs text-slate-400">${asg.title}</p>
      </div>
      <button onclick="window.closeModal()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
    </div>

    <form onsubmit="window.handleAssignmentSubmit(event, '${asg.id}')" class="p-6 space-y-4">
      <div class="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
        <strong class="text-white">Instruksi Guru:</strong> ${asg.instructions}
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">Catatan / Jawaban Tugas:</label>
        <textarea id="submission_notes" required rows="4" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500" placeholder="Tuliskan link Google Drive / catatan penyelesaian tugas kamu di sini..."></textarea>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">Lampirkan File / Foto Pengerjaan:</label>
        <div class="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-4 text-center cursor-pointer bg-slate-800/30">
          <span class="text-2xl">📁</span>
          <p class="text-xs text-slate-400 mt-1">Klik untuk memilih file PDF / JPG / PNG hasil tugas</p>
          <input type="file" class="hidden" id="submission_file" onchange="document.getElementById('file_chosen_label').innerText = this.files[0]?.name || 'File terpilih'" />
          <button type="button" onclick="document.getElementById('submission_file').click()" class="mt-2 px-3 py-1 bg-slate-700 text-white rounded-lg text-[11px] font-semibold">Pilih Berkas</button>
          <div id="file_chosen_label" class="text-[11px] text-indigo-400 mt-1">Tugas_Matematika_Kevin.pdf (Contoh Siap Upload)</div>
        </div>
      </div>

      <div class="pt-2 flex justify-end gap-2">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Batal</button>
        <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30">Kirim Tugas Sekarang ✓</button>
      </div>
    </form>
  `;

  showModal(html);
}

window.handleAssignmentSubmit = (e, assignmentId) => {
  e.preventDefault();
  const notes = document.getElementById('submission_notes').value;
  store.submitAssignment(assignmentId, notes);
  closeModal();
  alert('Tugas berhasil dikumpulkan ke Kak Sarah untuk diperiksa!');
};

// 4. Tutor Schedule Creation Modal
export function openCreateScheduleModal() {
  const students = store.data.users.students;

  const html = `
    <div class="p-5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-white">Buat Sesi Les Privat Baru</h3>
        <p class="text-xs text-slate-400">Jadwalkan sesi 1-on-1 dengan murid</p>
      </div>
      <button onclick="window.closeModal()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
    </div>

    <form onsubmit="window.handleCreateSchedule(event)" class="p-6 space-y-4 text-xs">
      <div>
        <label class="block font-bold text-slate-300 mb-1">Pilih Murid:</label>
        <select id="sch_student_id" required class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
          ${students.map(s => `<option value="${s.id}" data-name="${s.name}">${s.name} (${s.grade})</option>`).join('')}
        </select>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Judul Topik / Materi Les:</label>
        <input type="text" id="sch_title" required placeholder="Contoh: Pembahasan Soal HOTS Integral Substitusi" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">Mata Pelajaran:</label>
          <select id="sch_subject" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
            <option value="Matematika SMA">Matematika SMA</option>
            <option value="Fisika SMA">Fisika SMA</option>
            <option value="Bahasa Inggris">Bahasa Inggris (IELTS)</option>
            <option value="Coding Python">Coding Python</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-slate-300 mb-1">Platform:</label>
          <select id="sch_platform" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
            <option value="Google Meet">Google Meet</option>
            <option value="Zoom Online">Zoom Online</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">Tanggal Sesi:</label>
          <input type="date" id="sch_date" required class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" value="2026-09-03" />
        </div>
        <div>
          <label class="block font-bold text-slate-300 mb-1">Waktu Mulai:</label>
          <input type="time" id="sch_time" required class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" value="16:00" />
        </div>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Link Room Video Call (Google Meet / Zoom):</label>
        <input type="url" id="sch_meet_url" required value="https://meet.google.com/abc-privat-sarah" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Catatan Persiapan untuk Murid:</label>
        <input type="text" id="sch_note" placeholder="Contoh: Bawa buku latihan dan kalkulator" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white" />
      </div>

      <div class="pt-2 flex justify-end gap-2">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Batal</button>
        <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30">Terbitkan Jadwal ✓</button>
      </div>
    </form>
  `;

  showModal(html);
}

window.handleCreateSchedule = (e) => {
  e.preventDefault();
  const selectStudent = document.getElementById('sch_student_id');
  const studentName = selectStudent.options[selectStudent.selectedIndex].getAttribute('data-name');
  const studentId = selectStudent.value;

  const newSchedule = {
    title: document.getElementById('sch_title').value,
    subject: document.getElementById('sch_subject').value,
    studentName: studentName,
    studentId: studentId,
    tutorName: store.data.currentUser.name || 'Kak Sarah Amalia, M.Sc',
    tutorId: store.data.currentUser.id || 'usr_tutor_1',
    date: document.getElementById('sch_date').value,
    time: document.getElementById('sch_time').value + ' - ' + '17:30 WIB',
    platform: document.getElementById('sch_platform').value,
    meetUrl: document.getElementById('sch_meet_url').value,
    note: document.getElementById('sch_note').value || 'Siapkan materi terkait.'
  };

  store.addSchedule(newSchedule);
  closeModal();
  alert('Jadwal les baru berhasil ditambahkan dan otomatis tersinkron ke murid & orang tua!');
};

// 5. Official Receipt Modal Generator (App 5)
export function openReceiptModal(invoiceId) {
  const inv = store.data.billingData.invoices.find(i => i.id === invoiceId);
  if (!inv) return;

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const html = `
    <div class="p-6 printable-area bg-white text-slate-900 rounded-2xl space-y-6">
      <div class="flex justify-between items-start border-b border-slate-200 pb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl">P</div>
          <div>
            <h2 class="text-xl font-bold text-indigo-900">PRIVATGO INDONESIA</h2>
            <p class="text-xs text-slate-500">Kwitansi Resmi Pembayaran Les Privat & E-Learning</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs uppercase font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">LUNAS / VERIFIED</div>
          <div class="text-xs text-slate-500 mt-1 font-mono">${inv.receiptNumber || 'RCP-' + Date.now().toString().slice(-8)}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div class="text-slate-500 font-semibold">Telah Diterima Dari:</div>
          <div class="font-bold text-sm text-slate-800">${inv.parentName} (${inv.studentName})</div>
          <div class="text-slate-500">Kontak: ${inv.parentPhone}</div>
        </div>
        <div class="text-right">
          <div class="text-slate-500 font-semibold">No. Tagihan:</div>
          <div class="font-bold text-slate-800">${inv.id}</div>
          <div class="text-slate-500">Tanggal Bayar: ${inv.paymentDate || '28 Agu 2026'}</div>
        </div>
      </div>

      <table class="w-full text-xs border-collapse">
        <thead>
          <tr class="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
            <th class="py-2.5 px-3 text-left">Deskripsi Layanan</th>
            <th class="py-2.5 px-3 text-left">Mata Pelajaran</th>
            <th class="py-2.5 px-3 text-right">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-3 px-3 font-semibold text-slate-800">${inv.packageName}</td>
            <td class="py-3 px-3 text-slate-600">${inv.subject}</td>
            <td class="py-3 px-3 text-right font-bold text-slate-900">${formatRupiah(inv.amount)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="py-3 px-3 text-right font-bold text-sm">TOTAL PEMBAYARAN:</td>
            <td class="py-3 px-3 text-right font-bold text-base text-indigo-600">${formatRupiah(inv.amount)}</td>
          </tr>
        </tfoot>
      </table>

      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
        <div>
          <strong>Metode Pembayaran:</strong> ${inv.paymentMethod}
        </div>
        <div class="text-emerald-600 font-bold">
          ✓ Transaksi Sah & Terverifikasi
        </div>
      </div>

      <div class="flex justify-between items-end pt-4 border-t border-slate-200 text-xs">
        <div class="text-slate-400 text-[10px]">
          PrivatGo Education System • Cetak otomatis dari sistem
        </div>
        <div class="text-center">
          <div class="text-[11px] text-slate-500">Bagian Keuangan & Administrasi</div>
          <div class="font-bold text-indigo-900 mt-6 underline">Finance PrivatGo</div>
        </div>
      </div>

      <div class="pt-4 flex justify-end gap-2 no-print border-t border-slate-200">
        <button onclick="window.closeModal()" class="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold">Tutup</button>
        <button onclick="window.print()" class="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
          🖨️ Cetak / Simpan PDF
        </button>
      </div>
    </div>
  `;

  showModal(html);
}

// 6. WhatsApp Reminder Modal Generator (App 5)
export function openWhatsAppReminderModal(invoiceId) {
  const inv = store.data.billingData.invoices.find(i => i.id === invoiceId);
  if (!inv) return;

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const rawMessage = `Halo ${inv.parentName}, salam hangat dari Tim PrivatGo 🙏\n\nKami menginformasikan tagihan les privat ananda *${inv.studentName}* untuk *${inv.packageName}* sebesar *${formatRupiah(inv.amount)}* dengan no invoice *${inv.id}* yang jatuh tempo pada tanggal *${inv.dueDate}*.\n\nPembayaran dapat ditransfer melalui:\n💳 BCA: 880123987654 (a.n PT PrivatGo Edukasi)\n💳 Bank Mandiri: 1370098765432\n\nSetelah melakukan transfer, silakan upload bukti pembayaran di portal atau balas chat ini ya. Terima kasih banyak!`;

  const encodedMessage = encodeURIComponent(rawMessage);
  const cleanPhone = inv.parentPhone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const waUrl = `https://wa.me/${waPhone}?text=${encodedMessage}`;

  const html = `
    <div class="p-5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl text-emerald-400">📱</span>
        <div>
          <h3 class="text-base font-bold text-white">Generator Pengingat WhatsApp</h3>
          <p class="text-xs text-slate-400">Kirim notifikasi tagihan langsung ke nomor orang tua</p>
        </div>
      </div>
      <button onclick="window.closeModal()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
    </div>

    <div class="p-6 space-y-4 text-xs">
      <div class="bg-emerald-950/40 border border-emerald-800/50 p-3.5 rounded-xl text-emerald-200 flex items-center justify-between">
        <div>
          <div class="font-bold text-white">Tujuan WhatsApp:</div>
          <div>${inv.parentName} (${inv.parentPhone})</div>
        </div>
        <span class="badge-tag bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Format Pesan Resmi</span>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Pratinjau Teks WhatsApp:</label>
        <textarea readonly rows="8" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed select-all">${rawMessage}</textarea>
      </div>

      <div class="pt-2 flex justify-end gap-2">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Tutup</button>
        <a href="${waUrl}" target="_blank" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 no-underline">
          <span class="text-sm">💬</span> Buka di WhatsApp Web / App
        </a>
      </div>
    </div>
  `;

  showModal(html);
}

// 7. Tutor Grading Modal
export function openGradingModal(assignmentId) {
  const asg = store.data.assignments.find(a => a.id === assignmentId);
  if (!asg) return;

  const html = `
    <div class="p-5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-white">Koreksi & Nilai Tugas Siswa</h3>
        <p class="text-xs text-slate-400">${asg.title} • Siswa: Kevin Pratama</p>
      </div>
      <button onclick="window.closeModal()" class="text-slate-400 hover:text-white font-bold p-1">✕</button>
    </div>

    <form onsubmit="window.handleGradeSubmit(event, '${asg.id}')" class="p-6 space-y-4 text-xs">
      <div class="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
        <div class="font-bold text-slate-300 mb-1">Catatan Pengerjaan dari Siswa:</div>
        <p class="text-slate-400 italic">"${asg.studentNotes || 'Kak Sarah, saya sudah menyelesaikan 10 soal eliminasi matriks di kertas dan rumus eliminasi Gauss di lembar kedua.'}"</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">Skor / Nilai (0 - 100):</label>
          <input type="number" id="grade_score" min="0" max="100" required value="${asg.score || 95}" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-base" />
        </div>
        <div>
          <label class="block font-bold text-slate-300 mb-1">Status Kelulusan Tugas:</label>
          <select class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white">
            <option value="Sangat Memuaskan">Sangat Memuaskan (A)</option>
            <option value="Baik">Baik (B)</option>
            <option value="Perlu Perbaikan">Perlu Perbaikan (C)</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Ulasan / Masukan Edukatif Tutor:</label>
        <textarea id="grade_feedback" rows="3" required class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500">${asg.feedback || 'Pengerjaan sangat rapi! Pada soal nomor 7 eliminasi Gauss-Jordan kamu sangat efisien. Pertahankan ketelitian ini untuk UTBK!'}</textarea>
      </div>

      <div class="pt-2 flex justify-end gap-2">
        <button type="button" onclick="window.closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Batal</button>
        <button type="submit" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30">Simpan Nilai & Beri Ulasan ✓</button>
      </div>
    </form>
  `;

  showModal(html);
}

window.handleGradeSubmit = (e, assignmentId) => {
  e.preventDefault();
  const score = Number(document.getElementById('grade_score').value);
  const feedback = document.getElementById('grade_feedback').value;
  store.gradeAssignment(assignmentId, score, feedback);
  closeModal();
  alert('Nilai dan ulasan tugas berhasil disimpan dan langsung terlihat oleh siswa dan orang tua!');
};
