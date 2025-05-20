// Taskss.jsx - تحديث نهائي لمطابقة تصميم Figma
import React, { useState } from 'react';
import './Taskss.css';

function Taskss({ tasks, onToggleTask }) {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Handle task toggle with notification
  const handleTaskToggle = (taskId) => {
    onToggleTask(taskId);
    
    // Find the task to show appropriate message
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      if (!task.completed) {
        setMessage(`Task "${task.name}" marked as completed!`);
      } else {
        setMessage(`Task "${task.name}" marked as incomplete.`);
      }
      
      // Show message and hide after delay
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="tasks-component">
      <div className="tasks-header">
        <h2 className="tasks-title">Tasks</h2>
      </div>
      
      {showMessage && (
        <div className="task-message">
          {message}
        </div>
      )}
      
      <div className="tasks-list">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="task-item"
            onClick={() => handleTaskToggle(task.id)}
          >
            <span className={`task-name ${task.completed ? 'completed' : ''}`}>
              {task.name}
            </span>
            <div className="task-checkbox">
              {task.completed ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#4CD964" />
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#E0E0E0" strokeWidth="2" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="tasks-footer">
        <button className="view-all-btn">View All</button>
      </div>
    </div>
  );
}

export default Taskss;