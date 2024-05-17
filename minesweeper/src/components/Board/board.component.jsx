import React, { useState, useEffect } from 'react';
import Cell from '../Cell/cell.component';
import './board.css';

const Board = ({ rows, cols, mines, gameStarted }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [bombPositions, setBombPositions] = useState([]);
  

  useEffect(() => {  
    const newGrid = [];
    const newBombPositions = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isBomb: false,
          isOpen: false,
          adjacentBombs: 0,
        });
      }
      newGrid.push(row);
    }
   
    let bombsPlaced = 0;
    while (bombsPlaced < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (newGrid[randomRow][randomCol].isBomb) {
        continue;
      } else {
        newGrid[randomRow][randomCol].isBomb = true;
        newBombPositions.push({ row: randomRow, col: randomCol });
        bombsPlaced++;
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!newGrid[i][j].isBomb) {
          let bombCount = 0;
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
          ];
          directions.forEach(([dx, dy]) => {
            const newRow = i + dx;
            const newCol = j + dy;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && newGrid[newRow][newCol].isBomb) {
              bombCount++;
            }
          });
          newGrid[i][j].adjacentBombs = bombCount;
        }
      }
    }

    setGrid(newGrid);
    setBombPositions(newBombPositions);
  }, [rows, cols, mines]);

  const revealCell = (row, col) => {
    if (grid[row][col].isOpen || gameOver) {
      return;
    }

    const revealGrid = (r, c, updatedGrid) => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || updatedGrid[r][c].isOpen) {
        return;
      }

      updatedGrid[r][c].isOpen = true;

      if (updatedGrid[r][c].adjacentBombs === 0) {
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        directions.forEach(([dx, dy]) => {
          revealGrid(r + dx, c + dy, updatedGrid);
        });
      }
    };

    const updatedGrid = [...grid];
    revealGrid(row, col, updatedGrid);
    setGrid(updatedGrid);
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} cell={cell} revealCell={revealCell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
