import React, { Component } from "react";
import OptionsList from "../OptionsList/OptionsList";
import OptionsItem from "../OptionsItem/OptionsItem";
import Button from "../Button/Button";
import Toggle from "../Toggle/Toggle";

interface IState {
  activeFileType: string;
}

interface IProps {}

export class FileTypeControl extends Component<IProps, IState> {
  render() {
    return (
      <OptionsList>
        <OptionsItem>
          <label>File Type</label>
          <Toggle>
            <Button variant="primary">JPG</Button>
            <Button variant="transparent">PNG</Button>
            <Button variant="transparent">Webp</Button>
          </Toggle>
        </OptionsItem>
        <OptionsList>
          <OptionsItem>
            <label>File Type</label>
            <Toggle>
              <Button variant="primary">JPG</Button>
              <Button variant="transparent">PNG</Button>
              <Button variant="transparent">Webp</Button>
            </Toggle>
          </OptionsItem>
        </OptionsList>
      </OptionsList>
    );
  }
}

export default FileTypeControl;
