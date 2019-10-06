import React, { Component } from "react";
import "./FilePanel.css";
import FileItem from "../FileItem/FileItem";
import TopBar from "../TopBar/TopBar";
import Dropzone from "react-dropzone";
import { file } from "@babel/types";
const sharp = window.require("sharp");

interface InterfaceFileObject {
  lastModified: number;
  lastModifiedDate?: Date;
  name: string;
  path?: string;
  size: number;
  type: string;
  webkitRelativePath?: string;
}

export class FilePanel extends Component {
  createNewFilePath(originalPath: string, targetExtension: string): string {
    const regex = new RegExp("(\\\\?([^\\/]*[\\/])*)([^\\/]+)$");
    const filePathObj: any = originalPath.match(regex);

    const fileLocation = filePathObj[1];
    const fileName = filePathObj[3].split(".")[0];
    const newFile = fileLocation + fileName + targetExtension;

    console.log(newFile);
    return newFile;
  }

  handleFiles(files: InterfaceFileObject[]) {
    files.forEach((file: InterfaceFileObject) => {
      if (file.path) {
        const newFilePath: string = this.createNewFilePath(file.path, ".png");

        sharp(file.path)
          .resize(320, 240)
          .toFile(newFilePath, (err: object, info: object) => {
            console.log(err, info);
          });
      }
    });
  }

  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <div className="scrollable-y">
          <ul>
            <FileItem name="image-15185105. png" />
            <FileItem name="image-f1515.png" />
            <FileItem name="image-5.png" />
            <FileItem name="image-asdfasdfasg.png" />
            <FileItem name="image-xbvxzcbzxfbczdxbfzxbcv.png" />
            <FileItem name="image-dfasdf.png" />
          </ul>
          <div className="instructions">
            <Dropzone onDrop={acceptedFiles => this.handleFiles(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h2>Drop images</h2>
                    <p className="paragraph--small">
                      Processing starts as soon as your drop an image. Supported
                      formats are PNG and JPG
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </aside>
    );
  }
}

export default FilePanel;
