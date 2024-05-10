import React, { useState, useEffect } from 'react';
import Cell from '../Cell/cell.component';
import './board.css';

const Board = ({ rows, cols, mines }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {  
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [rows, cols]);

  const revealCell = (row, col) => {
    if (grid[row][col].isOpen || gameOver) {
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[row][col].isOpen = true;
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
