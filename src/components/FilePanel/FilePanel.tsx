import "./FilePanel.css";
import APP_CONFIG from "../../config";
import IFile from "../../interfaces/IFile.interface";
import IOutputInfo from "../../interfaces/IOutputInfo.interface";
import React, { Component } from "react";
import FileItem from "../FileItem/FileItem";
import SupportedFormatsMessage from "../SupportedFormatsMessage/SupportedFormatsMessage";
import { getExportOptions } from "../../utilities/exportOptions";
import FileUpload from "../FileUpload/FileUpload";
import {
  isFileSupported,
  proccessImage
} from "../../utilities/imageProcessing";

interface IProccesingOutput {
  error: Error;
  info: IOutputInfo;
}

interface IQueueItem extends IFile {
  queueStatus: "pending" | "processing" | "done";
  queueIndex: number;
  errorMessage?: string;
  newFileSize?: number;
}

interface IState {
  fileQueue: IQueueItem[];
  filesProcessing: number;
  maxFilesProcessing: number;
}

interface IProps {}

export class FilePanel extends Component<IProps, IState> {
  queueTime: number = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      fileQueue: [],
      filesProcessing: 0,
      maxFilesProcessing: APP_CONFIG.maxFilesProcessing
    };
  }

  initNextQueueFile() {
    let nextFilePendingIndex = 0;

    for (var i = 0; i < this.state.fileQueue.length; i++) {
      if (this.state.fileQueue[i].queueStatus === "pending") {
        nextFilePendingIndex = i;
        break;
      }
    }

    if (nextFilePendingIndex > 0) {
      const newFileQueue: IQueueItem[] = this.state.fileQueue.map(
        (file: IQueueItem) => {
          if (file.queueIndex === nextFilePendingIndex) {
            file.queueStatus = "processing";
            this.processFile(file);
          }
          return file;
        }
      );

      this.setState({
        fileQueue: newFileQueue
      });
    }
  }

  setDoneStatus(index: number, newFileSize?: number) {
    const newFileQueue: IQueueItem[] = this.state.fileQueue.map(
      (file: IQueueItem) => {
        if (file.queueIndex === index) {
          file.queueStatus = "done";
          newFileSize
            ? (file.newFileSize = newFileSize)
            : (file.newFileSize = 0);
        }

        return file;
      }
    );

    this.setState({
      fileQueue: newFileQueue
    });
  }

  createQueueItem(file: IFile, index: number): IQueueItem {
    const queueItem: IQueueItem = {
      queueIndex: index,
      queueStatus: "pending",
      newFileSize: 0,
      path: file.path,
      name: file.name,
      type: file.type,
      size: file.size
    };

    return queueItem;
  }

  addFilesToQueue(files: IFile[]): void {
    let newQueueItems: IQueueItem[] = files.map(
      (file: IFile, index: number): IQueueItem => {
        return this.createQueueItem(file, this.state.fileQueue.length + index);
      }
    );

    newQueueItems = this.setQueueStatus(newQueueItems);

    this.setState({
      fileQueue: [...this.state.fileQueue, ...newQueueItems]
    });
  }

  setErrorMessage(index: number, errorMessage: string) {
    const newFileQueue: IQueueItem[] = this.state.fileQueue.map(
      (file: IQueueItem) => {
        if (file.queueIndex === index) {
          file.errorMessage = errorMessage;
        }

        return file;
      }
    );

    this.setState({
      fileQueue: newFileQueue
    });
  }

  decreaseFilesProcessing() {
    this.setState({
      filesProcessing: this.state.filesProcessing - 1
    });
  }

  queueFinished() {
    if (
      this.state.fileQueue[this.state.fileQueue.length - 1].queueStatus ===
      "done"
    ) {
      this.queueTime = Date.now() - this.queueTime;
      console.log("Queue took ", this.queueTime / 1000);
    }
  }

  queueStarted() {
    this.queueTime = Date.now();
  }

  proccessingCallback(file: IQueueItem, output: IProccesingOutput): void {
    if (output.error) {
      this.setErrorMessage(file.queueIndex, output.error.message);
    } else {
      this.setDoneStatus(file.queueIndex, output.info.size);
    }

    this.decreaseFilesProcessing();
    this.initNextQueueFile();
    this.queueFinished();
  }

  processFile(file: IQueueItem) {
    if (isFileSupported(file.type)) {
      proccessImage(
        file.path,
        getExportOptions(),
        (output: IProccesingOutput) => {
          this.proccessingCallback(file, output);
        }
      );

      this.setState({
        filesProcessing: this.state.filesProcessing + 1
      });
    } else {
      this.setErrorMessage(
        file.queueIndex,
        `Filetype "${file.type}" is not supported.`
      );
      this.initNextQueueFile();
    }
  }

  setQueueStatus(queue: IQueueItem[]): IQueueItem[] {
    let filesProcessing: number = this.state.filesProcessing;
    const maxFilesProcessing: number = this.state.maxFilesProcessing;

    const updatedQueue: IQueueItem[] = queue.map(
      (queueItem: IQueueItem): IQueueItem => {
        if (
          queueItem.queueStatus !== "done" &&
          filesProcessing < maxFilesProcessing
        ) {
          queueItem.queueStatus = "processing";
          filesProcessing++;
          this.processFile(queueItem);
          return queueItem;
        } else {
          return queueItem;
        }
      }
    );

    this.queueStarted();
    return updatedQueue;
  }

  render() {
    return (
      <main className="file-panel">
        <FileUpload
          passInputFiles={(acceptedFiles: IFile[]) => {
            this.addFilesToQueue(acceptedFiles);
          }}
        >
          <div className="scrollable-y">
            <ul className="file-list">
              {this.state.fileQueue.map((queueItem, index) => {
                return (
                  <FileItem
                    status={queueItem.queueStatus}
                    name={queueItem.name}
                    path={queueItem.path}
                    size={queueItem.size}
                    type={queueItem.type}
                    errorMessage={queueItem.errorMessage}
                    targetFileType={getExportOptions().fileType}
                    newFileSize={queueItem.newFileSize}
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
      </main>
    );
  }
}

export default FilePanel;
