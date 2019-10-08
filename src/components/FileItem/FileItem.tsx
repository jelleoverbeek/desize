import IFile from "../../interfaces/file.interface";
import React, { Component } from "react";
import "./FileItem.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FileSize from "../FileSize/FileSize";
import { ReactComponent as ArrowRightIcon } from "../../img/ArrowRight.svg";
import { ReactComponent as CheckmarkIcon } from "../../img/Checkmark.svg";

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

  getExportOptions() {
    return {
      fileType: localStorage.getItem("fileType")
    };
  }

  processFile(path: string) {
    const targetExtension: any = this.getExportOptions().fileType;
    const newFilePath: string = this.getNewFilePath(path, targetExtension);

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
    const targetExtension: any = this.getExportOptions().fileType;

    if (this.props.path) {
      this.setState(
        {
          processing: true,
          newFileName: this.getNewFileName(this.props.path, targetExtension),
          newFilePath: this.getNewFilePath(this.props.path, targetExtension)
        },
        () => {
          if (this.props.path) {
            this.processFile(this.props.path);
          }
        }
      );
    }
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="file">
          <ErrorMessage
            title={this.props.name}
            message={this.state.errorMessage}
          />
        </div>
      );
    } else {
      return (
        <li className="file">
          <div className="file-status">{this.renderStatus()}</div>
          <span className="file-name file-name--input">
            {this.props.name} <FileSize size={this.props.size} />
          </span>
          <ArrowRightIcon />
          <span className="file-name file-name--output">
            {this.state.newFileName} <FileSize size={this.state.newFileSize} />
          </span>
        </li>
      );
    }
  }
}

export default FileItem;
