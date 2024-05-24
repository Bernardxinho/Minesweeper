import React, { useRef, useEffect } from "react";
import "./top10-modal.css";

function Top10Modal({ isOpen, handleClose, top10Scores }) {
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      id="modal-top10"
      ref={ref}
      onClose={handleClose}
      onCancel={handleClose}
    >
      <div className="estilos">
        <header>
          <span className="closeModal" onClick={handleClose}>
            &times;
          </span>
          <div>Top 10 Jogadores</div>
        </header>
        <div className="info">
          <ul>
            {top10Scores.map((score, index) => (
              <li key={index}>
                {score.name}: {score.points}
              </li>
            ))}
          </ul>
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

export default Top10Modal;
