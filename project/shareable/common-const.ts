export const DefaultAppPorts = {
    Publications: 3000,
    Accounts: 4000,
    Api: 3333
} as const
export const FileValidationLimits = {
  MimeTypes : ['image/jpg', 'image/jpeg', 'image/png'],
  MaxAvatarSize:  500*1024,
  MaxFotoSize: 1000*1024

} as const;

export const GLOBAL_PREFIX = 'api';

