import './FilePanel.css';
import React, { useState, useEffect } from 'react';
import IProcessingInput from '../../../interfaces/IProcessingInput.interface';
import IProcessingOutput from '../../../interfaces/IProcessingOutput.interface';
import IQueueItem from '../../../interfaces/IQueueItem.interface';
import { isFileSupported } from '../../utilities/file.utils';
import APP_CONFIG from '../../../config';
import IFile from '../../../interfaces/IFile.interface';
import FileItem from '../FileItem/FileItem';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';
import { getExportOptions } from '../../utilities/exportOptions';
import FileUpload from '../FileUpload/FileUpload';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: any;
  }
}

const FilePanel: React.FunctionComponent = (): JSX.Element => {
  const [fileQueue, setFileQueue] = useState<IQueueItem[]>([]);
  const queueInitiaded = React.useRef(false);
  const queueTime = React.useRef(0);
  const filesProcessing = React.useRef(0);
  const { maxFilesProcessing } = APP_CONFIG;

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'process-image-reply',
      (output: IProcessingOutput) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        processingCallback(output);
      }
    );
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.electron.ipcRenderer.removeAllListeners('process-image-reply');
    };
  });

  function setErrorMessage(queueIndex: number, errorMessage: string) {
    const newFileQueue: IQueueItem[] = fileQueue.map((file: IQueueItem) => {
      if (file.queueIndex === queueIndex) {
        file.errorMessage = errorMessage;
      }
      return file;
    });

    setFileQueue(newFileQueue);
  }

  function scrollToFile(fileIndex: number) {
    const fileNode: HTMLLIElement | null = document.querySelector(
      `#file-${fileIndex}`
    );

    if (fileNode) {
      fileNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  function initNextQueueFile() {
    let nextFilePendingIndex = 0;

    for (let i = 0; i < fileQueue.length; i += 1) {
      if (fileQueue[i].queueStatus === 'pending') {
        nextFilePendingIndex = i;
        break;
      }
    }

    if (nextFilePendingIndex > 0) {
      const newFileQueue: IQueueItem[] = fileQueue.map((file: IQueueItem) => {
        if (file.queueIndex === nextFilePendingIndex) {
          file.queueStatus = 'processing';
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          processFile(file);
          scrollToFile(file.queueIndex);
        }
        return file;
      });

      setFileQueue(newFileQueue);
    }
  }

  function queueFinished() {
    function isAllDone(file: IQueueItem) {
      if (file.queueStatus === 'done') {
        return false;
      }
      return true;
    }

    const remainingQueue = fileQueue.filter(isAllDone);

    if (remainingQueue.length === 0) {
      queueInitiaded.current = false;
      // eslint-disable-next-line no-console
      console.log('queueInitiaded set to: ', queueInitiaded.current);

      filesProcessing.current = 0;
      // eslint-disable-next-line no-console
      console.log('fileProcessing set to: ', filesProcessing.current);

      queueTime.current = Date.now() - queueTime.current;
      // eslint-disable-next-line no-console
      console.log('Queue took: ', queueTime.current / 1000);
    }
  }

  function setDoneStatus(index: number, newFileSize?: number) {
    const newFileQueue: IQueueItem[] = fileQueue.map((file: IQueueItem) => {
      if (file.queueIndex === index) {
        file.queueStatus = 'done';
        file.newFileSize = newFileSize;
        // newFileSize ? (file.newFileSize = newFileSize) : (file.newFileSize = 0);
      }

      return file;
    });

    setFileQueue(newFileQueue);
  }

  function processingCallback(output: IProcessingOutput): void {
    if (output.sharp.error) {
      setErrorMessage(output.file.queueIndex, output.sharp.error.message);
    } else {
      setDoneStatus(output.file.queueIndex, output.sharp.info.size);
    }

    filesProcessing.current -= 1;
    initNextQueueFile();
    queueFinished();
  }

  function processFile(file: IQueueItem) {
    const processingInput: IProcessingInput = {
      file,
      exportOptions: getExportOptions(),
    };
    window.electron.ipcRenderer.processImage(processingInput);
    filesProcessing.current += 1;
  }

  function queueStarted() {
    queueTime.current = Date.now();
    queueInitiaded.current = true;
  }

  function setQueueStatus(queue: IQueueItem[]): IQueueItem[] {
    const updatedQueue: IQueueItem[] = queue.map(
      (queueItem: IQueueItem): IQueueItem => {
        if (
          queueItem.queueStatus !== 'done' &&
          filesProcessing.current < maxFilesProcessing
        ) {
          queueItem.queueStatus = 'processing';

          processFile(queueItem);
          filesProcessing.current += 1;

          return queueItem;
        }
        return queueItem;
      }
    );

    queueStarted();
    return updatedQueue;
  }

  function createQueueItem(file: IFile, index: number): IQueueItem {
    const queueItem: IQueueItem = {
      queueIndex: index,
      queueStatus: 'pending',
      newFileSize: 0,
      newFileType: getExportOptions().fileType,
      path: file.path,
      name: file.name,
      type: file.type,
      size: file.size,
    };

    if (!isFileSupported(file.type)) {
      queueItem.queueStatus = 'done';
      queueItem.errorMessage = `Filetype "${file.type}" is not supported.`;
    }

    return queueItem;
  }

  function addFilesToQueue(files: IFile[]): void {
    let newQueueItems: IQueueItem[] = files.map(
      (file: IFile, index: number): IQueueItem => {
        return createQueueItem(file, fileQueue.length + index);
      }
    );

    newQueueItems = setQueueStatus(newQueueItems);

    setFileQueue(fileQueue.concat(newQueueItems));
  }

  return (
    <main className="file-panel">
      <FileUpload
        passInputFiles={(acceptedFiles: IFile[]) => {
          addFilesToQueue(acceptedFiles);
        }}
      >
        <div className="scrollable-y">
          <ul className="file-list">
            {fileQueue.map((queueItem: IQueueItem, index) => {
              return (
                <FileItem
                  status={queueItem.queueStatus}
                  name={queueItem.name}
                  path={queueItem.path}
                  size={queueItem.size}
                  type={queueItem.type}
                  errorMessage={queueItem.errorMessage}
                  newFileType={queueItem.newFileType}
                  newFileSize={queueItem.newFileSize}
                  id={`file-${index}`}
                  key={queueItem.queueIndex}
                />
              );
            })}
          </ul>
          {!queueInitiaded.current ? (
            <div className="file-panel__instructions">
              <h2>Drop your images here</h2>
              <SupportedFormatsMessage />
            </div>
          ) : (
            false
          )}
        </div>
      </FileUpload>
    </main>
  );
};

export default FilePanel;
