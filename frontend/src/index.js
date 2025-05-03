import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // أضف هذا السطر هنا

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* لف App بداخل BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// قياس الأداء (اختياري)
reportWebVitals();
