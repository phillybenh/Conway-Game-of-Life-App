import React from "react";

import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Game.css";

const Controls = (props) => {
  return (
    <div className="buttonContainer">
      <h4 className="gameHeadings">Game Controls</h4>
      <div className="buttons">
        <Button variant="primary" onClick={props.playStop}>
          {props.playing ? "Stop" : "Start"}
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
      <div className="sampleConfigs">
        <h4>Try automatically seeding the grid: </h4>
        <div className="buttons">
          <Button variant="primary" onClick={props.randomSeed}>
            Random Seed
          </Button>
          <DropdownButton
            title="Patterns"
            id="sample-menu"
            onSelect={props.sampleConfig}
          >
            <Dropdown.Item eventKey="1">"Beehive"</Dropdown.Item>
            <Dropdown.Item eventKey="2">"Blinker"</Dropdown.Item>
            <Dropdown.Item eventKey="3">"Pulsar Oscillator"</Dropdown.Item>
            <Dropdown.Item eventKey="4">"Space Fleet"</Dropdown.Item>
            <Dropdown.Item eventKey="5">"Glider Gun"</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};

export default Controls;
