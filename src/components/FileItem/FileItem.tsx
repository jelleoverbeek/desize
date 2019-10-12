import IFile from "../../interfaces/IFile.interface";
import APP_CONFIG from "../../config";
import React, { Component } from "react";
import "./FileItem.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FileSize from "../FileSize/FileSize";
import { ReactComponent as ArrowRightIcon } from "../../img/ArrowRight.svg";
import { ReactComponent as CheckmarkIcon } from "../../img/Checkmark.svg";
import {
  IExportOptions,
  IJpgOptions,
  IWebpOptions
} from "../../interfaces/IExportOptions.interface";
import { getExportOptions } from "../../utilities/exportOptions";

const sharp = window.require("sharp");
const fs = window.require("file-system");

interface IState {
  exportOptions: IExportOptions;
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

interface IProps extends IFile {}

export class FileItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      exportOptions: getExportOptions(),
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
    const fileName = filePathObj[3].split(".")[0];
    const fileLocation = filePathObj[1];
    const newFileLocation = fileLocation + targetExtension + "-processed";

    fs.mkdirSync(newFileLocation, (err: Error) => {
      console.error(err);
    });

    const newFilePath =
      newFileLocation + "/" + fileName + "." + targetExtension;

    return newFilePath;
  }

  handleOutput = (err: Error, outputInfo: IOutputInfo) => {
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
  };

  processJpg() {
    const jpgOptions: IJpgOptions = this.state.exportOptions.jpgOptions;

    sharp(this.props.path)
      .jpeg({
        quality: jpgOptions.quality
      })
      .toFile(this.state.newFilePath, this.handleOutput);
  }

  processWebp() {
    const webpOptions: IWebpOptions = this.state.exportOptions.webpOptions;

    sharp(this.props.path)
      .webp({
        quality: webpOptions.quality
      })
      .toFile(this.state.newFilePath, this.handleOutput);
  }

  initProccesing() {
    const exportFileType: string = this.state.exportOptions.fileType;

    if (exportFileType === "jpg") {
      this.processJpg();
    } else if (exportFileType === "webp") {
      this.processWebp();
    } else {
      this.setState({
        errorMessage:
          "Something went wrong. Change your export options and try again."
      });
    }
  }

  isFileSupported(inputMimeType: string): boolean {
    let isSupported: boolean = false;

    APP_CONFIG.supportedFileTypes.forEach(supportedFileType => {
      supportedFileType.mimeTypes.forEach(mimeType => {
        if (inputMimeType === mimeType) {
          isSupported = true;
        }
      });
    });

    return isSupported;
  }

  componentDidMount() {
    if (this.isFileSupported(this.props.type)) {
      this.setState(
        {
          exportOptions: getExportOptions(),
          processing: true,
          newFileName: this.getNewFileName(
            this.props.path,
            this.state.exportOptions.fileType
          ),
          newFilePath: this.getNewFilePath(
            this.props.path,
            this.state.exportOptions.fileType
          )
        },
        () => {
          this.initProccesing();
        }
      );
    } else {
      this.setState({
        errorMessage: `Filetype "${this.props.type}" is not supported.`
      });
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
          <div className="file__status">
            {this.state.processing ? <Loader /> : <CheckmarkIcon />}
          </div>
          <div className="file__body">
            <div className="file__meta">
              <span className="file-name">{this.props.name}</span>
              <FileSize size={this.props.size} />
            </div>
            <div className="file__seperator">
              <ArrowRightIcon />
            </div>
            <div className="file__meta">
              <span className="file-name">{this.state.newFileName}</span>
              <FileSize size={this.state.newFileSize} />
            </div>
          </div>
        </li>
      );
    }
  }
}

export default FileItem;
