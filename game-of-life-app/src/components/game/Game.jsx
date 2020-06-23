import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

// components
import Grid from "./Grid";
import Controls from "./Controls";

// styles
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Game.css";

let generation = 0;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const GameOfLife = () => {
  const [numRows, setNumRows] = useState(30);
  const [numCols, setNumCols] = useState(50);

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  const [playing, setPlaying] = useState(false);

  const playingRef = useRef(playing);
  playingRef.current = playing;

  // const [generation, setGeneration] = useState(0);

  const [speed, setSpeed] = useState(500);

  // function ot generate an empty grid
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };
  const runSimulation = useCallback(() => {
    if (!playingRef.current) {
      return;
    }
    const grid2 = (g) => {
      return produce(g, gridCopy => {
        generation += 1;

        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    };
    setGrid(grid2);
    setTimeout(runSimulation, speed);
  }, []);

  // funtion to play/stop the game
  const playStop = () => {
    setPlaying(!playing);
    if (!playing) {
      playingRef.current = true;
      runSimulation();
    }
  };

  // function to randomly seed the grid
  const randomSeed = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () =>
          // randomly seed the grid with approx 25% coverage
          Math.floor(Math.random() * 4) === 1 ? 1 : 0
        )
      );
    }
    setGrid(rows);
  };

  const reset = () => {
    if (playing) {
      playStop();
    }
    setGrid(generateEmptyGrid());
    generation = 0;
  };

  const playSpeed = (speed) => {
    switch (speed) {
      case "1":
        setSpeed(250);
        console.log("speed!");
        break;
      case "2":
        setSpeed(500);
        break;
      default:
        setSpeed(1000);
    }
    setGrid(generateEmptyGrid());
    reset();
  };

  const changeSpeed = (e) => {
    playSpeed(e);
  };

  return (
    <div className="center">
      <Grid
        grid={grid}
        setGrid={setGrid}
        generation={generation}
        numCols={numCols}
      />
      <Controls
        playStop={playStop}
        playing={playing}
        randomSeed={randomSeed}
        reset={reset}
        changeSpeed={changeSpeed}
      />
    </div>
  );
};

export default GameOfLife;
