import React from "react";
import { Accordion, Card } from "react-bootstrap";

const Rules = () => {
  return (
    <div className="information">
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h2>Rules for Conway's Game of Life:</h2>{" "}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              <ol>
                <li>
                  Any live cell with fewer than two live neighbours dies, as if
                  by underpopulation.
                </li>
                <li>
                  Any live cell with two or three live neighbours lives on to
                  the next generation.
                </li>
                <li>
                  Any live cell with more than three live neighbours dies, as if
                  by overpopulation.
                </li>
                <li>
                  Any dead cell with exactly three live neighbours becomes a
                  live cell, as if by reproduction.
                </li>
              </ol>{" "}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h5>Playing the Game of Life is easy:</h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ol>
                <li>Select an initial pattern by either:</li>
                <ul>
                  <li>
                    Clicking individual grid squares to select your live cells
                  </li>
                  <li>Clicking the random seed button</li>
                  <li>
                    Selecting one of the pre-defined patters from the 'Patterns'
                    dropdown
                  </li>
                </ul>
                <li>
                  Select a refresh speed form the "Speed" dropdown (optional)
                </li>
                <li>Click the "Start" button to begin the simulation</li>
                <li>
                  Sit back and watch as your cells multiply, die, or stagnate
                  into a steady state
                  <li>
                    You can stop, reset, or change the game speed at any time.
                  </li>
                </li>
              </ol>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Rules;
