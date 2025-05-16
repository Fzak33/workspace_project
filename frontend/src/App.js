// App.js (Main entry point)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HRApp from './hr/App';
import EmployeeApp from './employee/App';
import Login from './Login';

function App() {
  const role = localStorage.getItem('role');
  console.log("Role from localStorage:", role); // Debugging line

  return (
    <Routes>
     
      <Route path="/employee/*" element={<EmployeeApp />} />
    </Routes>
  );
}

export default App;
