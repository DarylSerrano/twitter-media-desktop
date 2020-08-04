export const CHANNEL_NAME = 'LOGIN';

export interface ClientInformation {
  userId: string;
  screenName: string;
}

export interface ClientAuthInformation {
  accTkn: string;
  accTknSecret: string;
}
