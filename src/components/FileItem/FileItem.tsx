import IFile from "../../interfaces/IFile.interface";
import React, { Component } from "react";
import "./FileItem.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FileSize from "../FileSize/FileSize";
import { ReactComponent as ArrowRightIcon } from "../../img/ArrowRight.svg";
import { ReactComponent as CheckmarkIcon } from "../../img/Checkmark.svg";
import { ReactComponent as PendingIcon } from "../../img/pending.svg";
import { getNewFileName } from "../../utilities/imageProcessing";

interface IProps extends IFile {
  status: "pending" | "processing" | "done";
  errorMessage?: string;
  newFileSize?: number;
  targetFileType: string;
  id: string;
}

export class FileItem extends Component<IProps> {
  renderStatus() {
    if (this.props.status === "pending") {
      return <PendingIcon />;
    } else if (this.props.status === "processing") {
      return <Loader />;
    } else if (this.props.status === "done") {
      return <CheckmarkIcon />;
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div className="file">
          <ErrorMessage
            title={this.props.name}
            message={this.props.errorMessage}
          />
        </div>
      );
    } else {
      return (
        <li className="file" id={this.props.id}>
          <div className="file__status">{this.renderStatus()}</div>
          <div className="file__body">
            <div className="file__meta">
              <span className="file-name">{this.props.name}</span>
              <FileSize size={this.props.size} />
            </div>
            <div className="file__seperator">
              <ArrowRightIcon />
            </div>
            <div className="file__meta">
              <span className="file-name">
                {getNewFileName(this.props.path, this.props.targetFileType)}
              </span>
              {this.props.newFileSize ? (
                <FileSize size={this.props.newFileSize} />
              ) : null}
            </div>
          </div>
        </li>
      );
    }
  }
}

export default FileItem;
