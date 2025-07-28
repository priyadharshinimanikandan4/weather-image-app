import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';  // import the provider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>        {/* Wrap App with provider */}
      <App />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
