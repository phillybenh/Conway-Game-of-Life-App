import React, { useState, useCallback, useRef } from "react";
import produce from "immer";


// Grid displays the game on screen
// also handles when a user clicks to select a cell
const Grid = (props) => {
  return (
    <section className="gridcontainer">
      {/* display generation count on screen */}
      <h3 className="gameHeadings">Generation: {props.generation}</h3>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.numCols}, 20px)`,
          margin: "15px 0px",
          justifyContent: "center",
        }}
      >
        {props.grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                if (!props.playing) {
                  const newGrid = produce(props.grid, (gridCopy) => {
                    gridCopy[i][k] = props.grid[i][k] ? 0 : 1;
                  });
                  props.setGrid(newGrid);
                }
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: props.grid[i][k] ? "seagreen" : "darkorchid",
                border: "solid 0.5px grey",
              }}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Grid;
