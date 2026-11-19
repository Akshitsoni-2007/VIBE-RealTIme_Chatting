import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

const BootScreen = () => (
  <div className="flex min-h-dvh w-full items-center justify-center bg-ink-950">
    <div className="flex flex-col items-center gap-4">
      <div className="shimmer h-11 w-11 rounded-[14px]" />
      <span className="text-2xs font-semibold uppercase tracking-[0.28em] text-mist-600">
        VIBE
      </span>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<BootScreen />} persistor={persistor}>
        <App />
        <Toaster
          position="top-center"
          gutter={10}
          containerStyle={{ top: 18 }}
          toastOptions={{
            duration: 3200,
            style: {
              background: '#141924',
              color: '#eef0f6',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '14px',
              padding: '11px 14px',
              fontSize: '13.5px',
              fontWeight: 500,
              maxWidth: '420px',
              boxShadow: '0 22px 48px -22px rgba(0,0,0,0.95)',
            },
            success: {
              iconTheme: { primary: '#7c6bf5', secondary: '#eef0f6' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#141924' },
            },
          }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
