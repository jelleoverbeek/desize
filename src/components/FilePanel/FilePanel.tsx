import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import Dropzone from "react-dropzone";

interface IState {
  inputFiles: IFile[];
}

interface IProps {}

export class FilePanel extends Component<IProps, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputFiles: []
    };
  }

  renderFileList() {
    if (this.state.inputFiles.length) {
      return (
        <ul className="file-list">
          {this.state.inputFiles.map((file, index) => {
            return <FileItem name={file.name} key={index} />;
          })}
        </ul>
      );
    }
  }

  handleFiles(files: IFile[]) {
    this.setState({
      inputFiles: [...this.state.inputFiles, ...files]
    });
  }

  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <div className="scrollable-y">
          <ul className="file-list">
            {this.state.inputFiles.map((file, index) => {
              return (
                <FileItem
                  name={file.name}
                  path={file.path}
                  size={file.size}
                  key={index}
                />
              );
            })}
          </ul>
          <div className="instructions">
            <Dropzone onDrop={acceptedFiles => this.handleFiles(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h2>Drop images</h2>
                    <p className="paragraph--small">
                      Processing starts as soon as your drop an image. Supported
                      formats are PNG and JPG
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </aside>
    );
  }
}

export default FilePanel;
