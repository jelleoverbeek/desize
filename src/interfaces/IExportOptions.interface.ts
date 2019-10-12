export interface IJpgOptions {
  quality: number;
}

export interface IWebpOptions {
  quality: number;
}

export interface IPngOptions {
  compressionLevel: number;
}

export interface IExportOptions {
  fileType: string;
  pngOptions: IPngOptions;
  jpgOptions: IJpgOptions;
  webpOptions: IWebpOptions;
}

export default IExportOptions;
