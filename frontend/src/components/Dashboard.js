import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2024-01-09'));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [clockOutModalNote, setClockOutModalNote] = useState('');
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [clockOutMessage, setClockOutMessage] = useState('');
  const [showAllOffEmployees, setShowAllOffEmployees] = useState(false);
  const [showAllJobApplications, setShowAllJobApplications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDays = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(selectedDate);
      day.setDate(selectedDate.getDate() + i);
      days.push({
        label: `${day.toLocaleString('en', { weekday: 'short' })} ${day.getDate()}`,
        events: getEventsForDay(day),
      });
    }
    return days;
  };

  const getEventsForDay = (day) => {
    const date = day.getDate();
    const events = { Birthday: [], Anniversary: [] };
    if (date === 9) {
      events.Birthday = ['user1.png', 'user2.png'];
      events.Anniversary = ['user3.png'];
    } else if (date === 10) {
      events.Birthday = ['user4.png'];
    } else if (date === 11) {
      events.Anniversary = ['user5.png'];
    } else if (date === 12) {
      events.Birthday = ['user6.png', 'user7.png'];
    }
    return events;
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setIsDatePickerOpen(false);
  };

  const handleClockInOut = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(new Date());
    } else {
      setClockOutTime(new Date());
      setShowClockOutModal(true);
    }
  };

  const calculateElapsedTime = () => {
    if (!clockInTime || !clockOutTime) return { hours: 0, minutes: 0, seconds: 0 };
    const diff = clockOutTime - clockInTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const handleClockOut = () => {
    const { hours, minutes, seconds } = calculateElapsedTime();
    setClockOutMessage(`You worked for ${hours}h ${minutes}m ${seconds}s${clockOutModalNote ? ' with note: "' + clockOutModalNote + '"' : ''}. This will be sent to the HR manager.`);
    setIsClockedIn(false);
    setClockInTime(null);
    setClockOutTime(null);
    setClockOutModalNote('');
    setShowClockOutModal(false);
  };

  // بيانات افتراضية لـ "Who’s Off Today"
  const offEmployees = [
    { name: 'Ahmed Ali', image: 'user1.png', leavePeriod: '25 Oct - 27 Oct' },
    { name: 'Sara Khaled', image: 'user2.png', leavePeriod: '26 Oct - 28 Oct' },
    { name: 'Mohammed Salem', image: 'user3.png', leavePeriod: '25 Oct - 29 Oct' },
    { name: 'Laila Omar', image: 'user4.png', leavePeriod: '27 Oct - 30 Oct' },
  ];

  // بيانات افتراضية لـ "Pending Approval" (Time-off)
  const pendingTimeOff = [
    { name: 'Yousef Hamed', image: 'user5.png', reason: 'Sick Leave' },
    { name: 'Fatima Zaid', image: 'user6.png', reason: 'Unpaid Leave' },
  ];

  // بيانات افتراضية لـ "Pending Approval" (Time Attendance)
  const pendingAttendance = [
    { name: 'Khalid Nasser', image: 'user7.png', hoursWorked: 4 },
    { name: 'Amina Sami', image: 'user8.png', hoursWorked: 6 },
  ];

  // بيانات افتراضية لـ "Job Applications"
  const jobApplications = [
    { name: 'Omar Hassan', job: 'Software Engineer', date: '25 Oct 2025' },
    { name: 'Noura Ahmed', job: 'HR Specialist', date: '26 Oct 2025' },
    { name: 'Zaid Ibrahim', job: 'Marketing Manager', date: '27 Oct 2025' },
    { name: 'Huda Salem', job: 'Data Analyst', date: '28 Oct 2025' },
  ];

  const days = getDays();

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        {/* العمود الأيسر */}
        <div className="left-column">
          <div className="event-container">
            <div className="events-header">
              <h2>Upcoming Events</h2>
              <div className="calendar-header" onClick={() => setIsDatePickerOpen(true)}>
                📅 {`${selectedDate.getDate()} ${selectedDate.toLocaleString('en', { month: 'short' })} - ${new Date(selectedDate).setDate(selectedDate.getDate() + 5) && new Date().getDate()} ${selectedDate.toLocaleString('en', { month: 'short' })} ${selectedDate.getFullYear()}`}
              </div>
            </div>
            <div className="events-grid">
              {days.map((day, index) => (
                <div key={index} className="day-column">
                  <div className="day-label">{day.label}</div>
                  <div className="event-section">
                    <div className="event-row birthday-row">
                      <span className="event-icon">🎂</span>
                      <span className="event-line birthday-line"></span>
                      {day.events.Birthday.length > 0 ? (
                        <>
                          {day.events.Birthday.slice(0, 2).map((emp, i) => (
                            <img key={i} src={emp} alt="Employee" className="employee-img" />
                          ))}
                          {day.events.Birthday.length > 2 && (
                            <span className="more-employees">+{day.events.Birthday.length - 2}</span>
                          )}
                        </>
                      ) : (
                        <span className="no-events">No events</span>
                      )}
                    </div>
                    <div className="event-divider"></div>
                    <div className="event-row anniversary-row">
                      <span className="event-icon">❤️</span>
                      <span className="event-line anniversary-line"></span>
                      {day.events.Anniversary.length > 0 ? (
                        <>
                          {day.events.Anniversary.slice(0, 2).map((emp, i) => (
                            <img key={i} src={emp} alt="Employee" className="employee-img" />
                          ))}
                          {day.events.Anniversary.length > 2 && (
                            <span className="more-employees">+{day.events.Anniversary.length - 2}</span>
                          )}
                        </>
                      ) : (
                        <span className="no-events">No events</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="event-legend">
              <div className="legend-item">
                <span className="event-icon">🎂</span> Birthday
              </div>
              <div className="legend-item">
                <span className="event-icon">❤️</span> Anniversary
              </div>
            </div>
          </div>

          <div className="pending-container">
            <div className="pending-header">
              <h2>
                Pending Approval <span className="clock-icon yellow-clock">⏰</span>
              </h2>
            </div>
            <div className="pending-content">
              <div className="pending-left">
                <div className="pending-title">Time-off</div>
                <div className="pending-count">{pendingTimeOff.length} pending</div>
                <div className="pending-list">
                  {pendingTimeOff.map((emp, index) => (
                    <div key={index} className="pending-item">
                      <img src={emp.image} alt={emp.name} className="pending-img" />
                      <div className="pending-details">
                        <div className="pending-name">{emp.name}</div>
                        <div className="pending-reason">{emp.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pending-divider"></div>
              <div className="pending-right">
                <div className="pending-title">Time Attendance</div>
                <div className="pending-count">{pendingAttendance.length} pending</div>
                <div className="pending-list">
                  {pendingAttendance.map((emp, index) => (
                    <div key={index} className="pending-item">
                      <img src={emp.image} alt={emp.name} className="pending-img" />
                      <div className="pending-details">
                        <div className="pending-name">{emp.name}</div>
                        <div className="attendance-bar-container">
                          <div
                            className="attendance-bar"
                            style={{ width: `${(emp.hoursWorked / 8) * 100}%` }}
                          ></div>
                          <span className="attendance-text">{`${emp.hoursWorked}h/8h`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيمن */}
        <div className="right-column">
          <div className="clock-container">
            <div className="clock-header">
              <h2>Clock In/Out</h2>
              <div className="current-time">
                {clockInTime ? clockInTime.toLocaleTimeString() : currentTime.toLocaleTimeString()} {currentTime.toLocaleDateString()}
              </div>
            </div>
            <div className="clock-details">
              <div className="time-row">
                <span>First In</span>
                <span>{clockInTime ? clockInTime.toLocaleTimeString() : '--:--:--'}</span>
              </div>
              <div className="time-row">
                <span>Last Out</span>
                <span>{isClockedIn || !clockInTime ? '--:--:--' : new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <button
              className={`clock-button ${isClockedIn ? 'clocked-in' : ''}`}
              onClick={handleClockInOut}
            >
              {isClockedIn ? (
                <>
                  Clock Out
                  <span className="arrow left-arrow">▶</span>
                </>
              ) : (
                <>
                  Clock In
                  <span className="arrow right-arrow">▶</span>
                </>
              )}
            </button>
          </div>

          <div className="off-container">
            <div className="off-header">
              <h2>Who’s Off Today</h2>
              <span className="view-all" onClick={() => setShowAllOffEmployees(!showAllOffEmployees)}>
                View all
              </span>
            </div>
            <div className="off-list">
              {offEmployees.slice(0, showAllOffEmployees ? offEmployees.length : 3).map((emp, index) => (
                <div key={index} className="off-item">
                  <img src={emp.image} alt={emp.name} className="off-img" />
                  <div className="off-details">
                    <div className="off-name">{emp.name}</div>
                    <div className="off-period">{emp.leavePeriod}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="job-applications-container">
            <div className="job-applications-header">
              <h2>Job Applications</h2>
              <span className="view-all" onClick={() => setShowAllJobApplications(!showAllJobApplications)}>
                View all
              </span>
            </div>
            <div className="job-applications-list">
              {jobApplications.slice(0, showAllJobApplications ? jobApplications.length : 3).map((app, index) => (
                <div key={index} className="job-application-item">
                  <div className="job-application-icon">👤</div>
                  <div className="job-application-details">
                    <div className="job-application-name">{app.name}</div>
                    <div className="job-application-job">{app.job}</div>
                    <div className="job-application-date">{app.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isDatePickerOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsDatePickerOpen(false)}></div>
          <div className="date-picker-modal">
            <h3>Select a Date</h3>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </div>
        </>
      )}

      {showClockOutModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowClockOutModal(false)}></div>
          <div className="clock-out-modal">
            <h3>Clock out at {clockOutTime.toLocaleTimeString()}</h3>
            <div className="total-time">
              <span className="clock-icon">⏰</span>
              <span>Your total working time up to now is {calculateElapsedTime().hours}h {calculateElapsedTime().minutes}m {calculateElapsedTime().seconds}s</span>
            </div>
            <textarea
              placeholder="Note (Optional)"
              value={clockOutModalNote}
              onChange={(e) => setClockOutModalNote(e.target.value)}
              className="note-input"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowClockOutModal(false)}>Cancel</button>
              <button onClick={handleClockOut}>Clock Out</button>
            </div>
          </div>
        </>
      )}

      {clockOutMessage && (
        <>
          <div className="modal-overlay" onClick={() => setClockOutMessage('')}></div>
          <div className="clock-out-message">{clockOutMessage}</div>
        </>
      )}
    </div>
  );
}

export default Dashboard;