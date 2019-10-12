interface IJpgOptions {
  quality: number;
}

interface IWebpOptions {
  quality: number;
}

interface IPngOptions {
  compression: number;
}

export interface IExportOptions {
  fileType: string;
  pngOptions: IPngOptions;
  jpgOptions: IJpgOptions;
  webpOptions: IWebpOptions;
}

export default IExportOptions;
