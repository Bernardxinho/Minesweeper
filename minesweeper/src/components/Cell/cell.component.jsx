import React, { useEffect, useState } from 'react';
import './cell.css';

const Cell = ({ cell, revealCell }) => {

  const [clicked, setClicked] = useState(false);
  const [cellStatus, setCellStatus] = useState(0);

   const handleClick = (event) => {
    event.preventDefault();

    console.log(`Célula clicada: ${cell.row}, ${cell.col}, ${cell.adjacentBombs}`);
    setClicked(true);

    if (cell.isBomb) {
      console.log('There is a bomb here!');
      //Gameover
    } else {
      revealCell(cell.row, cell.col);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    let newStatus = cellStatus + 1;
    if (newStatus === 3) {
      newStatus = 0;
    }
    setCellStatus(newStatus);
    console.log('Right-clicked!');
    console.log(newStatus);

    event.stopPropagation();
  };

  let className = 'cell';
  let text = '';
  if(clicked){
     if (cell.isBomb) {
        className += ' mine';
        text = '';
      } 
  }

  if (cell.isOpen) {
    if (cell.adjacentBombs > 0) {
      className += ' notMine';
      text = cell.adjacentBombs;
    } else {
      className += ' notMine';
    }
  } else if (cellStatus === 1) {
    className += ' flag';
  } else if (cellStatus === 2) {
    className += ' probably';
  }


  return (
    <button
      className={className}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      disabled = {!gameStarted}
    >
      {cell.isBomb && <img/>}
      {cell.isOpen && text}
      
    </div>
  );
};

export default Cell;