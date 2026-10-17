const { app, BrowserWindow } = require('electron');

const crearVentana = () => {
  const ventana = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  ventana.loadFile('index.html');

  // Descomenta la siguiente línea si quieres abrir las herramientas de desarrollo
  // ventana.webContents.openDevTools();
};

app.whenReady().then(() => {
  crearVentana();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      crearVentana();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
