import React from 'react';
import Draggable from 'react-draggable';
import './styles.css';

const DesktopIcon = ({ iconSrc, label, onClick,onStop,position }) => {
  return (
    <Draggable
      defaultPosition={position}
      onStop={(e, data) =>{console.log(e); onStop(data)}}
      bounds="parent"
  >
    <div className="icon" onDoubleClick={onClick}>
      <img src={iconSrc} alt={label} className="icon-image" />
      <span className="icon-label">{label}</span>
    </div>
  </Draggable>
    
  );
};

export default DesktopIcon;
