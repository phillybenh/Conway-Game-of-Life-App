import React, { useEffect, useState } from "react";

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

const GameOfLife = () => {
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [rows, setRowsd] = useState(30);
  const [cols, setCols] = useState(50);
  const [gridFull, setGridFull] = useState(
    Array(rows)
      .fill()
      .map(() => {
        return Array(cols).fill(false);
      })
  );
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

  useEffect(() => {
    randomSeed();
  }, []);

  return (
    <div>
      <h2>Game</h2>
      <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox} />

      <Controls />
      <h3>Generations: {generation}</h3>
    </div>
  );
};

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
export default GameOfLife;

/*
import React, {useEffect, useState} from 'react';

//import sub-components
import Controls from './Controls';

 
export default function GameOfLife () {
    // function draw() {
    //   var canvas = document.getElementById("canvas");
    //   if (canvas.getContext) {
    //     var ctx = canvas.getContext("2d");

    //     ctx.fillRect(25, 25, 100, 100);
    //     ctx.clearRect(45, 45, 60, 60);
    //     ctx.strokeRect(50, 50, 50, 50);
    //   }
    // }
    function draw() {
      var ctx = document.getElementById("canvas").getContext("2d");
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          ctx.fillStyle =
            "rgb(" +
            Math.floor(255 - 42.5 * i) +
            ", " +
            Math.floor(255 - 42.5 * j) +
            ", 0)";
          ctx.fillRect(j * 25, i * 25, 25, 25);
        }
      }
    }
    useEffect(() => {draw()}, [])
    return (
      <div>
        <canvas
          id="canvas"
          width="200"
          height="200"
        ></canvas>
        <p>Game</p>
        <Controls />
      </div>
    );
    
    
}
*/
