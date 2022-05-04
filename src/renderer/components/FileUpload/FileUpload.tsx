/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styles from './FileUpload.module.css';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';
import IFile from '../../../interfaces/IFile.interface';

interface IProps {
  children: React.ReactNode;
  passInputFiles: (files: IFile[]) => void;
}

function DropMessage() {
  return (
    <div className={styles['drop-message']}>
      <h2>Let go to start processing</h2>
      <SupportedFormatsMessage />
    </div>
  );
}

const FileUpload: React.FunctionComponent<IProps> = ({
  children,
  passInputFiles,
}): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };
  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    passInputFiles(Object.values(event.dataTransfer.files));
  };

  return (
    <div
      className={styles['drop-zone']}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {isDragging ? DropMessage() : null}
      {children}
    </div>
  );
};

export default FileUpload;
