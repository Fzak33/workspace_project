import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Workspace HR</h1>
      <div className="user-section">
        <span className="notification-bell">🔔</span>
        <img
          src="https://via.placeholder.com/40" // استبدلها برابط صورة حقيقية إذا أردت
          alt="Employee"
          className="employee-pic"
        />
      </div>
    </header>
  );
}

export default Header;