// src/components/StartMenu.js
import React from 'react';
import './styles.css'; // Use the updated CSS for styling

const StartMenu = ({ apps, openWindow, isOpen, onClose }) => {
  console.log(apps)
  if (!isOpen) return null;

  return (
    <div className="start-menu">
      <div className="start-menu-header">
        <div className="start-menu-title">Start Menu</div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="start-menu-body">
        <div className="start-menu-section">
          <h3>Programs</h3>
          <ul>
            {apps.map((item) => {
              return (
                <li onClick={() => openWindow(item.onClick, item)} key={item.id} className='list-item-menu'>

                  <img src={item?.icon} alt={"label"} className="icon-image-start-menu" />
                  <a href="#">{item.title}</a>
                </li>
              )
            })

            }
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
