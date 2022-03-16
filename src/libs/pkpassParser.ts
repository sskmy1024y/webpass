import { Zlib } from "zlibjs/bin/unzip.min";
import { BlobFiles } from "../entities/BlobFiles";
import { passLoader } from "./passLoader";
// const Unzip = require("zlibjs/bin/unzip.min").Zlib.Unzip;

const FilePaths = {
  icon: "icon.png",
  icon2x: "icon@2x.png",
  icon3x: "icon@3x.png",
  logo: "logo.png",
  logo2x: "logo@2x.png",
  logo3x: "logo@3x.png",
  strip: "strip.png",
  strip2x: "strip@2x.png",
  strip3x: "strip@3x.png",
} as const;

/**
 * require pkpass url
 * @param url
 */
export const pkpassParser = async (url: string) => {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const unzip = new Zlib.Unzip(new Uint8Array(buffer));
  const fileList = unzip.getFilenames();

  if (!fileList.includes("pass.json"))
    throw new Error("pass.json is NOT included");

  const blobs: any = {};

  Object.entries(FilePaths).forEach(([key, filepath]) => {
    if (fileList.includes(filepath)) {
      blobs[key] = unzip.decompress(filepath);
    }
  });

  const pass = passLoader(unzip.decompress("pass.json"));

  return {
    blobs: blobs as BlobFiles,
    pass,
  };
};
