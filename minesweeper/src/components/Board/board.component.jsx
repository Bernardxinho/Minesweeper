import React, { useState, useEffect } from 'react';
import Cell from '../Cell/cell.component';
import './board.css';

const Board = ({ rows, cols, mines, gameStarted }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [bombPositions, setBombPositions] = useState([]);
  

  useEffect(() => {  
    const newGrid = [];
    const newBombPositions= [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isBomb: false
        });
      }
      newGrid.push(row);
    }
   
    let bombsPlaced = 0;
    console.log("foram geradas " + mines + " bombas");
    while(bombsPlaced < mines){
      
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random()* cols);
      console.log(randomRow, randomCol);

      if(!randomRow){
        bombsPlaced++;
        continue;
      }else if(!newGrid[randomRow][randomCol].isBomb){
        newGrid[randomRow][randomCol].isBomb = true;
        newBombPositions.push({row: randomRow, col: randomCol});
        bombsPlaced++;
      }
    }

    setGrid(newGrid);
    setBombPositions(newBombPositions);
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
            <Cell key={colIndex} cell={cell} revealCell={revealCell} bombPositions={bombPositions} gameStarted={gameStarted} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
