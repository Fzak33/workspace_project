// Awards.jsx - تحديث نهائي لمطابقة تصميم Figma
import React from 'react';
import './Awards.css';

const Awards = () => {
  return (
    <div className="awards-component">
      <div className="awards-header">
        <span className="awards-title">Awards</span>
        <span className="awards-count">You have award to see</span>
        <a href="#" className="awards-details">Details</a>
      </div>
      
      <div className="awards-content">
        <p className="promotion-text">You have promotion starting in 1</p>
        <p className="promotion-date">Jan 2024</p>
      </div>
    </div>
  );
};

export default Awards;