import React from 'react';
import IFile from '../../interfaces/IFile.interface';
import './FileItem.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FileSize from '../FileSize/FileSize';
import ArrowRight from '../icons/ArrowRight';
import Checkmark from '../icons/Checkmark';
import Pending from '../icons/Pending';
// import { getNewFileName } from '../../utilities/imageProcessing';

interface IProps extends IFile {
  status: 'pending' | 'processing' | 'done';
  errorMessage?: string;
  newFileSize?: number;
  targetFileType: string;
  id: string;
}

function renderStatus(status: IProps['status']) {
  if (status === 'pending') {
    return <Pending />;
  }

  if (status === 'processing') {
    return <Loader />;
  }

  if (status === 'done') {
    return <Checkmark />;
  }

  return <Pending />;
}

const FileItem: React.FunctionComponent<IProps> = ({
  status,
  name,
  id,
  size = 0,
  path,
  targetFileType,
  errorMessage,
  newFileSize,
}: IProps): JSX.Element => {
  if (errorMessage) {
    return (
      <div className="file">
        <ErrorMessage title={name} message={errorMessage} />
      </div>
    );
  }

  return (
    <li className="file" id={id}>
      <div className="file__status">{renderStatus(status)}</div>
      <div className="file__body">
        <div className="file__meta">
          <span className="file-name">{name}</span>
          <FileSize size={size} />
        </div>
        <div className="file__seperator">
          <ArrowRight />
        </div>
        <div className="file__meta">
          <span className="file-name">
            {/* {getNewFileName(path, targetFileType)} */}
          </span>
          {newFileSize ? <FileSize size={newFileSize} /> : null}
        </div>
      </div>
    </li>
  );
};

export default FileItem;
