import React, { Component } from "react";
import "./App.css";
import FilePanel from "./components/FilePanel/FilePanel";
import OptionsPanel from "./components/OptionsPanel/OptionsPanel";
import FileUpload from "./components/FileUpload/FileUpload";
import IFile from "./interfaces/IFile.interface";

interface IProps {}

interface IState {
  inputFiles: IFile[];
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputFiles: []
    };
  }

  handleFiles(files: IFile[]) {
    this.setState({
      inputFiles: files
    });
  }

  render() {
    return (
      <div className="App">
        <FileUpload
          passInputFiles={(acceptedFiles: IFile[]) => {
            this.handleFiles(acceptedFiles);
          }}
        >
          <main>
            <FilePanel inputFiles={this.state.inputFiles} />
            <OptionsPanel />
          </main>
        </FileUpload>
      </div>
    );
  }
}

export default App;
