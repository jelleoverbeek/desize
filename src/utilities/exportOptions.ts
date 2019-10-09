import IExportOptions from "../interfaces/IExportOptions.interface";

const localStorageKey: string = "exportOptions";
const defaultExportOptions: IExportOptions = {
  fileType: "png",
  pngOptions: {
    compression: 9
  },
  jpgOptions: {
    quality: 100
  },
  webpOptions: {
    quality: 100
  }
};

export function setExportOptions(exportOptions: IExportOptions): void {
  const exportOptionsString: string = JSON.stringify(exportOptions);
  localStorage.setItem(localStorageKey, exportOptionsString);
}

export function getExportOptions(): IExportOptions {
  const exportOptionsString: string | null = localStorage.getItem(
    "exportOptions"
  );

  if (!exportOptionsString) {
    setExportOptions(defaultExportOptions);
    return defaultExportOptions;
  } else {
    const exportOptions: IExportOptions = JSON.parse(exportOptionsString);
    return exportOptions;
  }
}

// export function getExportOptionsByKey(
//   key1: string,
//   key2?: string
// ): IExportOptions {
//   const exportOptions: any = getExportOptions();

//   if (key1 && key2) {
//     return exportOptions[key1][key2];
//   }
//   return exportOptions[key1];
// }

export function updateExportOptions(key: string, value: string | number) {
  const exportOptions: any = getExportOptions();
  exportOptions[key] = value;
  setExportOptions(exportOptions);
}
