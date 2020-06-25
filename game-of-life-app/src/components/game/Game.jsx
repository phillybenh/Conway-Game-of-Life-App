import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

// components
import Grid from "./Grid";
import Controls from "./Controls";
import {
  beehive,
  blinker,
  pulsarOsc,
  spaceFleet,
  gliderGun,
} from "./SampleConfigs";

// styles
import "./Game.css";

let generation = 0;
let speed = 500;


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

// not currently using, may come back to this
// function arrayClone(arr) {
//   return arr.map((array) => array.slice());
// }

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

  // references the current value of playing, so we can actully stop/start the simulation 
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // not using for now, may come back to later
  // const [generation, setGeneration] = useState(0);
  // const [speed, setSpeed] = useState(500);

  const runSimulation = useCallback(() => {
    if (!playingRef.current) {
      return;
    }
    const grid2 = (g) => {
      return produce(g, (gridCopy) => {
        // double for loop takes us thru every value in grid
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              // `(i + x + numRows) % numRows` wraps the edge neighbors around to the other side of the board
              const neighborI = (i + x + numRows) % numRows;
              const neighborJ = (j + y + numCols) % numCols;
              if (neighborI >= 0 && neighborI < numRows && neighborJ >= 0 && neighborJ < numCols) {
                neighbors += g[neighborI][neighborJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    };
    generation += 1;
    setGrid(grid2);
    setTimeout(runSimulation, speed);
  }, []);

  // function to play/stop the game
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
    console.log(grid);

    if (playing) {
      playStop();
    }
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
      }
      return rows;
    });
    generation = 0;
  };

  const playSpeed = (event) => {
    switch (event) {
      case "1":
        // setSpeed(250);
        speed = 250;
        // console.log("speed1", speed);
        break;
      case "2":
        // setSpeed(500);
        speed = 500;
        // console.log("speed2", speed);

        break;
      default:
        // setSpeed(1000);
        speed = 1000;
      // console.log("speed3", speed);
    }
  };

  const changeSpeed = (e) => {
    playSpeed(e);
  };

  let sample = [];
  const sampleConfigs = (event) => {
    switch (event) {
      case "1":
        sample = beehive;
        setGrid(sample);
        break;
      case "2":
        sample = blinker;
        setGrid(sample);
        break;
      case "3":
        sample = pulsarOsc;
        setGrid(sample);
        break;
      case "4":
        sample = spaceFleet;
        setGrid(sample);
        break;
      default:
        sample = gliderGun;
        setGrid(sample);
    }
  };

  const sampleConfig = (e) => {
    sampleConfigs(e);
  };

  return (
    <div className="center">
      <Grid
        grid={grid}
        setGrid={setGrid}
        generation={generation}
        numCols={numCols}
        playing={playing}
      />
      <Controls
        playStop={playStop}
        playing={playing}
        randomSeed={randomSeed}
        reset={reset}
        changeSpeed={changeSpeed}
        sampleConfig={sampleConfig}
      />
    </div>
  );
};

export default GameOfLife;
