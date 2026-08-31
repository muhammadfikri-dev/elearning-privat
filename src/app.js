// PrivatGo Main Application Controller & Router
import { store } from './store/dataStore.js';
import { renderHeader } from './components/Header.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderStudentPortal } from './portals/student/StudentPortal.js';
import { renderTutorPortal } from './portals/tutor/TutorPortal.js';
import { renderParentPortal } from './portals/parent/ParentPortal.js';
import { renderAdminPortal } from './portals/admin/AdminPortal.js';
import { renderBillingPortal } from './portals/billing/BillingPortal.js';
import {
  openQuizRunner,
  openMaterialViewer,
  openAssignmentSubmission,
  openCreateScheduleModal,
  openReceiptModal,
  openWhatsAppReminderModal,
  openGradingModal,
  closeModal
} from './components/Modal.js';

// Expose modal and global actions to window for inline onclick handlers
window.openQuizRunner = openQuizRunner;
window.openMaterialViewer = openMaterialViewer;
window.openAssignmentSubmission = openAssignmentSubmission;
window.openCreateScheduleModal = openCreateScheduleModal;
window.openReceiptModal = openReceiptModal;
window.openWhatsAppReminderModal = openWhatsAppReminderModal;
window.openGradingModal = openGradingModal;
window.closeModal = closeModal;

let currentTab = 'dashboard';

window.switchPortal = (role) => {
  store.setRole(role);
  currentTab = 'dashboard';
  renderApp();
};

window.navigateTab = (tabId) => {
  currentTab = tabId;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function renderApp() {
  const appRoot = document.getElementById('app');
  if (!appRoot) return;

  const state = store.data;
  const activeRole = state.activeRole;

  let portalContent = '';
  if (activeRole === 'student') {
    portalContent = renderStudentPortal(currentTab);
  } else if (activeRole === 'tutor') {
    portalContent = renderTutorPortal(currentTab);
  } else if (activeRole === 'parent') {
    portalContent = renderParentPortal(currentTab);
  } else if (activeRole === 'admin') {
    portalContent = renderAdminPortal(currentTab);
  } else if (activeRole === 'billing') {
    portalContent = renderBillingPortal(currentTab);
  }

  appRoot.innerHTML = `
    <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      ${renderHeader(state)}
      
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pb-12 flex flex-col lg:flex-row gap-6">
        ${renderSidebar(activeRole, currentTab)}
        <section class="flex-1 min-w-0">
          ${portalContent}
        </section>
      </main>

      <!-- Global Footer -->
      <footer class="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 no-print">
        <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span class="font-bold text-slate-400">PrivatGo E-Learning Suite v1.0</span>
            <span>• Solusi Les Privat & Belajar Mandiri Modern</span>
          </div>
          <div class="text-[11px] text-slate-400">
            Automated Multiplatform Build: Web • Android APK • Windows EXE
          </div>
        </div>
      </footer>
    </div>
  `;
}

// Subscribe to store updates to re-render UI reactively
store.subscribe(() => {
  renderApp();
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// Initial render if already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderApp();
}
