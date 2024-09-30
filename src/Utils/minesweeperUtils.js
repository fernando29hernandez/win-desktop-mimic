// src/minesweeperUtils.js

const generateBoard = (rows, cols, mines) => {
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        count: 0,
        isRevealed: false,
        isFlagged: false,
      }))
    );
  
    let minesToPlace = mines;
    while (minesToPlace > 0) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!board[r][c].isMine) {
        board[r][c].isMine = true;
        minesToPlace--;
  
        // Update neighboring cell counts
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (r + dr >= 0 && r + dr < rows && c + dc >= 0 && c + dc < cols) {
              board[r + dr][c + dc].count++;
            }
          }
        }
      }
    }
  
    return board;
  };
  
// src/minesweeperUtils.js

const revealCells = (board, r, c) => {
    // Check boundaries and if cell is already revealed or flagged
    if (
      r < 0 || r >= board.length ||
      c < 0 || c >= board[0].length ||
      board[r][c].isRevealed ||
      board[r][c].isFlagged
    ) {
      return;
    }
  
    // Reveal the cell
    board[r][c].isRevealed = true;
  
    // If the cell has no neighboring mines, recursively reveal adjacent cells
    if (board[r][c].count === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!(dr === 0 && dc === 0)) {
            revealCells(board, r + dr, c + dc);
          }
        }
      }
    }
  };
  
  
  const revealAllMines = (board) => {
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });
  };
  
  const toggleFlag = (board, r, c) => {
    if (board[r][c].isRevealed) return;
    board[r][c].isFlagged = !board[r][c].isFlagged;
  };
  
  export { generateBoard, revealCells, revealAllMines, toggleFlag };
  