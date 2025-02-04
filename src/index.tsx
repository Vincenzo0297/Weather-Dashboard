import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this matches your App.tsx filename
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
