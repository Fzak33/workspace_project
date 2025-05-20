// Courses.jsx - تحديث نهائي لمطابقة تصميم Figma
import React from 'react';
import './Courses.css';

const Courses = ({ courses }) => {
  return (
    <div className="courses-component">
      <div className="courses-header">
        <h2 className="courses-title">Courses In Progress</h2>
      </div>
      
      <div className="courses-content">
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <div className="course-icon" style={{ backgroundColor: course.color }}>
                {course.icon}
              </div>
              
              <div className="course-details">
                <div className="course-info">
                  <span className="course-name">{course.title}</span>
                  <span className="course-progress-percent">{course.progress}%</span>
                </div>
                
                <div className="course-progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${course.progress}%`,
                      backgroundColor: course.progressColor
                    }}
                  ></div>
                </div>
                
                <div className="course-completion">
                  <span>{course.completed}/{course.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="view-all-btn">View All</button>
      </div>
    </div>
  );
};

export default Courses;