import React from 'react';
import './styles.css';

const ContextMenu = ({ position, items, onClose }) => {
  return (
    <div className="context-menu" style={{ top: position.y, left: position.x }}>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => { item.action(); onClose(); }}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
