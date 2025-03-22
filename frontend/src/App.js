import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';

function App() {
  const [activePage, setActivePage] = useState('Employees');

  const renderPage = () => {
    switch (activePage) {
      case 'Employees':
      case 'Manage Employees':
        return <AddEmployee />;
      case 'Attendance':
        return <Attendance />;
      default:
        return <div><h2>Welcome to HR System</h2></div>;
    }
  };

  return (
    <div className="app">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;