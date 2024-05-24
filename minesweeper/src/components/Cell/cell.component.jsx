import React, { useState } from 'react';
import './cell.css';
import GameOverModal from '../GameOver/game-over-modal.component';

const Cell = ({ cell, revealCell, handleGameOver, gameOver }) => {
  const [clicked, setClicked] = useState(false);
  const [cellStatus, setCellStatus] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();

    if (gameOver || clicked) return; // Verificar se o jogo já acabou ou se a célula já foi clicada
    setClicked(true);

    if (cell.isBomb) {
      console.log('There is a bomb here!');
      revealCell(cell.row, cell.col);
      handleGameOver();
    } else {
      revealCell(cell.row, cell.col);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();

    if (gameOver || clicked) return;

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
  } else if (cellStatus === 1) {
    className += ' flag';
  } else if (cellStatus === 2) {
    className += ' probably';
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {cell.isBomb && <img />}
      {cell.isOpen && text}
      {gameOver && <GameOverModal />} {/* Exibir a modal de fim de jogo quando o jogo terminar */}
    </div>
  );
};

export default Cell;
