import APP_CONFIG from '../../config';

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

export function getNewFileName(
  originalPath: string,
  targetExtension: string
): string {
  const filePathArr = splitPath(originalPath);

  if (Array.isArray(filePathArr)) {
    const fileName = filePathArr[3].split('.')[0];
    const newFileName = `${fileName}.${targetExtension}`;

    return newFileName;
  }

  return `ErrorGettingNewFileName`;
}
