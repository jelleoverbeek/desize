import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import Dropzone from "react-dropzone";
import APP_CONFIG from "../../config";

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
            console.log(file);

            return (
              <FileItem
                name={file.name}
                key={index}
                path={file.path}
                type={file.type}
              />
            );
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
                  type={file.type}
                  key={index}
                />
              );
            })}
          </ul>
          <div className="instructions">
            <Dropzone
              onDrop={(acceptedFiles: IFile[] | any) => {
                this.handleFiles(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h2>Drop images</h2>
                    <p className="paragraph--small">
                      Processing starts as soon as your drop an image. Supported
                      formats are:
                      {APP_CONFIG.supportedFileTypes.map((fileType, index) => {
                        const amount = APP_CONFIG.supportedFileTypes.length - 1;
                        return (
                          <span className="instructions__file-type">
                            {" "}
                            {fileType.title}
                            {index !== amount && index !== amount - 1
                              ? ", "
                              : null}
                            {index === amount - 1 ? " and " : null}
                          </span>
                        );
                      })}
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
