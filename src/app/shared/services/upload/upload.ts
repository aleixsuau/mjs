// TODO: Delete this
export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  size: number;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
