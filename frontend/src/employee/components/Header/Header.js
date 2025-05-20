// EmployeeHeader.jsx
import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';
import './EmployeeHeader.css';

function EmployeeHeader() {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(currentDate);

  return (
    <header className="employee-header">
      <div className="employee-header-left">
        <h1 className="employee-header-title">Workspace HR</h1>
      </div>
      
      <div className="employee-header-center">
        <div className="employee-search-bar">
          <FaSearch className="employee-search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <div className="employee-header-right">
        <div className="employee-notification-container">
          <FaBell className="employee-bell-icon" />
          <span className="employee-notification-dot"></span>
        </div>
        
        <div className="employee-date-display">
          {formattedDate}
        </div>
      </div>
    </header>
  );
}

export default EmployeeHeader;