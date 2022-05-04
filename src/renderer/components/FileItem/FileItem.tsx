import React from 'react';
import IFile from '../../../interfaces/IFile.interface';
import styles from './FileItem.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FileSize from '../FileSize/FileSize';
import ArrowRight from '../icons/ArrowRight';
import Checkmark from '../icons/Checkmark';
import Pending from '../icons/Pending';
import { getNewFileName } from '../../utilities/file.utils';

interface IProps extends IFile {
  status: 'pending' | 'processing' | 'done';
  errorMessage?: string;
  newFileSize?: number;
  newFileType: string;
  id: string;
}

const defaultProps = {
  errorMessage: undefined,
  newFileSize: 0,
};

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
  newFileType: targetFileType,
  errorMessage,
  newFileSize,
}: IProps): JSX.Element => {
  if (errorMessage) {
    return (
      <div className={styles.file}>
        <ErrorMessage title={name} message={errorMessage} />
      </div>
    );
  }

  return (
    <li className={styles.file} id={id}>
      <div className={styles.status}>{renderStatus(status)}</div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.name}>{name}</span>
          <FileSize size={size} />
        </div>
        <div className={styles.seperator}>
          <ArrowRight />
        </div>
        <div className={styles.meta}>
          <span className={styles.name}>
            {getNewFileName(path, targetFileType)}
          </span>
          {newFileSize ? <FileSize size={newFileSize} /> : null}
        </div>
      </div>
    </li>
  );
};

FileItem.defaultProps = defaultProps;

export default FileItem;
