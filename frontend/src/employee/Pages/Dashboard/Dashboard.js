// Dashboard.jsx - تعديل ليتناسب مع الـ Layout
import React, { useState, useEffect } from 'react';
import EmployeeHeader from '../../components/Header/Header';
//import './Dashboard.css';
import './Dashboard.css';

// Import all dashboard components
import Taskss from './components/Taskss/Taskss';
import Points from './components/Points/Points';
import Clock from './components/Clock/Clock';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Awards from './components/Awards/Awards';
import Courses from './components/Courses/Courses';

const Dashboard = () => {
  // State for tasks
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Empathy mapping', completed: true },
    { id: 2, name: 'Create wireframes', completed: true },
    { id: 3, name: 'User research', completed: true },
    { id: 4, name: 'Dashboard-design', completed: false }
  ]);

  // State for clock in/out
  const [isClockedIn, setIsClockedIn] = useState(false);
const [clockInTime, setClockInTime] = useState(null);
const [clockOutTime, setClockOutTime] = useState(null);
const [currentTime, setCurrentTime] = useState(new Date());

  // State for points
  const [points, setPoints] = useState(6675);
  const [pointsHistory, setPointsHistory] = useState([
    { id: 1, action: 'Completed a Course', timestamp: new Date() },
    { id: 2, action: 'Completed a Task', timestamp: new Date() },
    { id: 3, action: 'Started New Course', timestamp: new Date() },
    { id: 4, action: 'Completed a Task', timestamp: new Date() }
  ]);
  
  // State for leaderboard
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'John Doe', points: 21987, trend: 'up' },
    { id: 2, name: 'Jenny andr', points: 19657, trend: 'down' },
    { id: 3, name: 'Justen doe', points: 21987, trend: 'up' },
    { id: 4, name: 'Jude bille', points: 21987, trend: 'up' }
  ]);
  
  // State for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      icon: 'C',
      title: 'UX Design',
      progress: 48,
      completed: 18,
      total: 40,
      color: '#1773eb',
      progressColor: '#FB03F5'
    },
    {
      id: 2,
      icon: 'U',
      title: 'Visual Design',
      progress: 97,
      completed: 21,
      total: 23,
      color: '#7b1fa2',
      progressColor: '#00FF4F'
    },
    {
      id: 3,
      icon: 'SK',
      title: 'Management',
      progress: 20,
      completed: 7,
      total: 35,
      color: '#000000',
      progressColor: '#FB035C'
    }
  ]);
  
  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Handle clock in/out
  const handleClockInOut = () => {
  if (!isClockedIn) {
    setIsClockedIn(true);
    setClockInTime(new Date());
    setClockOutTime(null);
  } else {
    setIsClockedIn(false);
    setClockOutTime(new Date());
  }
};

  
  // Clean up timer on component unmount
  useEffect(() => {
  const timer = setInterval(() => setCurrentTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);

  
  return (
    <div className="app-container">
      <div className="main-content">
        <EmployeeHeader />
        
        <div className="dashboard-content">
          <div className="dashboard-grid">
            {/* Left column */}
            <div className="dashboard-grid-item tasks-section">
              <Taskss 
                tasks={tasks} 
                onToggleTask={toggleTaskCompletion} 
              />
            </div>
            
            <div className="dashboard-grid-item your-points-section">
              <Points 
                points={points}
                history={pointsHistory}
              />
            </div>
            
            {/* Right column */}
            <div className="dashboard-grid-item clock-section">
          <Clock 
  isClockedIn={isClockedIn}
  currentTime={currentTime}
  clockInTime={clockInTime}
  clockOutTime={clockOutTime}
  handleClockInOut={handleClockInOut}
/>

            </div>
            
            <div className="dashboard-grid-item leaderboard-section">
              <Leaderboard 
                leaders={leaderboard}
              />
            </div>
            
            <div className="dashboard-grid-item courses-section">
              <Courses 
                courses={courses}
              />
            </div>
            
            {/* Full width row */}
            <div className="dashboard-grid-item awards-section">
              <Awards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;