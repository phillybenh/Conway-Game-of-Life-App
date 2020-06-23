import React from "react";

const Background = () => {
  return (
    <div>
      <h2>Background:</h2>
      <p>
        John Conway devised the Game of Life in 1970. THe game requires no input
        after the initial state is set. The game exists on a two-dimensional
        grid. Each grid space has two stats, live or dead. Each grid cell
        interacts with the eight neighboring cells. The game is seeded with
        "live" cells as an initial condition, then the game continues without
        any additional input.
      </p>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">
            Wikipedia
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=R9Plq-D1gEk">
            Learn more from Joh Conway
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Background;
