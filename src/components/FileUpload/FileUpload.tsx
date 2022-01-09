/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import './FileUpload.css';
import { useDropzone } from 'react-dropzone';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';
import IFile from '../../interfaces/IFile.interface';

interface IProps {
  children: any;
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

const FileUpload: React.FunctionComponent<IProps> = ({
  children,
  passInputFiles,
}): JSX.Element => {
  const onDrop = useCallback(
    (acceptedFiles: IFile) => {
      passInputFiles(acceptedFiles);
    },
    [passInputFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="drop-zone">
      <input {...getInputProps()} />
      <>
        {isDragActive ? <DropMessage /> : null}
        {children}
      </>
    </div>
  );
};

export default FileUpload;
