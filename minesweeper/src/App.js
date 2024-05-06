import React from 'react';
import './App.css';
import Board from './components/Board/board.component';

function App() {
  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <Board rows={8} cols={8} mines={10} /> {/* Passando as propriedades para o componente Board */}
    </div>
  );
}

export default App;
