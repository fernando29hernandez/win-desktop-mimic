import React, { useState } from 'react';

import Board from './Board';
import { generateBoard, revealCells,toggleFlag,revealAllMines } from '../../Utils/minesweeperUtils';
import SmileyButton from './SmileyButton';

const Minesweeper = () => {
  
  const [board, setBoard] = useState(generateBoard(20, 40, 50));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleCellClick = (r, c) => {
    if (gameOver || gameWon) return;

    if (board[r][c].isMine) {
      setGameOver(true);
      const newBoard = board.map(row => row.map(cell => ({ ...cell })));
      revealAllMines(newBoard);
      setBoard(newBoard);
      return;
    }

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    revealCells(newBoard, r, c);

    setBoard(newBoard);

    // Check win condition
    if (newBoard.flat().every(cell => cell.isRevealed || cell.isMine)) {
      setGameWon(true);
    }
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameOver || gameWon) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    toggleFlag(newBoard, r, c);

    setBoard(newBoard);
  };

  const handleReset = () => {
    setBoard(generateBoard(20, 40, 50));
    setGameOver(false);
    setGameWon(false);
  };

//onContextMenu={handleRightClick}
  return (

     <div className="app">
      <div className="window">
        <div className="window-header">
          <span className="window-title">Minesweeper</span>
        </div>
        <div className="window-body">
          {gameOver && <div className="status">Game Over</div>}
          {gameWon && <div className="status">You Win!</div>}
          <SmileyButton className="reset-button" onClick={handleReset}>Reset Game</SmileyButton>
          <Board
            board={board}
            onCellClick={handleCellClick}
            onCellRightClick={handleRightClick}
          />
        </div>
      </div>
    </div>
 )
};

export default Minesweeper;
