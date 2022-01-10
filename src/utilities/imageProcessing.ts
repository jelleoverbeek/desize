import { IOutputInfo } from 'interfaces/ISharpOutput.interface';
import APP_CONFIG from '../config';
import {
  IExportOptions,
  IJpgOptions,
  IWebpOptions,
  IPngOptions,
} from '../interfaces/IExportOptions.interface';

const sharp = require('sharp');
const fs = require('file-system');

export function isFileSupported(inputMimeType: string | undefined): boolean {
  if (inputMimeType) {
    let isSupported = false;

    APP_CONFIG.supportedFileTypes.forEach((supportedFileType) => {
      supportedFileType.mimeTypes.forEach((mimeType) => {
        if (inputMimeType === mimeType) {
          isSupported = true;
        }
      });
    });

    return isSupported;
  }
  return false;
}

function splitPath(path: string): any {
  const regex = new RegExp('(\\\\?([^\\/]*[\\/])*)([^\\/]+)$');
  const filePathObj: any = path.match(regex);

  return filePathObj;
}

function undefinedToNull(value: number): null | number {
  if (value === 0) {
    return null;
  }
  return value;
}

export function getNewFileName(
  originalPath: string,
  targetExtension: string
): string {
  const filePathObj: any = splitPath(originalPath);
  const fileName = filePathObj[3].split('.')[0];
  const newFileName = `${fileName}.${targetExtension}`;

  return newFileName;
}

export function getNewFilePath(
  originalPath: string,
  targetExtension: string
): string {
  const filePathObj: any = splitPath(originalPath);
  const fileName = filePathObj[3].split('.')[0];
  const fileLocation = filePathObj[1];
  const newFileLocation = `${fileLocation}${targetExtension}-processed`;

  fs.mkdirSync(newFileLocation, (err: Error) => {
    console.error(err);
  });

  const newFilePath = `${newFileLocation}/${fileName}.${targetExtension}`;

  return newFilePath;
}

export function processPng(
  path: string,
  resolutionOptions: object,
  pngOptions: IPngOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, 'png');
  sharp(path)
    .resize(resolutionOptions)
    .png(pngOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      callbackFn({ error, info: outputInfo });
    });
}

export function processJpg(
  path: string,
  resolutionOptions: object,
  jpgOptions: IJpgOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, 'jpg');
  sharp(path)
    .resize(resolutionOptions)
    .jpeg(jpgOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      callbackFn({ error, info: outputInfo });
    });
}

export function processWebp(
  path: string,
  resolutionOptions: object,
  webpOptions: IWebpOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, 'webp');

  sharp(path)
    .resize(resolutionOptions)
    .webp(webpOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      callbackFn({ error, info: outputInfo });
    });
}

export function processImage(
  path: string,
  exportOptions: IExportOptions,
  callbackFn?: any
) {
  const resolutionOptions = {
    width: undefinedToNull(exportOptions.resolutionOptions.width),
    height: undefinedToNull(exportOptions.resolutionOptions.height),
  };

  if (exportOptions.fileType === 'jpg') {
    processJpg(path, resolutionOptions, exportOptions.jpgOptions, callbackFn);
  } else if (exportOptions.fileType === 'png') {
    processPng(path, resolutionOptions, exportOptions.pngOptions, callbackFn);
  } else if (exportOptions.fileType === 'webp') {
    processWebp(path, resolutionOptions, exportOptions.webpOptions, callbackFn);
  }
}
