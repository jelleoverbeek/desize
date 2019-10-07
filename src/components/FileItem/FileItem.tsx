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
}

export class FileItem extends Component<IFile, IState> {
  constructor(props: IFile) {
    super(props);
    this.state = {
      processing: false,
      errorMessage: "",
      newFileName: "",
      newFilePath: ""
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

  processFile(path: string) {
    const newFilePath: string = this.getNewFilePath(path, "png");

    sharp(path)
      .resize(320)
      .toFile(newFilePath, (err: Error, info: object) => {
        if (err) {
          this.setState({
            processing: false,
            errorMessage: err.message
          });
        } else {
          this.setState({
            processing: false
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

  renderBody() {
    if (this.state.errorMessage) {
      return this.renderErrorMessage();
    } else {
      return (
        <div className="file-body">
          <div className="file-status">{this.renderStatus()}</div>
          <span className="file-name file-name--input">{this.props.name}</span>
          <ArrowRightIcon />
          <span className="file-name file-name--output">
            {this.state.newFileName}
          </span>
        </div>
      );
    }
  }

  render() {
    const { name, path } = this.props;
    return <li className="file">{this.renderBody()}</li>;
  }
}

export default FileItem;
