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

export function updateExportOptions(key: string, value: string | number) {
  const currentExportOptions: any = getExportOptions();
  currentExportOptions[key] = value;
  setExportOptions(currentExportOptions);
}
