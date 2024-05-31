import React, { useState, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import { TIMEOUTGAME_BASICO } from "../../constants";
import GameOverModal from "../GameOver/game-over-modal.component";

function ControlPanel(props) {
  const { selectedLevel, onGameStart, onLevelChange, mines, setGameStarted, gameStarted, points, setPoints, isOpen } = props;
  const [isGameOver, setIsGameOver] = useState(false);
  

  const handleTimer = (t) => {
    if (t === 0) onGameStart();
  };

  const handleGameButtonClick = () => {
    if (gameStarted) {
      setIsGameOver(true);
      setGameStarted(false);
    } else {
      
      setGameStarted(true);
      setPoints(0);
    }
  };

  const handleCloseGameOverModal = () => {
    setIsGameOver(false);
    onGameStart(); // Reinicia o jogo ao fechar o modal
  };


  const simulatePointsAccumulation = () => {
    if (gameStarted) {
      setPoints(prevPoints => prevPoints + 1); // Simulating points accumulation
      
    }
  };

  useEffect(() => {
    let intervalId;
    if (gameStarted) {
      intervalId = setInterval(simulatePointsAccumulation, 1000); // Simulating points accumulation every second
    }
    return () => clearInterval(intervalId);
  }, [gameStarted]);

  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha do Nível</h3>
      <form className="form">
        <fieldset disabled={gameStarted} className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select id="btLevel" onChange={onLevelChange}>
            <option value="0">Seleccione...</option>
            <option value="1">Básico (9x9)</option>
            <option value="2">Intermédio (16x16)</option>
            <option value="3">Avançado (30x16)</option>
          </select>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={handleGameButtonClick}
        >
          {!gameStarted ? "Iniciar Jogo" : "Terminar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className={`list-item left${gameStarted ? " gameStarted" : ""}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">
            {gameStarted && (
              <Timer timeout={TIMEOUTGAME_BASICO} onTimer={handleTimer} />
            )}
          </dd>
        </dl>
        <dl className={`list-item left${gameStarted ? " gameStarted" : ""}`}>
          <dt>Pontuação:</dt>
          <dd id="points">{points}</dd>
        </dl>

        <dl className={`list-item right${gameStarted ? " gameStarted" : ""}`}>
          <dt>Numero de Minas:</dt>
          <dd id="mines">{mines-props.flagCount}</dd>
        </dl>

      </div>

      <GameOverModal
        isOpen={isGameOver}
        points={points}
        handleClose={handleCloseGameOverModal}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
      />

    </section>
  );
}

export default ControlPanel;
