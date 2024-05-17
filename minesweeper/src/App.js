import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/board.component';
import ControlPanel from './components/ControlPanel/control-panel.component';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");

  const [col, setCol] = useState(0);
  const [fil, setFil] = useState(0);
  const [min, setMin] = useState(0);

  const configureBoard = () => {
    var cols = 0, rows = 0, mines = 0;
    if (selectedLevel === "1") {
      cols = 9;
      rows = 9;
      mines = 10;
    } else if (selectedLevel === "2") {
      cols = 16;
      rows = 16;
      mines = 40;
    } else if (selectedLevel === "3") {
      cols = 16;
      rows = 30;
      mines = 99;
    }
    setCol(cols);
    setFil(rows);
    setMin(mines);
  };

  useEffect(() => {
    configureBoard();
  }, [selectedLevel]);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    
};

const handleLevelChange = (event) => {
  const { value } = event.currentTarget;
  setSelectedLevel(value);
  setMin(0);
};

return (
  <div className="app">
    <h1 className='minesweeperTitle'>Minesweeper Cocacolastic</h1>
    <ControlPanel
      onGameStart={handleGameStart}
      gameStarted={gameStarted}
      selectedLevel={selectedLevel}
      onLevelChange={handleLevelChange}
    />
    <Board rows={fil} cols={col} mines={min}
      onGameStart={handleGameStart}
      gameStarted={gameStarted} /> {/* Passando as propriedades para o componente Board */}
  </div>
);
}

export default App;
