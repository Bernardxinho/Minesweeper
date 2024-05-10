import React, { useState } from 'react';
import './cell.css';
import mineImage from '../../assets/images/minas.png';

const Cell = ({ cell, revealCell }) => {
  const [clicked, setClicked] = useState(false);
  const [cellStatus, setCellStatus] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();

    console.log(`Célula clicada: ${cell.row}, ${cell.col}`);
    setClicked(true);
    revealCell(cell.row, cell.col);
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

  if (clicked && cell.isMine) {
    className += ' mine';
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
    {clicked && cell.isMine && <img src={mineImage} alt="Mina" className="mine-image" />}
    </div>
  );
};

export default Cell;
