import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // إذا ما في توكين، رجّعه على صفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
