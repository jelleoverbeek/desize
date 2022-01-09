export interface IOutputInfo {
  channels: number;
  format: string;
  height: number;
  premultiplied: boolean;
  size: number;
  width: number;
}

export interface ISharpOutput {
  error: Error;
  info: IOutputInfo;
}
