import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import SupportedFormatsMessage from "../SupportedFormatsMessage/SupportedFormatsMessage";
import { getExportOptions } from "../../utilities/exportOptions";
import FileUpload from "../FileUpload/FileUpload";
import {
  isFileSupported,
  proccessImage
} from "../../utilities/imageProcessing";
import IOutputInfo from "../../interfaces/IOutputInfo.interface";

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
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileQueue: [],
      filesProcessing: 0,
      maxFilesProcessing: 3
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
      fileQueue: newFileQueue,
      filesProcessing: this.state.filesProcessing - 1
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

  proccessingCallback(file: IQueueItem, output: IProccesingOutput): void {
    if (output.error) {
      this.setErrorMessage(file.queueIndex, output.error.message);
    } else {
      this.setDoneStatus(file.queueIndex, output.info.size);
    }
    this.initNextQueueFile();
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
    }
  }

  setQueueStatus(queue: IQueueItem[]): IQueueItem[] {
    let filesProcessing: number = this.state.filesProcessing;
    const maxFilesProcessing: number = this.state.maxFilesProcessing;

    const updatedQueue: IQueueItem[] = queue.map(
      (queueItem: IQueueItem): IQueueItem => {
        if (filesProcessing < maxFilesProcessing) {
          queueItem.queueStatus = "processing";
          filesProcessing++;
          this.processFile(queueItem);

          return queueItem;
        } else {
          return queueItem;
        }
      }
    );

    return updatedQueue;
  }

  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <FileUpload
          passInputFiles={(acceptedFiles: IFile[]) => {
            this.addFilesToQueue(acceptedFiles);
            // this.setQueueStatus();
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
      </aside>
    );
  }
}

export default FilePanel;
