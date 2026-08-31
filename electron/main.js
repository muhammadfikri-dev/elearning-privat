const { app, BrowserWindow, Menu, ipcMain, shell, Notification } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 868,
    minWidth: 1024,
    minHeight: 700,
    title: 'PrivatGo - Platform E-Learning & Les Privat Terpadu',
    icon: path.join(__dirname, '../assets/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    backgroundColor: '#0F172A',
    show: false
  });

  // Load production file or development server
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // In production or direct file load
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html')).catch(() => {
      mainWindow.loadFile(path.join(__dirname, '../index.html'));
    });
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links (Zoom/Google Meet/WhatsApp) in user's default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  setupAppMenu();
}

function setupAppMenu() {
  const template = [
    {
      label: 'Aplikasi',
      submenu: [
        { label: 'Tentang PrivatGo', role: 'about' },
        { type: 'separator' },
        { label: 'Keluar', role: 'quit' }
      ]
    },
    {
      label: 'Tampilan',
      submenu: [
        { label: 'Muat Ulang', role: 'reload' },
        { label: 'Paksa Muat Ulang', role: 'forceReload' },
        { label: 'Buka DevTools', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Reset Zoom', role: 'resetZoom' },
        { label: 'Perbesar', role: 'zoomIn' },
        { label: 'Perkecil', role: 'zoomOut' },
        { type: 'separator' },
        { label: 'Layar Penuh', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Bantuan',
      submenu: [
        {
          label: 'Dokumentasi & Panduan',
          click: async () => {
            await shell.openExternal('https://github.com');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.on('show-notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body, icon: path.join(__dirname, '../assets/icons/icon.png') }).show();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
