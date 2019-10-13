import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import SupportedFormatsMessage from "../SupportedFormatsMessage/SupportedFormatsMessage";

interface IQueueItem extends IFile {
  queueStatus: "pending" | "processing" | "done";
  queueIndex: number;
}

interface IState {
  fileQueue: IQueueItem[];
  queuePosition: number;
  maxFilesProcessing: number;
}

interface IProps {
  inputFiles: IFile[];
}

export class FilePanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileQueue: [],
      queuePosition: 0,
      maxFilesProcessing: 1
    };
  }

  setQueueStatus(queueIndex: number): "pending" | "processing" | "done" {
    const queuePosition: number = this.state.queuePosition;
    const maxFilesProcessing: number = this.state.maxFilesProcessing;

    if (queueIndex < queuePosition) {
      return "done";
    } else if (
      queueIndex === queuePosition ||
      (queueIndex >= queuePosition &&
        queueIndex <= queuePosition + maxFilesProcessing - 1)
    ) {
      return "processing";
    } else {
      return "pending";
    }
  }

  updateQueuePosition() {
    this.setState({
      queuePosition: this.state.queuePosition + 1
    });
  }

  addFilesToQueue(files: IFile[]) {
    const fileQueue = [...this.state.fileQueue, ...files].map(
      (file: any, index: number) => {
        file.queueIndex = index;
        file.queueStatus = this.setQueueStatus(index);
        return file;
      }
    );

    this.setState({
      fileQueue
    });
  }

  updateQueue() {
    const fileQueue = this.state.fileQueue.map((file: any, index: number) => {
      file.queueIndex = index;
      file.queueStatus = this.setQueueStatus(index);
      return file;
    });

    this.setState({
      fileQueue
    });
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.inputFiles !== this.props.inputFiles) {
      this.addFilesToQueue(this.props.inputFiles);
    }
  }

  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <div className="scrollable-y">
          <ul className="file-list">
            {this.state.fileQueue.map((file, index) => {
              return (
                <FileItem
                  queueStatus={this.setQueueStatus(index)}
                  name={file.name}
                  path={file.path}
                  size={file.size}
                  type={file.type}
                  key={index}
                  doneProcessingHandler={() => {
                    this.updateQueuePosition();
                    this.updateQueue();
                  }}
                />
              );
            })}
          </ul>
          <div className="instructions">
            <h2>Drag 'n drop your files</h2>
            <p className="paragraph--small">
              Processing starts as soon as your drop a file.
            </p>
            <SupportedFormatsMessage />
          </div>
        </div>
      </aside>
    );
  }
}

export default FilePanel;
