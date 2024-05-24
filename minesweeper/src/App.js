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
  useEffect(() => {
    if (selectedLevel === "1") {
      setCol(9);
      setFil(9);
      setMin(10);
    } else if (selectedLevel === "2") {
      setCol(16);
      setFil(16);
      setMin(40);
    } else if (selectedLevel === "3") {
      setCol(16);
      setFil(30);
      setMin(99);
    }
},[selectedLevel]);
 
 
 
 
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
      selectedLevel={selectedLevel}
      onLevelChange={handleLevelChange}
    />
    <Board rows={fil} cols={col} mines={min} /> {/* Passando as propriedades para o componente Board */}
  </div>
);
}
 
export default App;