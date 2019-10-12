interface IFile {
  lastModified?: number;
  lastModifiedDate?: Date;
  name: string;
  path: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

export default IFile;
