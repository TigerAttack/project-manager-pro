const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // إنشاء نافذة المتصفح الرئيسية
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'), // سيتم إضافة الأيقونة لاحقاً
    titleBarStyle: 'default',
    show: false // لا تظهر النافذة حتى تكون جاهزة
  });

  // تحميل التطبيق
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // فتح أدوات المطور في وضع التطوير
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // إظهار النافذة عندما تكون جاهزة
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // إزالة شريط القوائم الافتراضي
  if (process.platform !== 'darwin') {
    mainWindow.setMenuBarVisibility(false);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// هذا الحدث سيتم استدعاؤه عندما يكون Electron جاهزاً
// لإنشاء نوافذ المتصفح
app.whenReady().then(createWindow);

// الخروج عندما يتم إغلاق جميع النوافذ
app.on('window-all-closed', () => {
  // على macOS من الشائع أن تبقى التطبيقات نشطة
  // حتى عندما يتم إغلاق جميع نوافذها
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // على macOS من الشائع إعادة إنشاء نافذة في التطبيق
  // عندما يتم النقر على أيقونة dock ولا توجد نوافذ أخرى مفتوحة
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// إعداد قائمة التطبيق لـ macOS
if (process.platform === 'darwin') {
  const template = [
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

