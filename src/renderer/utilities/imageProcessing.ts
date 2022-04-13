import APP_CONFIG from '../config';

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
  const newFileLocation = `${fileLocation}_desized-${targetExtension.toLowerCase()}`;

  fs.mkdirSync(newFileLocation, (err: Error) => {
    console.error(err);
  });

  const newFilePath = `${newFileLocation}/${fileName}.${targetExtension}`;

  return newFilePath;
}
