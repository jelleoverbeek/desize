interface IFile {
  lastModified?: number;
  lastModifiedDate?: Date;
  name: string;
  path: string;
  type?: string;
  size?: number;
  webkitRelativePath?: string;
}

export default IFile;
