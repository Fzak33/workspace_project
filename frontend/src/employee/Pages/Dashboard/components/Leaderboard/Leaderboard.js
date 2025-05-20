// Leaderboard.jsx - تحديث نهائي لمطابقة تصميم Figma
import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaders }) => {
  return (
    <div className="leaderboard-component">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Leaderboard</h2>
      </div>
      
      <div className="leaderboard-content">
        <div className="leaderboard-list">
          {leaders.map((leader, index) => (
            <div key={leader.id} className="leaderboard-item">
              <div className="leaderboard-rank">
                <span className="rank-number">{String(index + 1).padStart(2, '0')}</span>
                <div className={`trend-indicator ${leader.trend}`}></div>
              </div>
              
              <div className="leaderboard-user">
                <div className="user-avatar">
                  <img 
                    src={`https://randomuser.me/api/portraits/${leader.id % 2 === 0 ? 'women' : 'men'}/${leader.id + 30}.jpg`} 
                    alt={leader.name} 
                  />
                </div>
                <span className="user-name">{leader.name}</span>
              </div>
              
              <div className="leaderboard-points">
                <div className="points-diamond"></div>
                <span className="points-value">{leader.points.toLocaleString()}</span>
              </div>
              
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
        
        <button className="view-all-btn">View All</button>
      </div>
    </div>
  );
};

export default Leaderboard;