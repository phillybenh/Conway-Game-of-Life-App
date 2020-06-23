import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

// styles
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Game.css";

const numRows = 35;
const numCols = 50;
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
const Controls = (props) => {
  return (
    <div className="buttons">
      <Button variant="primary" onClick={props.playStop}>
        {props.playing ? "Stop" : "Start"}
      </Button>
      <Button variant="primary" onClick={props.randomSeed}>
        Random Seed
      </Button>
      <Button variant="primary" onClick={props.reset}>
        Reset
      </Button>
      <DropdownButton
        title="Speed"
        id="speed-menu"
        onSelect={props.changeSpeed}
      >
        <Dropdown.Item eventKey="1">250ms</Dropdown.Item>
        <Dropdown.Item eventKey="2">500ms</Dropdown.Item>
        <Dropdown.Item eventKey="3">1000ms</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
const GameOfLife = () => {
  // const [numRows, setNumRows] = useState(50);
  // const [numCols, setNumCols] = useState(50);

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
    setGrid((g) => {
      return produce(g, (gridCopy) => {
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
    });
    setTimeout(runSimulation, speed);
  }, []);

  const playStop = () => {
    setPlaying(!playing);
    if (!playing) {
      playingRef.current = true;
      runSimulation();
    }
  };
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
    setGrid(generateEmptyGrid());
    generation = 0;
  };

  const playSpeed = (speed) => {
    switch (speed) {
      case "1":
        setSpeed(250);
        console.log("speed!")
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          margin: "15px 0px",
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "red" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <h3>Generation: {generation}</h3>

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
