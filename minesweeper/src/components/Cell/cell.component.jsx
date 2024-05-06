import React from 'react';
import './cell.css'; // Importe o arquivo CSS para aplicar estilos específicos a esta célula, se necessário.

const Cell = ({ cell }) => {
  const handleClick = () => {
    console.log(`Célula clicada: ${cell.row}, ${cell.col}`);
  };

  return (
    <div className={`cell ${cell.isOpen ? 'open' : ''}`} onClick={handleClick}>

        
    </div>
  );
};

export default Cell;
