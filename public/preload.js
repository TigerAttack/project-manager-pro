const { contextBridge, ipcRenderer } = require('electron');

// تعريض APIs آمنة للعملية الرئيسية
contextBridge.exposeInMainWorld('electronAPI', {
  // APIs للتفاعل مع النظام
  platform: process.platform,
  
  // APIs لإدارة الملفات (سيتم إضافتها لاحقاً)
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  loadFile: () => ipcRenderer.invoke('load-file'),
  
  // APIs للإشعارات
  showNotification: (title, body) => ipcRenderer.invoke('show-notification', { title, body }),
  
  // APIs لإدارة النوافذ
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // APIs للتحديثات (سيتم إضافتها لاحقاً)
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  
  // مستمعات الأحداث
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
  
  // إزالة المستمعات
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

