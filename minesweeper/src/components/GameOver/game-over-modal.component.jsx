import React, { useState, useEffect } from "react";
import "./game-over-modal.css";

function GameOverModal({ isOpen, points = 0, revealedGrid, handleClose, onSave, gameStarted, setGameStarted }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setGameStarted(false);
    }
  }, [isOpen, setGameStarted]);

  const handleSave = () => {
    if (name.trim() !== "") {
      onSave(name, points);
      setName(""); // Reset the name field
    }
    handleClose();
  };

  const handleModalClose = () => {
    setGameStarted(false);
    handleClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modal-gameOver">
      <div className="estilos">
        <header>
          <span className="closeModal" onClick={handleModalClose}>
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {points}</p>
        </div>
        <div className="info" id="nickname">
          <label htmlFor="inputNick">Nick Name:</label>
          <input
            type="text"
            id="inputNick"
            size="16"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introduza seu Nick"
          />
          <button id="okTop" onClick={handleSave}>ok</button>
        </div>
        <footer>
          <p>
            <em>© Linguagens Script @ DEIS - ISEC</em>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GameOverModal;
