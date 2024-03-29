/* eslint-disable @typescript-eslint/no-explicit-any */

import { IExportOptions } from '../../interfaces/IExportOptions.interface';

const localStorageKey = 'exportOptions';

const defaultExportOptions: IExportOptions = {
  fileType: 'png',
  pngOptions: {
    compressionLevel: 9,
  },
  jpgOptions: {
    quality: 100,
  },
  webpOptions: {
    quality: 100,
  },
  resolutionOptions: {
    width: 0,
    height: 0,
  },
};

export function setExportOptions(exportOptions: IExportOptions): void {
  const exportOptionsString: string = JSON.stringify(exportOptions);
  localStorage.setItem(localStorageKey, exportOptionsString);
}

export function getExportOptions(): IExportOptions {
  const exportOptionsString: string | null =
    localStorage.getItem('exportOptions');

  if (!exportOptionsString) {
    setExportOptions(defaultExportOptions);
    return defaultExportOptions;
  }

  const exportOptions: IExportOptions = JSON.parse(exportOptionsString);
  return exportOptions;
}

export function updateExportOptionsByKey(
  value: any,
  key1: string,
  key2?: string
): void {
  const exportOptions: any = getExportOptions();

  if (key1 && key2) {
    exportOptions[key1][key2] = value;
  } else {
    exportOptions[key1] = value;
  }

  setExportOptions(exportOptions);
}

export function getExportOptionsByKey(key1: string, key2?: string): any {
  const exportOptions: any = getExportOptions();

  if (key1 && key2) {
    return exportOptions[key1][key2];
  }

  return exportOptions[key1];
}
