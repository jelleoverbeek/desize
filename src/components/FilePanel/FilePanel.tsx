import './FilePanel.css';
import IProcessingInput from 'interfaces/IProcessingInput.interface';
import IProcessingOutput from 'interfaces/IProcessingOutput.interface';
import { ISharpOutput } from 'interfaces/ISharpOutput.interface';
import IQueueItem from 'interfaces/IQueueItem.interface';
import React, { useState } from 'react';
import APP_CONFIG from '../../config';
import IFile from '../../interfaces/IFile.interface';
import FileItem from '../FileItem/FileItem';
import SupportedFormatsMessage from '../SupportedFormatsMessage/SupportedFormatsMessage';
import { getExportOptions } from '../../utilities/exportOptions';
import FileUpload from '../FileUpload/FileUpload';
import { isFileSupported } from '../../utilities/imageProcessing';

declare global {
  interface Window {
    electron: any;
  }
}

interface IProps {
  maxFilesProcessing?: number;
}

const FilePanel: React.FunctionComponent<IProps> = ({
  maxFilesProcessing = APP_CONFIG.maxFilesProcessing,
}): JSX.Element => {
  const [fileQueue, setFileQueue] = useState<IQueueItem[]>([]);
  const [filesProcessing, setFilesProcessing] = useState<number>(0);
  const [queueInitiaded, setQueueInitiaded] = useState<boolean>(false);
  const [queueTime, setQueueTime] = useState<number>(0);

  function setErrorMessage(index: number, errorMessage: string) {
    const newFileQueue: IQueueItem[] = fileQueue.map((file: IQueueItem) => {
      if (file.queueIndex === index) {
        file.errorMessage = errorMessage;
      }

      return file;
    });

    setFileQueue(newFileQueue);
  }

  function scrollToFile(fileIndex: number) {
    const scrollContainer: HTMLDivElement | null =
      document.querySelector('.scrollable-y');
    const fileNode: HTMLLIElement | null = document.querySelector(
      `#file-${fileIndex}`
    );

    if (fileNode && scrollContainer) {
      const fileHeight: number = fileNode.getBoundingClientRect().height;

      scrollContainer.scrollTo({
        top: fileNode.offsetTop - APP_CONFIG.maxFilesProcessing * fileHeight,
        behavior: 'smooth',
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
          scrollToFile(file.queueIndex);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          processFile(file);
        }
        return file;
      });

      setFileQueue(newFileQueue);
    }
  }

  function decreaseFilesProcessing() {
    setFilesProcessing(filesProcessing - 1);
  }

  function queueFinished() {
    if (fileQueue[fileQueue.length - 1].queueStatus === 'done') {
      setQueueTime(Date.now() - queueTime);
      console.log('Queue took ', queueTime / 1000);
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

  function proccessingCallback(output: IProcessingOutput): void {
    if (output.sharp.error) {
      setErrorMessage(output.file.queueIndex, output.sharp.error.message);
    } else {
      setDoneStatus(output.file.queueIndex, output.sharp.info.size);
    }

    decreaseFilesProcessing();
    initNextQueueFile();
    queueFinished();
  }

  window.electron.api.on('process-image-reply', (output: IProcessingOutput) => {
    // eslint-disable-next-line no-console
    console.log('file', output);

    proccessingCallback(output);
  });

  function processFile(file: IQueueItem) {
    if (isFileSupported(file.type)) {
      const proccesingInput: IProcessingInput = {
        file,
        exportOptions: getExportOptions(),
      };

      window.electron.api.processImage(proccesingInput);

      setFilesProcessing(filesProcessing + 1);
    } else {
      setErrorMessage(
        file.queueIndex,
        `Filetype "${file.type}" is not supported.`
      );
      initNextQueueFile();
    }
  }

  function queueStarted() {
    setQueueTime(Date.now());
    setQueueInitiaded(true);
  }

  function setQueueStatus(queue: IQueueItem[]): IQueueItem[] {
    const updatedQueue: IQueueItem[] = queue.map(
      (queueItem: IQueueItem): IQueueItem => {
        if (
          queueItem.queueStatus !== 'done' &&
          filesProcessing < maxFilesProcessing
        ) {
          queueItem.queueStatus = 'processing';
          setFilesProcessing(filesProcessing + 1);
          processFile(queueItem);
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
      path: file.path,
      name: file.name,
      type: file.type,
      size: file.size,
    };

    return queueItem;
  }

  function addFilesToQueue(files: IFile[]): void {
    let newQueueItems: IQueueItem[] = files.map(
      (file: IFile, index: number): IQueueItem => {
        return createQueueItem(file, fileQueue.length + index);
      }
    );

    newQueueItems = setQueueStatus(newQueueItems);

    setFileQueue(newQueueItems);
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
                  targetFileType={getExportOptions().fileType}
                  newFileSize={queueItem.newFileSize}
                  id={`file-${index}`}
                  key={queueItem.queueIndex}
                />
              );
            })}
          </ul>
          {!queueInitiaded ? (
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

// export class FilePanel extends Component<IProps, IState> {
//   queueTime: number = 0;

//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       fileQueue: [],
//       filesProcessing: 0,
//       maxFilesProcessing: APP_CONFIG.maxFilesProcessing,
//       queueInitiaded: false,
//     };
//   }

//   render() {
//     return (
//       <main className="file-panel">
//         <FileUpload
//           passInputFiles={(acceptedFiles: IFile[]) => {
//             this.addFilesToQueue(acceptedFiles);
//           }}
//         >
//           <div className="scrollable-y">
//             <ul className="file-list">
//               {this.state.fileQueue.map((queueItem, index) => {
//                 return (
//                   <FileItem
//                     status={queueItem.queueStatus}
//                     name={queueItem.name}
//                     path={queueItem.path}
//                     size={queueItem.size}
//                     type={queueItem.type}
//                     errorMessage={queueItem.errorMessage}
//                     targetFileType={getExportOptions().fileType}
//                     newFileSize={queueItem.newFileSize}
//                     id={'file-' + index}
//                     key={index}
//                   />
//                 );
//               })}
//             </ul>
//             {!this.state.queueInitiaded ? (
//               <div className="file-panel__instructions">
//                 <h2>Drop your images here</h2>
//                 <SupportedFormatsMessage />
//               </div>
//             ) : (
//               false
//             )}
//           </div>
//         </FileUpload>
//       </main>
//     );
//   }
// }

export default FilePanel;
