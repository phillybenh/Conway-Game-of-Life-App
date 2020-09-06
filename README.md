# Conway-Game-of-Life-App
I'll be using this repo in order to impliment Conway's Game of Life as a React app.

## Deployment
The app has been deployed to: [https://conway-game-of-life-app.vercel.app/](https://conway-game-of-life-app.vercel.app/)

## Background
John Conway devised the Game of Life in 1970. THe game requires no input after the initial state is set. 

[Per Wikipedia](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) the exists on a two-dimensional grid. Each grid space has two stats, live or dead. Each grid cell interacts with the eight neighboring cells. 

The game is seeded with "live" cells as an initial condition, then the game continues without any additional input.

For each time-step in the game, the rules are:
    
    1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.

    2. Any live cell with two or three live neighbours lives on to the next generation.

    3.  Any live cell with more than three live neighbours dies, as if by overpopulation.

    4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## This project
This project is being completed as a build-week assignment for the computer science unit of the Lambda School web development curiculum. This specific requirements of the assignment can be viewed [here](https://github.com/phillybenh/CS-Build-Week-1). 

The algorithm will be written in JavaScrit and will be visualized in a React App. 
