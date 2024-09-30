import React from 'react';
import Draggable from 'react-draggable';
import { FaWindowMinimize, FaWindowMaximize, FaWindowRestore, FaWindowClose } from 'react-icons/fa';
import 'react-resizable/css/styles.css';
import './styles.css';

const FileExplorerWindow = ({ id, title, isActive, onClose, onClick }) => {
  const [isMaximized, setIsMaximized] = React.useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={{ x: 100, y: 100 }}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
    >
      <div
        className={`file-explorer-window ${isActive ? 'active' : ''}`}
        style={{ display: isMaximized ? 'block' : 'block', width: isMaximized ? '100vw' : '600px', height: isMaximized ? '100vh' : '400px' }}
        onClick={onClick}
      >
        <div className="window-title-bar">
          <span>{title}</span>
          <div className="window-controls">
            <button className="control-button"><FaWindowMinimize /></button>
            <button onClick={handleMaximize} className="control-button">{isMaximized ? <FaWindowRestore /> : <FaWindowMaximize />}</button>
            <button onClick={onClose} className="control-button"><FaWindowClose /></button>
          </div>
        </div>
        <div className="window-content">
          <div className="navigation-pane">
            {/* Navigation Pane */}
          </div>
          <div className="file-list">
            {/* File List */}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FileExplorerWindow;
