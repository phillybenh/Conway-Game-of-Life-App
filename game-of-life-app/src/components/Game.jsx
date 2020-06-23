import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ButtonToolbar,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

//import sub-components
import Controls from "./Controls";

// import styles
import "./Game.css";

// set up the box component
const Box = (props) => {
  const selectBox = () => {
    props.selectBox(props.row, props.col);
  };

  return <div className={props.boxClass} id={props.id} onClick={selectBox} />;
};

// setting up the game grid
const Grid = (props) => {
  const width = props.cols * 14;
  var rowsArr = [];

  var boxClass = "";
  // refactto to map TODO?
  for (var i = 0; i < props.rows; i++) {
    for (var j = 0; j < props.cols; j++) {
      let boxId = i + "_" + j;
      // get classes from CSS for cell
      boxClass = props.gridFull[i][j] ? "box on" : "box off";
      // push box component into array
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={props.selectBox}
        />
      );
    }
  }

  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  );
};
const Buttons = (props) => {
  const handleSelect = (evt) => {
    props.gridSize(evt);
  };
  return (
    <div className="center">
      {/* <ButtonToolbar> */}
      <Button
        variant="primary"
        class="btn-space"
        onClick={(e) => {
          e.preventDefault();
          props.playButton();
        }}
      >
        {props.playing ? "Stop" : "Start"}{" "}
      </Button>
      {/* <Button variant="primary" onClick={props.pauseButton}>
        Pause
      </Button> */}
      <Button variant="primary" onClick={props.clear}>
        Clear
      </Button>
      <Button variant="primary" onClick={props.slow}>
        Slow
      </Button>
      <Button variant="primary" onClick={props.fast}>
        Fast
      </Button>
      <Button variant="primary" onClick={props.seed}>
        Seed
      </Button>
      <DropdownButton title="Grid Size" id="size-menu" onSelect={handleSelect}>
        <Dropdown.Item eventKey="1">25x15</Dropdown.Item>
        <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
        <Dropdown.Item eventKey="3">100x60</Dropdown.Item>
      </DropdownButton>

      {/* </ButtonToolbar> */}
    </div>
  );
};
const GameOfLife = () => {
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(50);
  const [gridFull, setGridFull] = useState(
    Array(rows)
      .fill()
      .map(() => {
        return Array(cols).fill(false);
      })
  );

  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // allows you to select a box to toggle it's state
  const selectBox = (row, col) => {
    const gridCopy = arrayClone(gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(gridCopy);
  };

  const randomSeed = () => {
    console.log("SEED!");
    const gridCopy = arrayClone(gridFull);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setGridFull(gridCopy);
  };

  var intervalId;

  const playButton = () => {
    console.log("play");
    // this doesn't work w/ fcn components
    //
    // clearInterval(intervalId);
    // intervalId = setInterval(play(), speed);
    setPlaying(!playing);
    if (!playing) {
      playingRef.current = true;
      play();
    }
  };

  // const pauseButton = () => {
  //   // handled in useEffect below
  //   // clearInterval(intervalId);
  //   setPlaying(false);
  // };

  const slow = () => {
    setSpeed(1000);
    playButton();
  };

  const fast = () => {
    setSpeed(100);
    playButton();
  };

  const clear = () => {
    var grid = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
    // setState({
    //   gridFull: grid,
    //   generation: 0,
    // });
    setGeneration(0);
    setGridFull(grid);
  };

  const gridSize = (size) => {
    switch (size) {
      case "1":
        setCols(25);
        setRows(15);
        break;
      case "2":
        setCols(50);
        setRows(30);
        break;
      default:
        setCols(100);
        setRows(60);
    }
    clear();
  };

  const play = useCallback(() => {
    if (!playingRef) {
      return;
    }
    let g = gridFull;
    let g2 = arrayClone(gridFull);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < rows - 1) if (g[i + 1][j]) count++;
        if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < rows - 1 && j < cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    setGridFull(g2);
    setGeneration(generation + 1);

    setTimeout(play, speed);
  }, []);

  // initialize grid w/ random live cells
  useEffect(() => {
    randomSeed();
  }, []);

  useEffect(() => {
    let intervalId = null;
    if (playing) {
      intervalId = setInterval(() => {
        play();
      }, speed);
    } else if (!playing) {
      clearInterval(intervalId);
    } else {
      return () => clearInterval(intervalId);
    }
  }, [playing]);

  return (
    <div>
      <h2>Game</h2>

      <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox} />
      <Buttons
        playButton={playButton}
        playing={playing}
        // pauseButton={pauseButton}
        slow={slow}
        fast={fast}
        clear={clear}
        seed={randomSeed}
        gridSize={gridSize}
      />
      <Controls />
      <h3>Generations: {generation}</h3>
    </div>
  );
};

function arrayClone(arr) {
  return arr.map((array) => array.slice());
}
export default GameOfLife;
