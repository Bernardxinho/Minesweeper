import React, { useState, useRef, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import { TIMEOUTGAME_BASICO } from "../../constants";
import GameOverModal from "../GameOver/game-over-modal.component";
import Top10Modal from "../Top10Modal/top10modal";

function ControlPanel(props) {
  const { selectedLevel, onGameStart, onLevelChange, gameStarted, setGameStarted } = props;
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTop10Open, setIsTop10Open] = useState(false);
  const [points, setPoints] = useState(0);
  const [top10Scores, setTop10Scores] = useState([]);

  const handleTimer = (t) => {
    if (t === 0) onGameStart();
  };

  const handleGameButtonClick = () => {
    if (gameStarted) {
      setIsGameOver(true);
      setGameStarted(false);
    } else {
      onGameStart();
      setGameStarted(true);
      setPoints(0); // Reset points when a new game starts
    }
  };

  const handleCloseGameOverModal = () => {
    setIsGameOver(false);
    onGameStart(); // Reinicia o jogo ao fechar o modal
  };

  const handleSaveScore = (name, points) => {
    setTop10Scores(prevScores => {
      const updatedScores = [...prevScores, { name, points }];
      updatedScores.sort((a, b) => b.points - a.points);
      return updatedScores.slice(0, 10); // Manter apenas os top 10
    });
  };

  const handleOpenTop10Modal = () => {
    setIsTop10Open(true);
  };

  const handleCloseTop10Modal = () => {
    setIsTop10Open(false);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape" && isGameOver) {
        handleCloseGameOverModal();
      }
    };
    document.body.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, [isGameOver]);

  // Example function to simulate points accumulation during the game
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
        <fieldset className="form-group">
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
        <dl className={`list-item right${gameStarted ? " gameStarted" : ""}`}>
          <dt>Pontuação TOP:</dt>
          <dd id="pointsTop">0</dd>
        </dl>

        <dl className={`list-item left${gameStarted ? " gameStarted" : ""}`}>
          <dt>Pontuação:</dt>
          <dd id="points">{points}</dd>
        </dl>
        <div id="top10" className="right">
          <button id="btTop" onClick={handleOpenTop10Modal}>
            Ver TOP 10
          </button>
        </div>
      </div>

      <GameOverModal
        isOpen={isGameOver}
        points={points}
        handleClose={handleCloseGameOverModal}
        onSave={handleSaveScore}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
      />
      <Top10Modal
        isOpen={isTop10Open}
        handleClose={handleCloseTop10Modal}
        top10Scores={top10Scores}
      />
    </section>
  );
}

export default ControlPanel;