export interface PayloadType {
  email: string;
  userId: number;
  validate2FA?: boolean;
  enable2FA?: boolean;
  artistId?: number;
}

export type Enable2FAType = {
  secret: string;
};
