import React, { useEffect } from "react";
import "./game-over-modal.css";

function GameOverModal(props) {
  const { isOpen, handleClose, setGameStarted, total } = props;
  useEffect(() => {
    if (!isOpen) {
      setGameStarted(false);
    }
  }, [isOpen, setGameStarted]);

  const handleModalClose = () => {
    setGameStarted(true);
    handleClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modal-gameOver">
      <div className="estilos">
        <header>
          <span className="closeModal" onClick={handleModalClose}>
            &times;
          </span>
          <div class="blueBG">Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {total}</p>
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
