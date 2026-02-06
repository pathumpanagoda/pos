import { contextBridge, ipcRenderer } from 'electron';
console.log('Preload script loaded!');
contextBridge.exposeInMainWorld('electronAPI', {
    printReceipt: (htmlContent) => ipcRenderer.send('print-receipt', htmlContent),
});
//# sourceMappingURL=preload.js.map