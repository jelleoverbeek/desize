import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import SupportedFormatsMessage from "../SupportedFormatsMessage/SupportedFormatsMessage";
import { getExportOptions } from "../../utilities/exportOptions";
import FileUpload from "../FileUpload/FileUpload";

interface IQueueItem {
  queueStatus: "pending" | "processing" | "done";
  queueIndex: number;
  fileInfo: IFile;
}

interface IState {
  fileQueue: IQueueItem[];
  filesProcessing: number;
  maxFilesProcessing: number;
}

interface IProps {}

export class FilePanel extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileQueue: [],
      filesProcessing: 0,
      maxFilesProcessing: 3
    };
  }

  initNextQueueFile() {
    console.log("Init next queueFile");
  }

  updateQueueFile(
    queueStatus: "pending" | "processing" | "done",
    queueIndex: number,
    filesProcessing: number,
    maxFilesProcessing: number
  ) {
    console.log("update queue");
  }

  createQueueItem(file: IFile): IQueueItem {
    const queue: IQueueItem[] = this.state.fileQueue;
    const lastQueueItemIndex: number = queue.length - 1;

    const queueItem: IQueueItem = {
      queueIndex: lastQueueItemIndex + 1,
      queueStatus: "pending",
      fileInfo: file
    };

    return queueItem;
  }

  addFilesToQueue(files: IFile[]): void {
    const newQueueItems: IQueueItem[] = files.map(
      (file: IFile): IQueueItem => {
        return this.createQueueItem(file);
      }
    );

    this.setState({
      fileQueue: [...this.state.fileQueue, ...newQueueItems]
    });
  }

  initProcessing() {
    const queue: IQueueItem[] = this.state.fileQueue;
    let filesProcessing: number = this.state.filesProcessing;
    const maxFilesProcessing: number = this.state.maxFilesProcessing;

    const updatedQueue: IQueueItem[] = queue.map(
      (queueItem: IQueueItem): IQueueItem => {
        if (filesProcessing < maxFilesProcessing) {
          queueItem.queueStatus = "processing";
          filesProcessing++;

          return queueItem;
        } else {
          return queueItem;
        }
      }
    );

    this.setState({
      fileQueue: updatedQueue
    });
  }

  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <FileUpload
          passInputFiles={(acceptedFiles: IFile[]) => {
            this.addFilesToQueue(acceptedFiles);
            this.initProcessing();
          }}
        >
          <div className="scrollable-y">
            <ul className="file-list">
              {this.state.fileQueue.map((queueItem, index) => {
                return (
                  <FileItem
                    status={queueItem.queueStatus}
                    name={queueItem.fileInfo.name}
                    path={queueItem.fileInfo.path}
                    size={queueItem.fileInfo.size}
                    newFileSize={0}
                    targetFileType={getExportOptions().fileType}
                    key={index}
                  />
                );
              })}
            </ul>
            <div className="file-panel__instructions">
              <h2>Drag 'n drop your files</h2>
              <p className="paragraph--small">
                Processing starts as soon as your drop a file.
              </p>
              <SupportedFormatsMessage />
            </div>
          </div>
        </FileUpload>
      </aside>
    );
  }
}

export default FilePanel;
