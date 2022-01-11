interface IFileType {
  title: string;
  mimeTypes: string[];
}

interface IAppConfig {
  maxFilesProcessing: number;
  supportedFileTypes: IFileType[];
}

const APP_CONFIG: IAppConfig = {
  maxFilesProcessing: 28,
  supportedFileTypes: [
    { title: 'JPG', mimeTypes: ['image/jpeg'] },
    { title: 'PNG', mimeTypes: ['image/png'] },
    { title: 'WebP', mimeTypes: ['image/webp'] },
  ],
};

export default APP_CONFIG;
