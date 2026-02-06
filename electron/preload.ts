import { contextBridge, ipcRenderer } from 'electron';

console.log('Preload script loaded!');

contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (htmlContent: string) => ipcRenderer.send('print-receipt', htmlContent),
});
