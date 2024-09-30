// src/Board.js
import React from 'react';
import Cell from './Cell';
import './Board.css';

// Difficulty settings
const difficulties = {
    easy: { rows: 9, cols: 9, bombs: 10 },
    medium: { rows: 16, cols: 16, bombs: 40 },
    hard: { rows: 16, cols: 30, bombs: 99 },
  }
  
const Board = ({ board, onCellClick,onCellRightClick }) => {
  return (
    <div className="board">
      {board.map((row, rIdx) => (
        <div key={rIdx} className="row">
          {row.map((cell, cIdx) => (
            <Cell
              key={cIdx}
              cell={cell}
              onClick={() => onCellClick(rIdx, cIdx)}
              onRightClick={(e) => onCellRightClick(e, rIdx, cIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
