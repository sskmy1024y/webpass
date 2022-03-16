const base64js = require("base64-js");

export const isNonUndefind = <T,>(v: T): v is NonNullable<T> => v !== undefined;

export const blobToBase64Image = (blob: Uint8Array) =>
  `data:image/png;base64,${base64js.fromByteArray(blob)}`;

export const toSrcSet = (...blobs: (Uint8Array | undefined)[]) => {
  return blobs
    .map((blob, i) =>
      blob instanceof Uint8Array
        ? `${blobToBase64Image(blob)} ${i}x`
        : undefined
    )
    .filter(isNonUndefind)
    .join(",");
};
