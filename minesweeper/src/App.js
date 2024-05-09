import React, { useState } from 'react';
import './App.css';
import Board from './components/Board/board.component';
import ControlPanel from './components/ControlPanel/control-panel.component';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  var col;
  var fil;

  if(selectedLevel === "1"){
    col = 9;
    fil = 9;
  }else if(selectedLevel === "2"){
    col = 16;
    fil = 16;
  }else if(selectedLevel === "3"){
    col = 16;
    fil = 30;
  }

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
  };

  return (
    <div className="app">
      <h1 className='minesweeperTitle'>Minesweeper Cocacolastic</h1>
      <ControlPanel 
        gameStarted={handleGameStart}
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />
      <Board rows={fil} cols={col} mines={10} /> {/* Passando as propriedades para o componente Board */}
    </div>
  );
}

export default App;
