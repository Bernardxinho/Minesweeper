import React from 'react';
import './App.css';
import Board from './components/Board/board.component';
import ControlPanel from './components/ControlPanel/control-panel.component';

function App() {
  return (
    <div className="app">
      <h1 className='minesweeperTitle'>Minesweeper Cocacolastic</h1>
      <ControlPanel/>
      <Board rows={8} cols={8} mines={10} /> {/* Passando as propriedades para o componente Board */}
    </div>
  );
}

export default App;
