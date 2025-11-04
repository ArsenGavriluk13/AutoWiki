import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Імпортує App.jsx
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Імпорт BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      {/* <-- Важливо: App обгорнуто в BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
