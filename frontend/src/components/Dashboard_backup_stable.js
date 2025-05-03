import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ setActivePage }) {
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

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventType, setNewEventType] = useState('Birthday');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventImage, setNewEventImage] = useState('');
  const [customEvents, setCustomEvents] = useState({});

  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [currentTimeOffPage, setCurrentTimeOffPage] = useState(1);
  const [currentAttendancePage, setCurrentAttendancePage] = useState(1);
  const itemsPerPage = 10;
  const [rejectionNote, setRejectionNote] = useState('');
  const [activeRejectIndex, setActiveRejectIndex] = useState(null); // index of the employee being rejected
  const [rejectTargetType, setRejectTargetType] = useState(''); // 'timeOff' or 'attendance'
 
  


  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/hr-manager/get-events', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched events:', data);
          // ممكن نخزنها لاحقًا في state وتستخدم بدل الأحداث الثابتة
        }
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
  
    fetchEvents();
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

    const custom = customEvents[date];
    if (custom) {
      if (custom.Birthday) events.Birthday.push(...custom.Birthday);
      if (custom.Anniversary) events.Anniversary.push(...custom.Anniversary);
    }

    return events;
  };

  const handleAddEvent = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Unauthorized');
  
    const payload = {
      employeeEmail: 'demo@example.com', // ⚠️ غيّر هذا لاحقًا ليأخذ إيميل حقيقي
      eventType: newEventType,
      eventTime: newEventDate,
    };
  
    try {
      const res = await fetch('http://localhost:3000/hr-manager/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        const result = await res.json();
        console.log('Event added:', result);
        setShowAddEventModal(false);
      } else {
        const err = await res.json();
        console.error('Error adding event:', err.message);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };
  

  const handleDeleteEvent = () => {
    const day = new Date(newEventDate).getDate();
    setCustomEvents((prev) => {
      const current = prev[day];
      if (!current) return prev;
      return {
        ...prev,
        [day]: {
          ...current,
          [newEventType]: current[newEventType].filter((img) => img !== newEventImage),
        },
      };
    });
    setShowAddEventModal(false);
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

  const getPaginatedData = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
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

  const handleApprove = (emp) => {
    alert(`Approved: ${emp.name}`);
  };
  
  const handleRejectClick = (index, type) => {
    setActiveRejectIndex(index);
    setRejectTargetType(type);
  };
  
  const handleSendRejection = (emp) => {
    console.log(`Rejected ${emp.name} with reason: ${rejectionNote}`);
    setRejectionNote('');
    setActiveRejectIndex(null);
    setRejectTargetType('');
  };
  

  const offEmployees = [
    { name: 'Ahmed Ali', image: 'user1.png', leavePeriod: '25 Oct - 27 Oct' },
    { name: 'Sara Khaled', image: 'user2.png', leavePeriod: '26 Oct - 28 Oct' },
    { name: 'Mohammed Salem', image: 'user3.png', leavePeriod: '25 Oct - 29 Oct' },
    { name: 'Laila Omar', image: 'user4.png', leavePeriod: '27 Oct - 30 Oct' },
  ];

  const pendingTimeOff = [
    { name: 'Yousef Hamed', image: 'user5.png', reason: 'Sick Leave' },
    { name: 'Fatima Zaid', image: 'user6.png', reason: 'Unpaid Leave' },
  ];

  const pendingAttendance = [
    { name: 'Khalid Nasser', image: 'user7.png', hoursWorked: 4 },
    { name: 'Amina Sami', image: 'user8.png', hoursWorked: 6 },
  ];

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
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className="calendar-header" onClick={() => setIsDatePickerOpen(true)}>
                  📅 {`${selectedDate.getDate()} ${selectedDate.toLocaleString('en', { month: 'short' })}`}
                </div>
                <button className="add-event-button" onClick={() => setShowAddEventModal(true)}>+ Add Event</button>
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
              <div className="legend-item"><span className="event-icon">🎂</span> Birthday</div>
              <div className="legend-item"><span className="event-icon">❤️</span> Anniversary</div>
            </div>
          </div>

          {/* باقي عناصر العمود الأيسر مثل Pending Approval */}
          <div className="pending-container">
            <div className="pending-header">
              <h2>Pending Approval <span className="clock-icon yellow-clock">⏰</span></h2>
            </div>
            <div className="pending-content">
              
              <div className="pending-left">

              <div className="pending-title-row">
              <div className="pending-title">Time-off</div>
              <button className="view-all-btn" onClick={() => setShowTimeOffModal(true)}>View all</button>
                        </div>   
                        <div className="pending-count">{pendingTimeOff.length} pending</div>



                <div className="pending-list">
                {pendingTimeOff.map((emp, index) => (
            <div key={index} className="pending-item">
               <img src={emp.image} alt={emp.name} className="pending-img" />
               <div className="pending-details">
              <div className="pending-name">{emp.name}</div>
                 <div className="pending-reason">{emp.reason}</div>

                       <div className="approval-actions">
        <button className="approve-btn" onClick={() => handleApprove(emp)}>Approve</button>
        <button className="reject-btn" onClick={() => handleRejectClick(index, 'timeOff')}>Reject</button>

        {activeRejectIndex === index && rejectTargetType === 'timeOff' && (
          <div className="reject-box">
            <textarea
              placeholder="Enter rejection reason"
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
            />
            <button className="send-btn" onClick={() => handleSendRejection(emp)}>Send</button>
          </div>
        )}
      </div>
    </div>
  </div>
))}

                </div>

              </div>
              <div className="pending-divider"></div>
              <div className="pending-right">

              <div className="pending-title-row">
  <div className="pending-title">Time Attendance</div>

<button className="view-all-btn" onClick={() => setActivePage('Attendance')}>View all</button>
</div>
<div className="pending-count">{pendingAttendance.length} pending</div>
  



                <div className="pending-list">


                {pendingAttendance.map((emp, index) => (
  <div key={index} className="pending-item">
    <img src={emp.image} alt={emp.name} className="pending-img" />
    <div className="pending-details">
      <div className="pending-name">{emp.name}</div>
      <div className="attendance-bar-container">
        <div className="attendance-bar" style={{ width: `${(emp.hoursWorked / 8) * 100}%` }}></div>
        <span className="attendance-text">{`${emp.hoursWorked}h/8h`}</span>
      </div>

      <div className="approval-actions">
        <button className="approve-btn" onClick={() => handleApprove(emp)}>Approve</button>
        <button className="reject-btn" onClick={() => handleRejectClick(index, 'attendance')}>Reject</button>

        {activeRejectIndex === index && rejectTargetType === 'attendance' && (
          <div className="reject-box">
            <textarea
              placeholder="Enter rejection reason"
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
            />
            <button className="send-btn" onClick={() => handleSendRejection(emp)}>Send</button>
          </div>
        )}
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
              <div className="time-row"><span>First In</span><span>{clockInTime ? clockInTime.toLocaleTimeString() : '--:--:--'}</span></div>
              <div className="time-row"><span>Last Out</span><span>{isClockedIn || !clockInTime ? '--:--:--' : new Date().toLocaleTimeString()}</span></div>
            </div>
            <button className={`clock-button ${isClockedIn ? 'clocked-in' : ''}`} onClick={handleClockInOut}>
              {isClockedIn ? <>Clock Out <span className="arrow left-arrow">▶</span></> : <>Clock In <span className="arrow right-arrow">▶</span></>}
            </button>
          </div>

          <div className="off-container">
            <div className="off-header">
              <h2>Who’s Off Today</h2>
              <span className="view-all" onClick={() => setShowAllOffEmployees(!showAllOffEmployees)}>View all</span>
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
              <span className="view-all" onClick={() => setShowAllJobApplications(!showAllJobApplications)}>View all</span>
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
            <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
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
            <textarea placeholder="Note (Optional)" value={clockOutModalNote} onChange={(e) => setClockOutModalNote(e.target.value)} className="note-input" />
            <div className="modal-buttons">
              <button onClick={() => setShowClockOutModal(false)}>Cancel</button>
              <button onClick={handleClockOut}>Clock Out</button>
            </div>
          </div>
        </>
      )}

      {showAddEventModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowAddEventModal(false)}></div>
          <div className="add-event-modal">
            <h3>Add New Event</h3>
            <label>Event Type:
              <select value={newEventType} onChange={(e) => setNewEventType(e.target.value)}>
                <option value="Birthday">🎂 Birthday</option>
                <option value="Anniversary">❤️ Anniversary</option>
              </select>
            </label>
            <label>Event Date:
              <input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
            </label>
            <label>Image URL:
              <input type="text" value={newEventImage} onChange={(e) => setNewEventImage(e.target.value)} placeholder="e.g. user9.png" />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddEvent}>Add</button>
              <button onClick={handleDeleteEvent}>Delete</button>
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

{showTimeOffModal && (
  <>
    <div className="modal-overlay" onClick={() => setShowTimeOffModal(false)}></div>
    <div className="view-all-modal">
      <h3>All Time-Off Requests</h3>
      <ul className="modal-list">
        {pendingTimeOff.map((emp, index) => (
          <li key={index} className="modal-item">
            <img src={emp.image} alt={emp.name} />
            <div>
              <div>{emp.name}</div>
              <div className="modal-sub">{emp.reason}</div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowTimeOffModal(false)}>Close</button>
    </div>
  </>
)}

{showAttendanceModal && (
  <>
    <div className="modal-overlay" onClick={() => setShowAttendanceModal(false)}></div>
    <div className="view-all-modal">
      <h3>All Time Attendance Requests</h3>
      <ul className="modal-list">
        {pendingAttendance.map((emp, index) => (
          <li key={index} className="modal-item">
            <img src={emp.image} alt={emp.name} />
            <div>
              <div>{emp.name}</div>
              <div className="modal-sub">{emp.hoursWorked}h / 8h</div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowAttendanceModal(false)}>Close</button>
    </div>
  </>
)}


    </div>
  );
}

export default Dashboard;
