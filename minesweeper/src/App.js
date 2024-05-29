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
  const [flagCount, setFlagCount] = useState(0); // New state for flag count

  var coluna, fila, mina;

  if (selectedLevel === "1") {
    coluna = 9;
    fila = 9;
    mina = 10;
  } else if (selectedLevel === "2") {
    coluna = 16;
    fila = 16;
    mina = 40;
  } else if (selectedLevel === "3") {
    coluna = 16;
    fila = 30;
    mina = 99;
  }

  useEffect(() => {
    if(gameStarted === false){
      setCol(0)
      setFil(0)
      setMin(0)
      setFlagCount(0); // Reset flag count when game starts
    }else{
      setCol(coluna)
      setFil(fila)
      setMin(mina)
    }
  },[gameStarted]);

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
        onGameStart={handleGameStart}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        mines={min}
        flagCount={flagCount}
      />
      <Board 
        rows={fil} 
        cols={col} 
        mines={min} 
        setGameStarted={setGameStarted} 
        gameStarted={gameStarted} 
        flagCount={flagCount} 
        setFlagCount={setFlagCount} // Pass the state and updater function as props
      /> 
    </div>
  );
}

export default App;
