import React, { useState, useEffect } from "react";
import Cell from "../Cell/cell.component";
import "./board.css";
import GameOverModal from "../GameOver/game-over-modal.component";

const DIRECTIONS = [
  [-1, -1],[-1, 0],[-1, 1],
  [0, -1]         ,[0, 1],
  [1, -1] ,[1, 0] ,[1, 1],
];

const Board = ({ rows, cols, mines, setGameStarted, gameStarted, flagCount, setFlagCount }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [bombPositions, setBombPositions] = useState([]);
  const [revealedGrid, setRevealedGrid] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);
  const [check, setCheck] = useState(1);


  useEffect(() => {
    const newGrid = [];
    const newBombPositions = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isBomb: false,
          isOpen: false,
          isFlagged: false,
          adjacentBombs: 0,
        });
      }
      newGrid.push(row);
    }

    placeBombs(newGrid, newBombPositions);
    calculateAdjacentBombs(newGrid);
    setGrid(newGrid);
    setBombPositions(newBombPositions);
  }, [rows, cols, mines]);

  useEffect(() => {
    if (!gameStarted) {
      setFlaggedCells([]); // Reset flaggedCells when game starts
      setCheck(0); // Reset check when game starts
    }
  }, [gameStarted]);

  const placeBombs = (newGrid, newBombPositions) => {
    let bombsPlaced = 0;
    while (bombsPlaced < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
  
      if (!newGrid[randomRow][randomCol].isBomb) {
        newGrid[randomRow][randomCol].isBomb = true;
        newBombPositions.push({ row: randomRow, col: randomCol });
        bombsPlaced++;
      }
    }
  };

  const calculateAdjacentBombs = (newGrid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!newGrid[i][j].isBomb) {
          let bombCount = 0;
          DIRECTIONS.forEach(([dx, dy]) => {
            const newRow = i + dx;
            const newCol = j + dy;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              newGrid[newRow][newCol].isBomb
            ) {
              bombCount++;
            }
          });
          newGrid[i][j].adjacentBombs = bombCount;
        }
      }
    }
  };
  
  const handleFlagToggle = (row, col) => {
    const updatedGrid = [...grid];
    const cell = updatedGrid[row][col];
    let newFlaggedCells = [...flaggedCells];

    if (cell.isFlagged) {
      newFlaggedCells = newFlaggedCells.filter(
        (pos) => pos.row !== row || pos.col !== col
      );
      if (check === 1) {
        setFlagCount((prevCount) => prevCount - 1); // Decrement flag count
        console.log(check);
        cell.isFlagged = true;
        setCheck(2); // Update check state
      } else if (check === 2) {
        
        setCheck(1);
        cell.isFlagged = false;
        console.log(check);
      }
    } else {
      if (flaggedCells.length < mines) {
        cell.isFlagged = true;
        newFlaggedCells.push({ row, col });

        setFlagCount((prevCount) => prevCount + 1); // Increment flag count
        console.log(check);
        setCheck(1); // Update check state
      } else {
        cell.isFlagged = true;
        newFlaggedCells.push({ row, col });
        setFlagCount((prevCount) => prevCount + 1)
      }
    }
    setFlaggedCells(newFlaggedCells);
    setGrid(updatedGrid);

    const allBombsFlagged = bombPositions.every((bomb) =>
      newFlaggedCells.some(
        (flag) => flag.row === bomb.row && flag.col === bomb.col
      )
    );

    if (allBombsFlagged) {
      setGameOver(true);
    }
  };

  const revealCell = (row, col) => {
    if (grid[row][col].isOpen || gameOver) {
      return;
    }

    const revealGrid = (r, c, updatedGrid) => {
      if (r < 0 || r >= rows || c < 0 || c >= cols ||
        updatedGrid[r][c].isOpen
      ) {
        setFlagCount(0)
        return;
      }

      updatedGrid[r][c].isOpen = true;

      if (updatedGrid[r][c].adjacentBombs === 0) {
        DIRECTIONS.forEach(([dx, dy]) => {
          revealGrid(r + dx, c + dy, updatedGrid);
        });
      }
    };

    const updatedGrid = [...grid];
    revealGrid(row, col, updatedGrid);
    setGrid(updatedGrid);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  useEffect(() => {
    if (gameOver) {
      const updatedGrid = [...grid];
      updatedGrid.forEach((row) => {
        row.forEach((cell) => {
          cell.isOpen = true;
        });
      });
      setGrid(updatedGrid);
      setRevealedGrid(updatedGrid);
    }
  }, [gameOver, grid]);

  const handleModalClose = () => {
    setGameOver(false);
    setRevealedGrid([]);
  };

  return (
    <div className="board">
      {gameStarted && <div className="placeFlag">Flags Placed: {flagCount}</div>}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              revealCell={revealCell}
              handleGameOver={handleGameOver}
              gameOver={gameOver}
              handleFlagToggle={handleFlagToggle}
              mines={mines}
              flagCount={flagCount}
            />
          ))}
        </div>
      ))}
      <GameOverModal
        isOpen={gameOver}
        points={0}
        revealedGrid={revealedGrid}
        handleClose={handleModalClose}
        setGameStarted={setGameStarted}
        onSave={() => {}}
      />
    </div>
  );
};

export default Board;
