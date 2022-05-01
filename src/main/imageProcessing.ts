import {
  IOutputInfo,
  ISharpCallback,
} from '../interfaces/ISharpOutput.interface';
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
  const supportedMimeTypes = APP_CONFIG.supportedFileTypes.filter((item) => {
    if (item.mimeType === inputMimeType) {
      return true;
    }

    return false;
  });

  if (supportedMimeTypes.length === 0) {
    return false;
  }

  return true;
}

function splitPath(path: string): RegExpMatchArray | null {
  const regex = new RegExp('(\\\\?([^\\/]*[\\/])*)([^\\/]+)$');
  const filePathObj = path.match(regex);

  return filePathObj;
}

function undefinedToNull(value: number): null | number {
  if (value === 0) {
    return null;
  }
  return value;
}

export function getNewFilePath(
  originalPath: string,
  targetExtension: string
): string {
  const filePathArr = splitPath(originalPath);

  if (Array.isArray(filePathArr)) {
    const fileName = filePathArr[3].split('.')[0];
    const fileLocation = filePathArr[1];
    const newFileLocation = `${fileLocation}_desized-${targetExtension.toLowerCase()}`;

    fs.mkdirSync(newFileLocation, (error: Error) => {
      return error;
    });

    const newFilePath = `${newFileLocation}/${fileName}.${targetExtension}`;
    return newFilePath;
  }

  return `ErrorGettingNewFilePath`;
}

export function processPng(
  path: string,
  resolutionOptions: object,
  pngOptions: IPngOptions,
  callbackFn: ISharpCallback
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
  callbackFn: ISharpCallback
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
  callbackFn: ISharpCallback
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
  callbackFn: ISharpCallback
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
