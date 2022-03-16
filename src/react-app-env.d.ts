/// <reference types="react-scripts" />

declare module "zlibjs/bin/unzip.min" {
  export namespace Zlib {
    export class Unzip {
      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(buffer: fileList) {}
      getFilenames(): string[];
      decompress(Upath: string): Uint8Array;
    }
  }
}
