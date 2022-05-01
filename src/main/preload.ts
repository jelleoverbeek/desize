import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    processImage(file: any) {
      ipcRenderer.send('process-image-message', file);
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'process-image-reply'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'process-image-reply'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
    removeEventListener(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'process-image-reply'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.removeListener(channel, (_event, ...args) => func(...args));
      }
    },
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
});
