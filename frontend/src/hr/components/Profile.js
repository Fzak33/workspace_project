import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Employee } from '../../models/employee-model';

function Profile() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('employee');
    if (stored) {
      const parsed = JSON.parse(stored);
      const emp = Employee.fromJson(parsed);
      setEmployee(emp);
    }
  }, []);

  return (
    <div className="profile-page">
      <h2>Profile Settings</h2>
      {employee && (
        <div className="profile-card">
          <div className="profile-info">
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Department: {employee.department}</p>
            <p>Position: {employee.position}</p>
            <p>Status: {employee.status}</p>
            <p>Age: {employee.getAge()} years old</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
