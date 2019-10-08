import IFile from "../../interfaces/file.interface";
import React, { Component } from "react";
import "./FileItem.css";
import Loader from "../Loader/Loader";
import { ReactComponent as ArrowRightIcon } from "../../img/ArrowRight.svg";
import { ReactComponent as CheckmarkIcon } from "../../img/Checkmark.svg";
import { ReactComponent as ErrorIcon } from "../../img/Error.svg";
const sharp = window.require("sharp");

interface IState {
  processing: boolean;
  errorMessage: string;
  newFileName: string;
  newFilePath: string;
  newFileSize: number;
}

interface IOutputInfo {
  channels: number;
  format: string;
  height: number;
  premultiplied: boolean;
  size: number;
  width: number;
}

export class FileItem extends Component<IFile, IState> {
  constructor(props: IFile) {
    super(props);
    this.state = {
      processing: false,
      errorMessage: "",
      newFileName: "",
      newFilePath: "",
      newFileSize: 0
    };
  }

  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return "0 Bytes";
    }

    const k: number = 1024;
    const dm: number = decimals < 0 ? 0 : decimals;
    const sizes: string[] = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    ];

    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  splitPath(path: string): any {
    const regex = new RegExp("(\\\\?([^\\/]*[\\/])*)([^\\/]+)$");
    const filePathObj: any = path.match(regex);

    return filePathObj;
  }

  getNewFileName(originalPath: string, targetExtension: string): string {
    const filePathObj: any = this.splitPath(originalPath);
    const fileName = filePathObj[3].split(".")[0];
    const newFileName = fileName + "." + targetExtension;

    return newFileName;
  }

  getNewFilePath(originalPath: string, targetExtension: string): string {
    const filePathObj: any = this.splitPath(originalPath);
    const fileLocation = filePathObj[1];
    const fileName = filePathObj[3].split(".")[0];
    const newFilePath = fileLocation + fileName + "." + targetExtension;

    return newFilePath;
  }

  processFile(path: string) {
    const newFilePath: string = this.getNewFilePath(path, "png");

    sharp(path)
      .resize(320)
      .toFile(newFilePath, (err: Error, outputInfo: IOutputInfo) => {
        if (err) {
          this.setState({
            processing: false,
            errorMessage: err.message
          });
        } else {
          console.log(outputInfo);
          this.setState({
            processing: false,
            newFileSize: outputInfo.size
          });
        }
      });
  }

  renderStatus() {
    if (this.state.processing) {
      return <Loader />;
    } else {
      return <CheckmarkIcon />;
    }
  }

  componentDidMount() {
    if (this.props.path) {
      this.setState(
        {
          processing: true,
          newFileName: this.getNewFileName(this.props.path, "png"),
          newFilePath: this.getNewFilePath(this.props.path, "png")
        },
        () => {
          if (this.props.path) {
            this.processFile(this.props.path);
          }
        }
      );
    }
  }

  renderErrorMessage() {
    return (
      <div className="file-body file-body--error">
        <div className="file-status">
          <ErrorIcon />
        </div>
        <span>
          {this.props.name} - {this.state.errorMessage}
        </span>
      </div>
    );
  }

  renderFileSize(size: any) {
    if (typeof size === "number" && size > 0) {
      return <span className="file-size">({this.formatBytes(size)})</span>;
    }
  }

  renderBody() {
    if (this.state.errorMessage) {
      return this.renderErrorMessage();
    } else {
      return (
        <div className="file-body">
          <div className="file-status">{this.renderStatus()}</div>
          <span className="file-name file-name--input">
            {this.props.name} {this.renderFileSize(this.props.size)}
          </span>
          <ArrowRightIcon />
          <span className="file-name file-name--output">
            {this.state.newFileName}{" "}
            {this.renderFileSize(this.state.newFileSize)}
          </span>
        </div>
      );
    }
  }

  render() {
    return <li className="file">{this.renderBody()}</li>;
  }
}

export default FileItem;
