import React, { Component } from "react";
import "./FileSize.css";

interface IFileSize {
  size?: number;
}

export class FileItem extends Component<IFileSize> {
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

  render() {
    const { size } = this.props;

    if (typeof size === "number" && size > 0) {
      return <span className="file-size">({this.formatBytes(size)})</span>;
    } else {
      return null;
    }
  }
}

export default FileItem;
