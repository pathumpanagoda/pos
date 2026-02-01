import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#0f0f12', // Premium dark
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // For easier prototyping
        },
        frame: true,
        titleBarStyle: 'hidden', // For custom header look
        title: 'Retail POS',
        show: false, // Wait for ready-to-show
    });
    win.loadURL(isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`);
    win.once('ready-to-show', () => {
        win.show();
    });
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
//# sourceMappingURL=main.js.map