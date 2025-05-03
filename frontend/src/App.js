import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';
import Header from './components/Header';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TimeOff from './components/TimeOff';


function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {!isLoginPage && <Sidebar />}
      <div className="main-content">
        {!isLoginPage && <Header />}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
          path="/time-off"
          element={
             <ProtectedRoute>
                <TimeOff />
              </ProtectedRoute>
              
  }
/>

          
          {/* باقي التبويبات لاحقاً */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
