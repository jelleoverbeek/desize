import React, { Component } from "react";
import { ReactComponent as LoaderIcon } from "./loader.svg";
import "./Loader.css";

export class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <LoaderIcon />
      </div>
    );
  }
}

export default Loader;
