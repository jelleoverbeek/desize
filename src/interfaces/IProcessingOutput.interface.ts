import IQueueItem from './IQueueItem.interface';
import { ISharpOutput } from './ISharpOutput.interface';

interface IProcessingOutput {
  file: IQueueItem;
  sharp: ISharpOutput;
}

export default IProcessingOutput;
