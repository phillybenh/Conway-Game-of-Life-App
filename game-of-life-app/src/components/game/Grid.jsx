import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const Grid = (props) => {
  return (
    <>
      <h3>Generation: {props.generation}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${props.numCols}, 20px)`,
          margin: "15px 0px",
        }}
      >
        {props.grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(props.grid, (gridCopy) => {
                  gridCopy[i][k] = props.grid[i][k] ? 0 : 1;
                });
                props.setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: props.grid[i][k] ? "red" : "blue",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid