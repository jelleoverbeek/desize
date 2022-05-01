import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  // eslint-disable-next-line no-console
  console.error('Something went wrong when rendering the app.');
}

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg: unknown[]) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.myPing();
