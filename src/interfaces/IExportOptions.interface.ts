import IJpgOptions from "./IJpgOptions.interface";
import IPngOptions from "./IPngOptions.interface";
import IWebpOptions from "./IWebpOptions.interface";

export interface IExportOptions {
  fileType: string;
  pngOptions: IPngOptions;
  jpgOptions: IJpgOptions;
  webpOptions: IWebpOptions;
}

export default IExportOptions;
