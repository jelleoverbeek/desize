import React, { Component } from "react";
import "./FilePanel.css";
import File from "../File/File";
import TopBar from "../TopBar/TopBar";

export class FilePanel extends Component {
  render() {
    return (
      <aside className="file-panel">
        <TopBar title="Files"></TopBar>
        <div className="scrollable-y">
          <ul>
            <File name="image-15185105.png" />
            <File name="image-f1515.png" />
            <File name="image-5.png" />
            <File name="image-asdfasdfasg.png" />
            <File name="image-xbvxzcbzxfbczdxbfzxbcv.png" />
            <File name="image-dfasdf.png" />
          </ul>
          <div className="instructions">
            <h2>Drop images</h2>
            <p className="paragraph--small">
              Processing starts as soon as your drop an image. Supported formats
              are PNG and JPG
            </p>
          </div>
        </div>
      </aside>
    );
  }
}

export default FilePanel;
