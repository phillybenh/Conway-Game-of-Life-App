import React from "react";

import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Game.css";


const Controls = (props) => {
  return (
    <div className="buttons">
      <Button variant="primary" onClick={props.playStop}>
        {props.playing ? "Stop" : "Start"}
      </Button>
      <Button variant="primary" onClick={props.randomSeed}>
        Random Seed
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
  );
};

export default Controls;
