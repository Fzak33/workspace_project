import React, { useState } from 'react';
import './Attendance.css';

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'John Doe', date: '2025-03-20', status: 'Present' },
    { id: 2, name: 'Jane Smith', date: '2025-03-20', status: 'Absent' },
  ]);

  return (
    <div className="attendance">
      <div className="top-bar">
        <h2>Attendance</h2>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.date}</td>
              <td>
                <span className={`status ${record.status.toLowerCase()}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;