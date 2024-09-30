import React, { useState } from 'react';
import StartMenu from './../StartMenu'; // Import StartMenu
import './styles.css';
import { FaWindowMaximize } from 'react-icons/fa';

const Taskbar = ({ windows, onStartClick, onWindowClick, onRestoreWindow }) => {

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <div className="taskbar">
      <button className="win-start-button" onClick={()=>toggleStartMenu()}>
          <img src={'/assets/icons/windows-start.png'} alt={"menu"} className="icon-start-img" />
      </button>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <div className="window-buttons">
        {windows.map(win => (
          <button
            key={win.id}
            className={`window-button ${win.minimized ? 'minimized' : ''}`}
            onClick={() => win.minimized ? onRestoreWindow(win.id) : onWindowClick(win.id)}
          >
            {/**win.minimized ?  <FaWindowMaximize /> : ''*/}
            {/**win.title + "  "**/}
            <div className="icon-task">
              <img src={win.icon} alt={win.title} className="icon-image-task" />
              <span className="icon-label-task">{win.title}</span>
            </div>
            
            
          </button>
        ))}
      </div>
    </div>
  );
};

export default Taskbar;

