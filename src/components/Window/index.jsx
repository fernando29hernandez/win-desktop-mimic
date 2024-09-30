import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { FaWindowMinimize, FaWindowMaximize, FaWindowRestore, FaWindowClose } from 'react-icons/fa';
import 'react-resizable/css/styles.css';
import './styles.css';

const Window = ({id, title, children, onClose, onMinimize, onRestore, isActive, isMaximized, isMinimized, onClick,onMaximize,initialSize }) => {
  console.log("#",id,isMinimized)
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMaximize = () => {
    setSize(isMaximized ? initialSize : { width: window.innerWidth - 20, height: window.innerHeight - 45 });
    setPosition(isMaximized ? { x: 100, y: 100 } : { x: 10, y: 10 });
    onMaximize(id)
    if (!isMaximized) {
      onRestore();  // Trigger restore when maximized
    }
  };

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={isMaximized ? { x: 0, y: 0 } : position}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(e, data) => !isMaximized ? setPosition({ x: data.x, y: data.y }):{ x: 0, y: 0 } }
    >
      <div
        className={`window ${isActive ? 'active' : ''}`}
        style={{ display: isMinimized ? 'none' : 'block'}}
       // onClick={onClick}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[200, 200]}
          maxConstraints={[window.innerWidth - 20, window.innerHeight - 20]}
          className="resizable-box"
          onResizeStop={(e, data) => setSize({ width: data.size.width, height: data.size.height })}
        >
          <div className="window-title-bar">
            <span>{title}</span>
            <div className="window-controls">
              <button onClick={()=>onMinimize(id)} className="control-button"><FaWindowMinimize /></button>
              <button onClick={handleMaximize} className="control-button">{isMaximized ? <FaWindowRestore /> : <FaWindowMaximize />}</button>
              <button onClick={onClose} className="control-button"><FaWindowClose /></button>
            </div>
          </div>
          <div className="window-content">
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Window;