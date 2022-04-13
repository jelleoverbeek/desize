import IFile from './IFile.interface';

interface IQueueItem extends IFile {
  queueStatus: 'pending' | 'processing' | 'done';
  queueIndex: number;
  errorMessage?: string | undefined;
  newFileSize?: number;
}

export default IQueueItem;
