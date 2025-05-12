import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';
import Sidebar from './Pages/Dashboard/components/Sidebar/Sidebar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Header/>
    
    <App/>
    
    
  </React.StrictMode>

);


