export enum LicenseStatus {
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
}

export interface ILicense {
  license: string;
  status: LicenseStatus;
  expiresAt: string;
}
