import React from 'react';
import Sidebar from '../employee/Pages/Dashboard/components/Sidebar/Sidebar';
import './Layout.css'; 
function EmployeeLayout({ children }) {
  return (
    <div className="employee-layout">
      <Sidebar />
      <div className="content-area">
        {children}
      </div>
    </div>
  );
}

export default EmployeeLayout;

// frontend\src\employee\Pages\Dashboard\components\Sidebar\Sidebar.js