// src/Cell.js
import React from 'react';
import './Cell.css';

const Cell = ({ cell, onClick, onRightClick }) => {
  const { isRevealed, isMine, count, isFlagged } = cell;

  // Determine the class name for the number
  const numberClass = isRevealed && count > 0 ? `number-${count}` : '';

  return (
    <div
      className={`cell ${isRevealed ? 'revealed' : ''} ${isMine && isRevealed ? 'mine' : ''} ${isFlagged ? 'flagged' : ''} ${numberClass}`}
      onClick={onClick}
      onContextMenu={onRightClick}
      style={{ cursor: isRevealed ? 'default' : 'pointer' }}
    >
      {isRevealed ? (isMine ? '💣' : (count > 0 ? count : '')) : (isFlagged ? '🚩' : '')}
    </div>
  );
};

export default Cell;
