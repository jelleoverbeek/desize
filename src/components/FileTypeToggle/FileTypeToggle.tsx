import React, { Component } from "react";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";

export class FileTypeToggle extends Component {
  render() {
    return (
      <Toggle>
        <Button variant="primary">JPG</Button>
        <Button variant="transparent">PNG</Button>
        <Button variant="transparent">Webp</Button>
      </Toggle>
    );
  }
}

export default FileTypeToggle;
