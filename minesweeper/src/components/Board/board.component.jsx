import React, { useState, useEffect } from 'react';
import Cell from '../Cell/cell.component';
import './board.css';

const Board = ({ rows, cols, mines }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

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

  const revealCell = (row, col) => {
    if (grid[row][col].isOpen || gameOver) {
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[row][col].isOpen = true;
    setGrid(updatedGrid);

    if (updatedGrid[row][col].isMine) {
      setGameOver(true);
      // Aqui você pode adicionar lógica para exibir uma mensagem de jogo perdido
    } else {
      // Verifica se todas as células não minadas foram reveladas
      let nonMineCellsRevealed = 0;
      updatedGrid.forEach(row => {
        row.forEach(cell => {
          if (!cell.isMine && cell.isOpen) {
            nonMineCellsRevealed++;
          }
        });
      });
      if (nonMineCellsRevealed === rows * cols - mines) {
        setWin(true);
        // Aqui você pode adicionar lógica para exibir uma mensagem de jogo ganho
      }
    }
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
