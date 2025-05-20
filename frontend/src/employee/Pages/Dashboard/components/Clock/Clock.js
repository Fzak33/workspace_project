// Clock.js - نسخة مطابقة لمدير HR بعد التعديلات
import React from 'react';
import './Clock.css';

const Clock = ({ isClockedIn, currentTime, clockInTime, clockOutTime, handleClockInOut }) => {
  return (
    <div className="Dashboard-clock-container">
      <div className="clock-header">
        <h2>Clock In/Out</h2>
        <div className="current-time">
          {clockInTime ? clockInTime.toLocaleTimeString() : currentTime.toLocaleTimeString()} {currentTime.toLocaleDateString()}
        </div>
      </div>
      <div className="clock-details">
        <div className="time-row"><span>First In</span><span>{clockInTime ? clockInTime.toLocaleTimeString() : '--:--:--'}</span></div>
        <div className="time-row"><span>Last Out</span><span>{clockOutTime ? clockOutTime.toLocaleTimeString() : '--:--:--'}</span></div>
      </div>
      <button className={`clock-button ${isClockedIn ? 'clocked-in' : ''}`} onClick={handleClockInOut}>
        {isClockedIn ? <>Clock Out <span className="arrow left-arrow">▶</span></> : <>Clock In <span className="arrow right-arrow">▶</span></>}
      </button>
    </div>
  );
};

export default Clock;
