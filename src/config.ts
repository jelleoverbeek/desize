interface IFileType {
  title: string;
  mimeTypes: string[];
}

interface IAppConfig {
  supportedFileTypes: IFileType[];
}

const APP_CONFIG: IAppConfig = {
  supportedFileTypes: [
    {
      title: "jpg",
      mimeTypes: ["image/jpeg"]
    },
    { title: "webp", mimeTypes: ["image/webp"] }
  ]
};

export default APP_CONFIG;
