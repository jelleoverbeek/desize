import APP_CONFIG from "../config";
import {
  IJpgOptions,
  IWebpOptions,
  IPngOptions
} from "../interfaces/IExportOptions.interface";

const sharp = window.require("sharp");
const fs = window.require("file-system");

export function isFileSupported(inputMimeType: string): boolean {
  let isSupported: boolean = false;

  APP_CONFIG.supportedFileTypes.forEach(supportedFileType => {
    supportedFileType.mimeTypes.forEach(mimeType => {
      if (inputMimeType === mimeType) {
        isSupported = true;
      }
    });
  });

  return isSupported;
}

function splitPath(path: string): any {
  const regex = new RegExp("(\\\\?([^\\/]*[\\/])*)([^\\/]+)$");
  const filePathObj: any = path.match(regex);

  return filePathObj;
}

export function getNewFileName(
  originalPath: string,
  targetExtension: string
): string {
  const filePathObj: any = splitPath(originalPath);
  const fileName = filePathObj[3].split(".")[0];
  const newFileName = fileName + "." + targetExtension;

  return newFileName;
}

export function getNewFilePath(
  originalPath: string,
  targetExtension: string
): string {
  const filePathObj: any = splitPath(originalPath);
  const fileName = filePathObj[3].split(".")[0];
  const fileLocation = filePathObj[1];
  const newFileLocation = fileLocation + targetExtension + "-processed";

  fs.mkdirSync(newFileLocation, (err: Error) => {
    console.error(err);
  });

  const newFilePath = newFileLocation + "/" + fileName + "." + targetExtension;

  return newFilePath;
}

export function processPng(
  path: string,
  pngOptions: IPngOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, "jpg");
  sharp(path)
    .png(pngOptions)
    .toFile(newFilePath, callbackFn);
}

export function processJpg(
  path: string,
  jpgOptions: IJpgOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, "jpg");
  sharp(path)
    .jpeg(jpgOptions)
    .toFile(newFilePath, callbackFn);
}

export function processWebp(
  path: string,
  webpOptions: IWebpOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, "jpg");

  sharp(path)
    .webp(webpOptions)
    .toFile(newFilePath, callbackFn);
}
