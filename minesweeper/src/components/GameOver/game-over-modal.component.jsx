import React, { useState, useEffect, useRef } from "react";
import "./game-over-modal.css";

function GameOverModal({ isOpen, points = 0, revealedGrid, handleClose, onSave }) {
  const ref = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const handleSave = () => {
    if (name.trim() !== "") {
      onSave(name, points);
      setName(""); // Reset the name field
    }
    handleClose();
  };

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <dialog
      id="modal-gameOver"
      ref={ref}
      onClose={handleModalClose}
      onCancel={handleModalClose}
    >
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
    </dialog>
  );
}

export default GameOverModal;
