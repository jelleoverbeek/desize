import React from 'react';
import './FileSize.css';

interface IFileSize {
  size: number;
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

const FileSize: React.FunctionComponent<IFileSize> = ({
  size,
}: IFileSize): JSX.Element => {
  if (typeof size === 'number' && size > 0) {
    return <span className="file-size">{formatBytes(size)}</span>;
  }

  return <></>;
};

export default FileSize;
