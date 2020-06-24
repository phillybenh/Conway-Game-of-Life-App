import React from "react";
import * as octoCat from "./Octocat.jpg";

const Footer = () => {
  return (
    <footer>
      <a
        href="https://github.com/phillybenh/Conway-Game-of-Life-App/tree/style-and-polish"
        target="_blank"
      >
        <img src={octoCat} alt="github octocat logo" className="icon" />
      </a>
    </footer>
  );
};

export default Footer;
