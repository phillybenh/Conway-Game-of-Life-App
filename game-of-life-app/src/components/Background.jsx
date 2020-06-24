import React from "react";

import { Accordion, Card} from "react-bootstrap";


const Background = () => {
  return (
    <div className="information">
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h2>Background:</h2>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              <p>
                John Conway devised the Game of Life in 1970. The game is a
                simulation that models the life and death of cells based on four
                simple rules. The game exists on a two-dimensional grid. Each
                grid cell has two states, live or dead. Each cell interacts with
                the eight neighboring cells. The game is seeded with "live"
                cells as an initial condition, then the game continues without
                any additional input.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h5>Learn More:</h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {" "}
              <ul>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
                    target="_blank"
                  >
                    Wikipedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=R9Plq-D1gEk"
                    target="_blank"
                  >
                    Hear from John Conway himself
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Background;
