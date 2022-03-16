import { Dayjs } from "dayjs";

interface Locations {
  longitude: number;
  latitude: number;
}

export interface FieldValue {
  value: string;
  key: string;
  label?: string;
  attributedValue: string;
}

export interface Pass {
  description: string;
  passTypeIdentifier: string;
  serialNumber: string;
  formatVersion: number;
  organizationName: string;
  teamIdentifier: string;
  associatedStoreIdentifiers: string[];
  expirationDate: Dayjs;
  locations: Locations[];
  relevantDate: Dayjs;
  eventTicket: {
    auxiliaryFields: FieldValue[];
    backFields: FieldValue[];
    headerFields: FieldValue[];
    secondaryFields: FieldValue[];
  };
  barcode?: {
    format: "PKBarcodeFormatQR";
    message: string;
    messageEncoding: "iso-8859-1";
  };
  backgroundColor?: string;
  foregroundColor?: string;
  labelColor?: string;
}
