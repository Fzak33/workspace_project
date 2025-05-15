import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function HRLayout() {
  const location = useLocation();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {/* عرض الهيدر في كل الصفحات ما عدا الداشبورد إذا كنت تريد ذلك */}
        {location.pathname !== '/Dashboard' && <Header />}
        <Outlet />
      </div>
    </div>
  );
}

export default HRLayout;
