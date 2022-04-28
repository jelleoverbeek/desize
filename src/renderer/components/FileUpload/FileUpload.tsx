/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import './FileUpload.css';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';
import IFile from '../../../interfaces/IFile.interface';

interface IProps {
  children: React.ReactNode;
  passInputFiles: (files: IFile[]) => void;
}

function DropMessage() {
  return (
    <div className="drop-message">
      <h2>Let go to start processing</h2>
      <SupportedFormatsMessage />
    </div>
  );
}

const FileUpload: React.FunctionComponent<IProps> = ({
  children,
  passInputFiles,
}): JSX.Element => {
  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    passInputFiles(Object.values(event.dataTransfer.files));
  };

  return (
    <div
      className="drop-zone"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {children}
    </div>
  );
};

export default FileUpload;
