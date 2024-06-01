import React, { useState } from 'react';
import './cell.css';

const Cell = ({ cell, revealCell, handleGameOver, gameOver, handleFlagToggle}) => {
  const [clicked, setClicked] = useState(false);
  const [cellStatus, setCellStatus] = useState(0);

  //Left Click
  const handleClick = (event) => {
    event.preventDefault();

    if (gameOver || clicked) return;
    setClicked(true);

    if (cell.isBomb) {
      revealCell(cell.row, cell.col);
      
      handleGameOver();
    } else {
      revealCell(cell.row, cell.col);
    }
  };

  //Rigth Click
  const handleContextMenu = (event) => {
    event.preventDefault();

    if (gameOver || clicked) return;

    let newStatus = cellStatus + 1;
    if (newStatus === 3) {
      newStatus = 0;
    }
    setCellStatus(newStatus);

    handleFlagToggle(cell.row, cell.col);

    event.stopPropagation();
  };

  let className = 'cell';
  let text = '';
  if (cell.isBomb && cell.isOpen) {
    className += ' mine';
  }

  if (cell.isOpen) {
    if (cell.adjacentBombs > 0) {
      className += ' notMine';
      text = cell.adjacentBombs;
    } else {
      className += ' notMine';
    }
  } else {
    if (cellStatus === 1) {
      className += ' flag';
    } else if (cellStatus === 2) {
      className += ' probably';
    }
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {cell.isBomb && <img alt='' />}
      {cell.isOpen && text}
    </div>
  );
};

export default Cell;
