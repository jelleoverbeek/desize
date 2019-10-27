import APP_CONFIG from "../config";
import IExportOptions, {
  IJpgOptions,
  IWebpOptions,
  IPngOptions
} from "../interfaces/IExportOptions.interface";
import IOutputInfo from "../interfaces/IOutputInfo.interface";

const sharp = window.require("sharp");
const fs = window.require("file-system");

export function isFileSupported(inputMimeType: string | undefined): boolean {
  if (inputMimeType) {
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
  return false;
}

// function handleOutput(err: Error, outputInfo: IOutputInfo) {
//   if (err) {
//     callbackFn(err);
//   } else {
//     callbackFn(outputInfo);
//   }
// }

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
  const newFilePath: string = getNewFilePath(path, "png");
  sharp(path)
    .png(pngOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      console.log("Error", error);
      console.log("Output", outputInfo);
      callbackFn({ error, info: outputInfo });
    });
}

export function processJpg(
  path: string,
  jpgOptions: IJpgOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, "jpg");
  sharp(path)
    .jpeg(jpgOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      console.log("Error", error);
      console.log("Output", outputInfo);
      callbackFn({ error, info: outputInfo });
    });
}

export function processWebp(
  path: string,
  webpOptions: IWebpOptions,
  callbackFn?: any
) {
  const newFilePath: string = getNewFilePath(path, "webp");

  sharp(path)
    .webp(webpOptions)
    .toFile(newFilePath, (error: Error, outputInfo: IOutputInfo) => {
      console.log("Error", error);
      console.log("Output", outputInfo);
      callbackFn({ error, info: outputInfo });
    });
}

export function proccessImage(
  path: string,
  exportOptions: IExportOptions,
  callbackFn?: any
) {
  if (exportOptions.fileType === "jpg") {
    processJpg(path, exportOptions.jpgOptions, callbackFn);
  } else if (exportOptions.fileType === "png") {
    processPng(path, exportOptions.pngOptions, callbackFn);
  } else if (exportOptions.fileType === "webp") {
    processWebp(path, exportOptions.webpOptions, callbackFn);
  }
}
