import { IExportOptions } from './IExportOptions.interface';
import IQueueItem from './IQueueItem.interface';

interface IProcessingInput {
  file: IQueueItem;
  exportOptions: IExportOptions;
}

export default IProcessingInput;
