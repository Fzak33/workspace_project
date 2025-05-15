import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';
import Header from './components/Header';
import Login from './components/Login';
import TimeOff from './components/TimeOff';
import ManageDepartment from './components/ManageDepartment';
import Finance from './components/Finance';
import Dashboard from './components/HRDashboard';


// Layout component to wrap authenticated pages
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-area">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return (
    <div className="app">
      <Routes>
        {/* Redirect root to dashboard or login */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') 
              ? <Navigate to="/Dashboard" replace /> 
              : <Navigate to="/login" replace />
          }
        />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute><ManageDepartment /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/time-off" element={<ProtectedRoute><TimeOff /></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
 
      </Routes>
    </div>
  );
}

export default App;