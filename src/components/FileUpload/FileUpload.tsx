import IFile from '../../interfaces/IFile.interface';
import React, { Component } from 'react';
import './FileUpload.css';
import Dropzone from 'react-dropzone';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';

interface IState {
  inputFiles: IFile[];
}

interface IProps {
  passInputFiles: any;
}

function DropMessage() {
  return (
    <div className="drop-message">
      <h2>Let go to start processing</h2>
      <SupportedFormatsMessage />
    </div>
  );
}

export class FileUpload extends Component<IProps, IState> {
  render() {
    return (
      <div className="drop-zone">
        <Dropzone
          onDrop={(acceptedFiles: IFile[] | any) => {
            this.props.passInputFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div className="drop-zone" {...getRootProps()}>
              <input {...getInputProps()} disabled />
              {isDragActive ? <DropMessage /> : null}
              {this.props.children}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default FileUpload;
