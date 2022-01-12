import ISupportedFileType from 'interfaces/ISupportedFileType.interface';

interface IAppConfig {
  maxFilesProcessing: number;
  supportedFileTypes: ISupportedFileType[];
}

const APP_CONFIG: IAppConfig = {
  maxFilesProcessing: 24,
  supportedFileTypes: [
    { title: 'JPG', mimeType: 'image/jpeg' },
    { title: 'PNG', mimeType: 'image/png' },
    { title: 'WebP', mimeType: 'image/webp' },
  ],
};

export default APP_CONFIG;
