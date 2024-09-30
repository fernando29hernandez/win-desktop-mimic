// src/components/StartMenu.js
import React from 'react';
import './styles.css'; // Use the updated CSS for styling

const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="start-menu">
      <div className="start-menu-header">
        <div className="start-menu-title">Start Menu</div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="start-menu-body">
        <div className="start-menu-section">
          <h3>Pinned</h3>
          <ul>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Games</a></li>
            <li><a href="#">Internet</a></li>
          </ul>
        </div>
        <div className="start-menu-section">
          <h3>Recent</h3>
          <ul>
            <li><a href="#">Recent Doc 1</a></li>
            <li><a href="#">Recent Doc 2</a></li>
          </ul>
        </div>
        <div className="start-menu-footer">
          <a href="#">All Programs</a>
          <a href="#">Run...</a>
          <a href="#">Shut Down</a>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
