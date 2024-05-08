import React, { useState, useEffect } from 'react';
import Cell from '../Cell/cell.component';
import './board.css';

const Board = ({ rows, cols, mines }) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isMine: false,
          isOpen: false,
          isFlagged: false,
          isMotherOfBernardoBoa: true,
          adjacentMines: 0,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [rows, cols]);

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
