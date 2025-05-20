// Points.jsx - تحديث نهائي لمطابقة تصميم Figma
import React from 'react';
import './Points.css';

const Points = ({ points, history }) => {
  return (
    <div className="points-component">
      <div className="points-header">
        <h2 className="points-title">Your Points</h2>
      </div>
      
      <div className="points-content">
        <div className="points-hexagon-container">
          <div className="points-hexagon">
            <span className="points-value">{points}</span>
          </div>
        </div>
        
        <div className="points-history">
          {history.map((item) => (
            <div key={item.id} className="points-item">
              <span className="points-activity">{item.action}</span>
              <span className="points-dot"></span>
            </div>
          ))}
        </div>
        
        <button className="view-all-btn">View All</button>
      </div>
    </div>
  );
};

export default Points;