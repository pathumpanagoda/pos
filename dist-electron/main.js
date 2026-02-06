import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#0f0f12',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Try disabling sandbox to ensure preload works
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: true,
        titleBarStyle: 'hidden',
        title: 'Retail POS',
        show: false,
    });
    console.log('Preload path:', path.join(__dirname, 'preload.js'));
    win.loadURL(isDev
        ? 'http://localhost:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`);
    win.once('ready-to-show', () => {
        win.show();
    });
    if (isDev) {
        // win.webContents.openDevTools({ mode: 'detach' });
    }
}
app.whenReady().then(() => {
    createWindow();
    // IPC Handler for Silent Printing
    ipcMain.on('print-receipt', (event, htmlContent) => {
        const printWindow = new BrowserWindow({
            show: false,
            width: 300,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            }
        });
        const printPage = `
      <html>
        ${htmlContent}
      </html>
    `;
        // Load content via data URI or writing to a temp file is safer, 
        // but direct load helps. 
        // Actually, htmlContent passed from utils/receiptPrinter ALREADY has <html><body>...
        // just loading it might be tricky with loadURL.
        // Better method: load a blank page then write.
        printWindow.loadURL('about:blank');
        printWindow.webContents.once('did-finish-load', () => {
            // We write the HTML structure. 
            // Note: executeJavaScript to write document is standard for this.
            printWindow.webContents.executeJavaScript(`
            document.write(\`${htmlContent.replace(/`/g, '\\`')}\`);
            document.close();
        `);
            // Wait a bit for styles/images then print
            setTimeout(() => {
                printWindow.webContents.print({ silent: true, printBackground: true }, (success, errorType) => {
                    if (!success)
                        console.log("Print failed:", errorType);
                    printWindow.close();
                });
            }, 500);
        });
    });
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